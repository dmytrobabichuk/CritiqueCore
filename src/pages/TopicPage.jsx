import { useParams } from 'react-router';
import AppShell from '../components/AppShell';
import Panel from '../components/Panel';
import Button from '../components/Button';
import Field from '../components/Field';
import CodeBlock from '../components/CodeBlock';
import useResource from '../hooks/useResource';
import useMutation from '../hooks/useMutation';
import useAuth from '../hooks/useAuth';
export default function TopicPage() {
  const { id } = useParams();
  const resource = useResource(`/topics/${encodeURIComponent(id)}`);
  const mutation = useMutation();
  const auth = useAuth();
  async function comment(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await mutation.send(`/topics/${id}/comments`, Object.fromEntries(new FormData(form)));
      form.reset();
      resource.reload();
    } catch {
      /* ����������� �������� � ���������. */
    }
  }
  async function resolve() {
    try {
      await mutation.send(`/topics/${id}/resolve`, {});
      resource.reload();
    } catch {
      /* ����������� �������� � ���������. */
    }
  }
  const topic = resource.data;
  return (
    <AppShell breadcrumb="�����������">
      {resource.loading && <p role="status">�������������</p>}
      {resource.error && <p role="alert">{resource.error}</p>}
      {topic && (
        <>
          <h1>{topic.title}</h1>
          <p>
            {topic.author.name} � {new Date(topic.createdAt).toLocaleString('uk-UA')} �{' '}
            {topic.resolved ? '�������' : '�����������'}
          </p>
          <Panel>
            <p style={{ whiteSpace: 'pre-wrap' }}>{topic.body}</p>
            {topic.code && <CodeBlock filename="��� ������">{topic.code}</CodeBlock>}
            <p>{topic.tags.join(' � ')}</p>
            {auth.user?.id === topic.author.id && !topic.resolved && (
              <Button onClick={resolve} disabled={mutation.pending}>
                ��������� ��������
              </Button>
            )}
          </Panel>
          <h2>³����� � {topic.comments.length}</h2>
          {topic.comments.map((item) => (
            <Panel key={item.id} title={item.author.name}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{item.body}</p>
            </Panel>
          ))}
          {auth.user ? (
            <Panel>
              <form onSubmit={comment}>
                <Field id="comment" label="���� �������">
                  <textarea id="comment" name="body" required maxLength={5000} />
                </Field>
                <Button type="submit" disabled={mutation.pending}>
                  �������� �������
                </Button>
              </form>
            </Panel>
          ) : (
            <Button to="/login">�����, ��� ��������</Button>
          )}
          {mutation.error && <p role="alert">{mutation.error}</p>}
        </>
      )}
    </AppShell>
  );
}
