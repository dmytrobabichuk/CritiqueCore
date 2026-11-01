import { useNavigate } from 'react-router';
import AppShell from '../components/AppShell';
import Panel from '../components/Panel';
import Button from '../components/Button';
import Field from '../components/Field';
import useMutation from '../hooks/useMutation';
import useAuth from '../hooks/useAuth';
export default function CreateTopicPage() {
  const auth = useAuth();
  const mutation = useMutation();
  const navigate = useNavigate();
  async function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    values.tags = values.tags
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean);
    try {
      const topic = await mutation.send('/topics', values);
      navigate(`/discussion/${topic.id}`);
    } catch {
      /* ����������� �������� �����. */
    }
  }
  return (
    <AppShell breadcrumb="��������� ����">
      <h1>�������� ����</h1>
      {auth.loading ? (
        <p>�������� ��񳿅</p>
      ) : !auth.user ? (
        <Panel title="������� ����">
          <Button to="/login">�����</Button>
        </Panel>
      ) : (
        <Panel>
          <form onSubmit={submit}>
            <Field id="title" label="���������">
              <input id="title" name="title" required minLength={5} maxLength={160} />
            </Field>
            <Field id="type" label="���">
              <select id="type" name="type">
                <option value="question">���������</option>
                <option value="review">Code Review</option>
              </select>
            </Field>
            <Field id="body" label="����">
              <textarea id="body" name="body" required minLength={10} maxLength={10000} />
            </Field>
            <Field id="code" label="��� (�� �������)">
              <textarea id="code" name="code" maxLength={20000} />
            </Field>
            <Field id="tags" label="���� ����� ����">
              <input id="tags" name="tags" maxLength={200} />
            </Field>
            {mutation.error && <p role="alert">{mutation.error}</p>}
            <Button type="submit" disabled={mutation.pending}>
              {mutation.pending ? '�����������' : '����������� ����'}
            </Button>
          </form>
        </Panel>
      )}
    </AppShell>
  );
}
