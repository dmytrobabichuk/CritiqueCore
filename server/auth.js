import { randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { Router } from 'express';
import { fail, text } from './input.js';
import { readData, updateData } from './store.js';

const deriveKey = promisify(scrypt);
const sessions = new Map();
const sessionDuration = 8 * 60 * 60 * 1000;
const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.COOKIE_SECURE === 'true',
  path: '/api',
};

export const auth = Router();

export function publicUser(user) {
  return { id: user.id, name: user.name };
}

export function readSession(req, _res, next) {
  req.sessionToken = req.headers.cookie?.match(/(?:^|;\s*)session=([a-f0-9]{64})(?:;|$)/)?.[1];
  const session = sessions.get(req.sessionToken);
  if (session?.expiresAt <= Date.now()) sessions.delete(req.sessionToken);
  if (session?.expiresAt > Date.now()) {
    req.user = readData().users.find((user) => user.id === session.userId);
  }
  next();
}

export function requireUser(req, _res, next) {
  if (!req.user) fail(401, 'Спочатку увійди до акаунта.');
  next();
}

function credentials(body) {
  const email = text(body.email, 3, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, 'Некоректна пошта.');
  const { password } = body;
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    fail(400, 'Пароль має містити 8–128 символів.');
  }
  return { email, password };
}

function startSession(req, res, user, status = 200) {
  const now = Date.now();
  for (const [key, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(key);
  }
  sessions.delete(req.sessionToken);
  const token = randomBytes(32).toString('hex');
  sessions.set(token, { userId: user.id, expiresAt: now + sessionDuration });
  res.cookie('session', token, { ...cookieOptions, maxAge: sessionDuration });
  res.status(status).json({ user: publicUser(user) });
}

auth.post('/register', async (req, res) => {
  const { email, password } = credentials(req.body);
  const name = text(req.body.name, 2, 80);
  const salt = randomBytes(16).toString('hex');
  const hash = (await deriveKey(password, salt, 64)).toString('hex');
  const user = updateData((data) => {
    if (data.users.some((item) => item.email === email)) fail(409, 'Ця пошта вже зареєстрована.');
    const account = { id: randomUUID(), name, email, salt, hash };
    data.users.push(account);
    return account;
  });
  startSession(req, res, user, 201);
});

auth.post('/login', async (req, res) => {
  const { email, password } = credentials(req.body);
  const user = readData().users.find((item) => item.email === email);
  if (!user) fail(401, 'Неправильна пошта або пароль.');
  const key = await deriveKey(password, user.salt, 64);
  if (!timingSafeEqual(Buffer.from(user.hash, 'hex'), key)) {
    fail(401, 'Неправильна пошта або пароль.');
  }
  startSession(req, res, user);
});

auth.get('/me', (req, res) => {
  res.json({ user: req.user ? publicUser(req.user) : null });
});

auth.post('/logout', (req, res) => {
  sessions.delete(req.sessionToken);
  res.clearCookie('session', cookieOptions);
  res.json({ ok: true });
});
