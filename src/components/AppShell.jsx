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
        <p className={styles.breadcrumb}>�������� / {breadcrumb}</p>
        {auth.user ? (
          <>
            <span>{auth.user.name}</span>
            <button
              type="button"
              onClick={() => auth.logout().catch(() => {})}
              disabled={auth.pending}
            >
              �����
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.loginLink}>
            ����
          </Link>
        )}
        {auth.error && <span role="alert">{auth.error}</span>}
      </header>
      <aside className={styles.sidebar}>
        <p className={styles.sectionLabel}>�ϲ������</p>
        <nav className={styles.navigation} aria-label="������ ��������">
          <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : undefined)}>
            �����������
          </NavLink>
          <NavLink
            to="/review"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Code Review
          </NavLink>
          <NavLink to="/create">�������� ����</NavLink>
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.community}>
            <strong>�������� ����</strong>
            <p>���, ���� ��� ������ ����� �����������.</p>
          </div>
          <p>{auth.user?.name || 'ó���'}</p>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
