import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import CreateTopicPage from './pages/CreateTopicPage';
import DiscussionPage from './pages/DiscussionPage';
import CodeReviewPage from './pages/CodeReviewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Окремі HTML-перегляди верстки ЛР4. Маршрутизатор буде додано в ЛР5.
const views = {
  create: CreateTopicPage,
  discussion: DiscussionPage,
  review: CodeReviewPage,
  login: LoginPage,
  register: RegisterPage,
};
const root = document.getElementById('root');
const Page = views[root.dataset.view] || App;

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
