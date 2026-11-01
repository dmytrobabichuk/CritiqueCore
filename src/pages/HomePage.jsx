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
    <AppShell breadcrumb={review ? 'Code Review' : '�����������'}>
      <div className={styles.pageHeading}>
        <h1>{review ? 'Code Review' : '�����������'}</h1>
        <Button to="/create">�������� ����</Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setParams({ q: new FormData(e.currentTarget).get('q') });
        }}
      >
        <input
          name="q"
          aria-label="����� ���"
          defaultValue={q}
          placeholder="����� �� ������ ��� ������"
        />
        <Button type="submit">������</Button>
      </form>
      <div className={styles.stack}>
        {resource.loading && <p role="status">�������������</p>}
        {resource.error && (
          <p role="alert">
            {resource.error} <Button onClick={resource.reload}>���������</Button>
          </p>
        )}
        {resource.data?.length === 0 && (
          <Panel title="��� ���� ����">
            <p>������ ���� ��� ���� ����� ������.</p>
          </Panel>
        )}
        {resource.data?.map((topic) => (
          <TopicCard
            key={topic.id}
            author={topic.author.name}
            title={topic.title}
            description={topic.body}
            tags={topic.tags.join(' � ')}
            status={`${topic.comments.length} �������� � ${topic.resolved ? '�������' : '�����������'}`}
            to={`/discussion/${topic.id}`}
          />
        ))}
      </div>
    </AppShell>
  );
}
