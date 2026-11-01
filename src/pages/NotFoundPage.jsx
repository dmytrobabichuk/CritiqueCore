import AppShell from '../components/AppShell';
import Button from '../components/Button';
import styles from './Pages.module.css';

export default function NotFoundPage() {
  return (
    <AppShell breadcrumb="������� �� ��������">
      <div className={styles.pageHeading}>
        <p className={styles.eyebrow}>404</p>
        <h1>������� �� ��������</h1>
        <p className={styles.description}>������ ������ ��� ��������� �� ����������.</p>
      </div>
      <Button to="/">�� ����������</Button>
    </AppShell>
  );
}
