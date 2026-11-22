# CritiqueCore — ЛР7

Власний API на Node.js та Express 5 для авторизації, тем і відповідей. Фронтенд React використовує ті самі адреси та формат JSON, що й у ЛР6.

## Запуск

Потрібні Node.js від 22.22 та npm. Виконай `npm ci`, потім відкрий два термінали в папці проєкту:

1. `npm run api:dev` — Express на http://127.0.0.1:3007/api.
2. `npm run dev` — React на http://localhost:5177.

Vite пересилає запити `/api` на Express. Початкова база порожня. Щоб побачити повний сценарій, зареєструйся, створи тему, додай відповідь і познач тему вирішеною. Після перезапуску сервера теми й акаунти збережуться. Для сесії потрібно увійти повторно.

## API

| Метод | Адреса                   | Дія                                |
| ----- | ------------------------ | ---------------------------------- |
| POST  | /api/auth/register       | Реєстрація                         |
| POST  | /api/auth/login          | Вхід                               |
| GET   | /api/auth/me             | Поточний користувач або `null`     |
| POST  | /api/auth/logout         | Завершення сесії                   |
| GET   | /api/topics              | Список тем, параметри `q` і `type` |
| GET   | /api/topics/:id          | Тема з відповідями                 |
| POST  | /api/topics              | Нова тема                          |
| POST  | /api/topics/:id/comments | Нова відповідь                     |
| POST  | /api/topics/:id/resolve  | Автор позначає тему вирішеною      |

## Файли сервера

- `server/index.js` — Express, парсинг JSON, маршрути та обробка помилок.
- `server/auth.js` — акаунти, перевірка пароля та сесійна cookie.
- `server/topics.js` — пошук, створення тем, відповіді та статус теми.
- `server/input.js` — перевірка текстових полів і помилки запитів.
- `server/store.js` — збереження акаунтів і тем у `server/data/db.json`.

JSON-файл призначений для одного локального процесу. Для роботи з наявними даними ЛР6 можна задати `DATA_FILE` шляхом до копії її `tools/data/db.json`. Сервер читає змінні оточення `PORT`, `APP_ORIGINS`, `DATA_FILE` та `COOKIE_SECURE`. У `.env.example` наведені змінні Vite. Якщо змінити порт Express, потрібно також оновити `API_PROXY_TARGET` для Vite.

Команда `npm run check` запускає ESLint, Prettier і збірку Vite.
