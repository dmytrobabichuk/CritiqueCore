# CritiqueCore

Навчальна платформа для обговорення коду та Code Review.
Автор: Дмитро Бабічук, УжНУ.

## Лабораторна робота 3

Підготовлено каркас React + Vite, структуру папок, ESLint, Prettier,
Git hooks через Husky та конфігурацію Cypress.
Стартовий екран показує назву проєкту. Два початкові тести перевіряють
компонент заголовка та відкриття застосунку.

## Запуск

Потрібні Node.js 22.12+ і Git. Для нової копії:

```sh
npm ci
npm run dev
```

Відкрити адресу, яку виведе Vite, зазвичай http://localhost:5173.
Якщо папка ще не є Git-репозиторієм, для активації hooks спочатку
виконати `git init`, потім `npm run prepare`.

## Перевірки

- `npm run lint` — ESLint.
- `npm run format:check` — форматування Prettier.
- `npm run build` — збірка Vite.
- `npm run test:unit` — початкова компонентна перевірка Cypress.
- `npm run test:e2e` — початкова перевірка запуску в браузері.
- `npm run check` — ESLint, Prettier і збірка.

Husky перед commit перевіряє ESLint і форматування, перед push — збірку.

## Структура

- `src/components` — окремі компоненти.
- `src/pages` — компоненти сторінок; зараз StartPage.
- `src/App.jsx` — кореневий компонент.
- `src/main.jsx` — підключення React до HTML.
- `cypress/component` — початковий компонентний тест.
- `cypress/e2e` — початковий тест відкриття застосунку.
- `.husky` — Git hooks.

## Наступні етапи

ЛР4 — верстка сторінок і CSS Modules. ЛР5 — маршрутизація.
ЛР6 — бізнес-логіка й запити. ЛР7 — Node.js/Express API.
ЛР8–9 — розширення компонентних та E2E тестів.

Дизайн попередньої роботи:
https://www.figma.com/design/LaCWRcrv2twn3XYfTfO8rZ/CritiqueCore_Web_Platform_UI_v1.0
