import AppShell from '../components/AppShell';
import Button from '../components/Button';
import styles from './Pages.module.css';

export default function NotFoundPage() {
  return (
    <AppShell breadcrumb="Сторінку не знайдено">
      <div className={styles.pageHeading}>
        <p className={styles.eyebrow}>404</p>
        <h1>Сторінку не знайдено</h1>
        <p className={styles.description}>Перевір адресу або повернися до обговорень.</p>
      </div>
      <Button to="/">До обговорень</Button>
    </AppShell>
  );
}
