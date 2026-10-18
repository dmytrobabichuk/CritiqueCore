import styles from './AppShell.module.css';

export default function AppShell({ children, breadcrumb, review = false }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span aria-hidden="true">{'</>'}</span>CritiqueCore
        </div>
        <p className={styles.breadcrumb}>Спільнота / {breadcrumb}</p>
        <label className={styles.search}>
          <span className={styles.srOnly}>Пошук у спільноті</span>
          <input type="search" placeholder="Пошук тем, коду або запитань" />
        </label>
        <button type="button" className={styles.notifications}>
          Сповіщення · 2
        </button>
      </header>
      <aside className={styles.sidebar}>
        <p className={styles.sectionLabel}>СПІЛЬНОТА</p>
        <nav className={styles.navigation} aria-label="Розділи спільноти">
          <button
            type="button"
            aria-current={!review ? 'page' : undefined}
            className={!review ? styles.active : undefined}
          >
            01 Усі обговорення
          </button>
          <button
            type="button"
            aria-current={review ? 'page' : undefined}
            className={review ? styles.active : undefined}
          >
            02 Code Review
          </button>
          <button type="button">03 Збережене</button>
          <button type="button">04 Оголошення</button>
        </nav>
        <p className={styles.sectionLabel}>КАТЕГОРІЇ</p>
        <ul className={styles.categories}>
          <li>Frontend і React</li>
          <li>Backend і API</li>
          <li>Архітектура</li>
          <li>Навчальні роботи</li>
        </ul>
        <div className={styles.sidebarBottom}>
          <div className={styles.community}>
            <strong>Спільнота УжНУ</strong>
            <p>Код, який стає кращим через обговорення.</p>
          </div>
          <div className={styles.profile}>
            <span className={styles.avatar}>ДБ</span>
            <div>
              Дмитро Бабічук<small>Студент · ІПЗ</small>
            </div>
          </div>
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
