import express from 'express';
import { auth, readSession } from './auth.js';
import { topics } from './topics.js';
import { fail } from './input.js';

const app = express();
const port = Number(process.env.PORT || 3007);
const origins = new Set(
  (process.env.APP_ORIGINS || 'http://localhost:5177,http://127.0.0.1:5177')
    .split(',')
    .map((origin) => origin.trim()),
);

app.disable('x-powered-by');
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  const origin = req.get('Origin');
  if (req.method === 'POST' && origin && !origins.has(origin)) {
    fail(403, 'Недозволене джерело запиту.');
  }
  next();
});
app.use('/api', express.json({ limit: '128kb' }), (req, _res, next) => {
  req.body ??= {};
  next();
});
app.use('/api', readSession);
app.use('/api/auth', auth);
app.use('/api/topics', topics);
app.use((_req, res) => res.status(404).json({ message: 'Адресу API не знайдено.' }));
app.use((error, _req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.status || 500;
  if (status >= 500) console.error(error);
  let message = error.message;
  if (error.type === 'entity.parse.failed') message = 'Некоректний JSON.';
  if (status === 413) message = 'Завеликий запит.';
  if (status >= 500) message = 'Помилка сервера.';
  res.status(status).json({ message });
});

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`CritiqueCore API: http://127.0.0.1:${server.address().port}/api`);
});
