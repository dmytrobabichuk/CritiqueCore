import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import CreateTopicPage from './pages/CreateTopicPage';
import DiscussionPage from './pages/DiscussionPage';
import CodeReviewPage from './pages/CodeReviewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateTopicPage />} />
      <Route path="/discussion" element={<DiscussionPage />} />
      <Route path="/review" element={<CodeReviewPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
