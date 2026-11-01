// ��������� ��������� API ��� ��6. �� production-������ ��7.
import { createServer } from 'node:http';
import { randomUUID, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const directory = new URL('./data/', import.meta.url);
mkdirSync(directory, { recursive: true });
const file = new URL('db.json', directory);
let db;
try {
  db = JSON.parse(readFileSync(file, 'utf8'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  db = { users: [], topics: [] };
}
const sessions = new Map();
const save = () => writeFileSync(file, JSON.stringify(db, null, 2));
const publicUser = (user) => ({ id: user.id, name: user.name });
function fail(status, message) {
  throw Object.assign(new Error(message), { status });
}
function text(value, min, max) {
  if (typeof value !== 'string' || value.trim().length < min || value.length > max)
    fail(400, '������ ���������� � ������� ����.');
  return value.trim();
}
async function body(req) {
  let value = '';
  for await (const chunk of req) {
    value += chunk;
    if (value.length > 50000) fail(413, '��������� �����.');
  }
  try {
    return JSON.parse(value || '{}');
  } catch {
    fail(400, '����������� JSON.');
  }
}
createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  const reply = (status, data) => {
    res.writeHead(status);
    res.end(JSON.stringify(data));
  };
  try {
    const url = new URL(req.url, 'http://localhost');
    const path = url.pathname;
    const token = req.headers.cookie?.match(/(?:^|;\s*)session=([^;]+)/)?.[1];
    const session = sessions.get(token);
    const user =
      session && session.expires > Date.now() ? db.users.find((x) => x.id === session.id) : null;
    const requireUser = () => {
      if (!user) fail(401, '�������� ����� �� �������.');
      return user;
    };
    if (req.method === 'GET' && path === '/api/auth/me')
      return reply(200, { user: user ? publicUser(user) : null });
    if (req.method === 'POST') {
      const origin = req.headers.origin;
      if (
        origin &&
        new URL(origin).hostname !== '127.0.0.1' &&
        new URL(origin).hostname !== 'localhost'
      )
        fail(403, '����������� ������� ������.');
      const data = await body(req);
      if (['/api/auth/register', '/api/auth/login'].includes(path)) {
        const email = text(data.email, 3, 254).toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, '���������� �����.');
        const password = data.password;
        if (typeof password !== 'string' || password.length < 8 || password.length > 128)
          fail(400, '������ �� ������ 8�128 �������.');
        let account = db.users.find((x) => x.email === email);
        if (path.endsWith('register')) {
          if (account) fail(409, '�� ����� ��� ������������.');
          const salt = randomBytes(16).toString('hex');
          account = {
            id: randomUUID(),
            name: text(data.name, 2, 80),
            email,
            salt,
            hash: scryptSync(password, salt, 64).toString('hex'),
          };
          db.users.push(account);
          save();
        } else if (
          !account ||
          !timingSafeEqual(Buffer.from(account.hash, 'hex'), scryptSync(password, account.salt, 64))
        )
          fail(401, '����������� ����� ��� ������.');
        const key = randomBytes(32).toString('hex');
        sessions.set(key, { id: account.id, expires: Date.now() + 28800000 });
        res.setHeader(
          'Set-Cookie',
          `session=${key}; HttpOnly; SameSite=Lax; Path=/api; Max-Age=28800`,
        );
        return reply(200, { user: publicUser(account) });
      }
      if (path === '/api/auth/logout') {
        sessions.delete(token);
        res.setHeader('Set-Cookie', 'session=; HttpOnly; SameSite=Lax; Path=/api; Max-Age=0');
        return reply(200, { ok: true });
      }
      requireUser();
      if (path === '/api/topics') {
        const topic = {
          id: randomUUID(),
          title: text(data.title, 5, 160),
          body: text(data.body, 10, 10000),
          code: typeof data.code === 'string' ? data.code : '',
          type: data.type,
          tags: data.tags,
          author: publicUser(user),
          createdAt: new Date().toISOString(),
          comments: [],
          resolved: false,
        };
        if (
          !['question', 'review'].includes(topic.type) ||
          !Array.isArray(topic.tags) ||
          topic.tags.length > 5 ||
          topic.tags.some((x) => typeof x !== 'string' || x.length > 40) ||
          topic.code.length > 20000
        )
          fail(400, '������ ���, ��� � ���� (�� 5).');
        db.topics.unshift(topic);
        save();
        return reply(201, topic);
      }
      const match = path.match(/^\/api\/topics\/([^/]+)\/(comments|resolve)$/);
      if (match) {
        const topic = db.topics.find((x) => x.id === match[1]);
        if (!topic) fail(404, '���� �� ��������.');
        if (match[2] === 'comments')
          topic.comments.push({
            id: randomUUID(),
            body: text(data.body, 1, 5000),
            author: publicUser(user),
            createdAt: new Date().toISOString(),
          });
        else {
          if (topic.author.id !== user.id) fail(403, '���� ����� ���� ������� ����.');
          topic.resolved = true;
        }
        save();
        return reply(200, topic);
      }
    }
    if (req.method === 'GET' && path === '/api/topics') {
      const q = (url.searchParams.get('q') || '').toLowerCase();
      const type = url.searchParams.get('type');
      return reply(
        200,
        db.topics.filter(
          (x) => (!type || x.type === type) && `${x.title} ${x.body}`.toLowerCase().includes(q),
        ),
      );
    }
    if (req.method === 'GET' && path.startsWith('/api/topics/')) {
      const topic = db.topics.find((x) => x.id === path.split('/').pop());
      if (!topic) fail(404, '���� �� ��������.');
      return reply(200, topic);
    }
    fail(404, '������ API �� ��������.');
  } catch (error) {
    reply(error.status || 500, { message: error.status ? error.message : '������� �������.' });
  }
}).listen(Number(process.env.PORT) || 3006, '127.0.0.1', () =>
  console.log('��������� API: http://127.0.0.1:3006'),
);
