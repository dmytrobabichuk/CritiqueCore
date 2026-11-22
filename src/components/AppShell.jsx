import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import styles from './AppShell.module.css';
export default function AppShell({ children, breadcrumb }) {
  const auth = useAuth();
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          <span aria-hidden="true">{'</>'}</span>CritiqueCore
        </Link>
        <p className={styles.breadcrumb}>Спільнота / {breadcrumb}</p>
        {auth.user ? (
          <>
            <span>{auth.user.name}</span>
            <button
              type="button"
              onClick={() => auth.logout().catch(() => {})}
              disabled={auth.pending}
            >
              Вийти
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.loginLink}>
            Вхід
          </Link>
        )}
        {auth.error && <span role="alert">{auth.error}</span>}
      </header>
      <aside className={styles.sidebar}>
        <p className={styles.sectionLabel}>СПІЛЬНОТА</p>
        <nav className={styles.navigation} aria-label="Розділи спільноти">
          <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : undefined)}>
            Обговорення
          </NavLink>
          <NavLink
            to="/review"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Code Review
          </NavLink>
          <NavLink to="/create">Створити тему</NavLink>
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.community}>
            <strong>Спільнота УжНУ</strong>
            <p>Код, який стає кращим через обговорення.</p>
          </div>
          <p>{auth.user?.name || 'Гість'}</p>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
