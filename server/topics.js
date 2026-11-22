import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { publicUser, requireUser } from './auth.js';
import { fail, text } from './input.js';
import { readData, updateData } from './store.js';

export const topics = Router();

function findTopic(data, id) {
  const topic = data.topics.find((item) => item.id === id);
  if (!topic) fail(404, 'Тему не знайдено.');
  return topic;
}

topics.get('/', (req, res) => {
  const query = String(req.query.q || '')
    .trim()
    .toLowerCase();
  const { type } = req.query;
  const result = readData().topics.filter((topic) => {
    const content = `${topic.title} ${topic.body}`.toLowerCase();
    return (!type || topic.type === type) && content.includes(query);
  });
  res.json(result);
});

topics.get('/:id', (req, res) => {
  res.json(findTopic(readData(), req.params.id));
});

topics.post('/', requireUser, (req, res) => {
  const { title, body, type, code = '', tags = [] } = req.body;
  if (!['question', 'review'].includes(type)) fail(400, 'Обери тип теми.');
  if (typeof code !== 'string' || code.length > 20000) fail(400, 'Завеликий або некоректний код.');
  if (!Array.isArray(tags) || tags.length > 5) fail(400, 'Додай до п’яти тегів.');

  const topic = {
    id: randomUUID(),
    title: text(title, 5, 160),
    body: text(body, 10, 10000),
    type,
    code,
    tags: tags.map((tag) => text(tag, 1, 40)),
    author: publicUser(req.user),
    createdAt: new Date().toISOString(),
    comments: [],
    resolved: false,
  };
  updateData((data) => data.topics.unshift(topic));
  res.status(201).json(topic);
});

topics.post('/:id/comments', requireUser, (req, res) => {
  const comment = {
    id: randomUUID(),
    body: text(req.body.body, 1, 5000),
    author: publicUser(req.user),
    createdAt: new Date().toISOString(),
  };
  const topic = updateData((data) => {
    const item = findTopic(data, req.params.id);
    item.comments.push(comment);
    return item;
  });
  res.status(201).json(topic);
});

topics.post('/:id/resolve', requireUser, (req, res) => {
  const topic = updateData((data) => {
    const item = findTopic(data, req.params.id);
    if (item.author.id !== req.user.id) fail(403, 'Лише автор може закрити тему.');
    item.resolved = true;
    return item;
  });
  res.json(topic);
});
