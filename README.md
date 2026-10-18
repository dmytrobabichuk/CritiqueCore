# CritiqueCore

Навчальна платформа для обговорення коду та Code Review.

## Лабораторна робота 4

Статична верстка шести екранів на React із CSS Modules.
Без CSS-фреймворків, маршрутизатора, API та бізнес-логіки.
Кнопки відтворюють дизайн; форми не надсилають дані.

## Запуск

Потрібні Node.js 22.12+ та Git.

```sh
npm ci
npm run dev
```

За стандартного порту Vite окремі екрани доступні за адресами:

- http://localhost:5174/ — стрічка.
- http://localhost:5174/create.html — створення теми.
- http://localhost:5174/discussion.html — обговорення.
- http://localhost:5174/review.html — Code Review.
- http://localhost:5174/login.html — вхід.
- http://localhost:5174/register.html — реєстрація.

Це окремі HTML-входи для перегляду верстки. React Router і переходи
між сторінками додаються в ЛР5.

## Структура

- src/pages — сторінки інтерфейсу.
- src/components — спільна оболонка, кнопка, поле, панель, картка та блок коду.
- Файли *.module.css — локальні стилі компонентів і сторінок.
- src/index.css — базове скидання, шрифт і CSS-змінні.
- cypress — початкові перевірки з попереднього етапу.
- .husky — перевірки перед commit та push.

## Команди

- npm run lint — статичний аналіз.
- npm run format — форматування.
- npm run format:check — перевірка форматування.
- npm run build — збірка всіх HTML-переглядів.
- npm run test:unit — початковий компонентний тест.
- npm run test:e2e — початковий E2E тест.

Макет у Figma:
https://www.figma.com/design/LaCWRcrv2twn3XYfTfO8rZ/CritiqueCore_Web_Platform_UI_v1.0
