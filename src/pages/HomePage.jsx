import { useSearchParams } from 'react-router';
import AppShell from '../components/AppShell';
import Button from '../components/Button';
import Panel from '../components/Panel';
import TopicCard from '../components/TopicCard';
import useResource from '../hooks/useResource';
import styles from './Pages.module.css';
export default function HomePage({ review = false }) {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const resource = useResource(
    `/topics?${new URLSearchParams({ q, type: review ? 'review' : '' })}`,
  );
  return (
    <AppShell breadcrumb={review ? 'Code Review' : 'Обговорення'}>
      <div className={styles.pageHeading}>
        <h1>{review ? 'Code Review' : 'Обговорення'}</h1>
        <Button to="/create">Створити тему</Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setParams({ q: new FormData(e.currentTarget).get('q') });
        }}
      >
        <input
          name="q"
          aria-label="Пошук тем"
          defaultValue={q}
          placeholder="Пошук за назвою або описом"
        />
        <Button type="submit">Знайти</Button>
      </form>
      <div className={styles.stack}>
        {resource.loading && <p role="status">Завантаження…</p>}
        {resource.error && (
          <p role="alert">
            {resource.error} <Button onClick={resource.reload}>Повторити</Button>
          </p>
        )}
        {resource.data?.length === 0 && (
          <Panel title="Тем поки немає">
            <p>Створи тему або зміни умови пошуку.</p>
          </Panel>
        )}
        {resource.data?.map((topic) => (
          <TopicCard
            key={topic.id}
            author={topic.author.name}
            title={topic.title}
            description={topic.body}
            tags={topic.tags.join(' · ')}
            status={`${topic.comments.length} відповідей · ${topic.resolved ? 'Вирішено' : 'Обговорення'}`}
            to={`/discussion/${topic.id}`}
          />
        ))}
      </div>
    </AppShell>
  );
}
