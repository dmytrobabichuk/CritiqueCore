import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CreateTopicPage from './pages/CreateTopicPage';
import TopicPage from './pages/TopicPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/review" element={<HomePage review />} />
      <Route path="/create" element={<CreateTopicPage />} />
      <Route path="/discussion/:id" element={<TopicPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage register />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
