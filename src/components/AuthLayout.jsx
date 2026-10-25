import { Link } from 'react-router';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ children }) {
  return (
    <main className={styles.layout}>
      <section className={styles.intro}>
        <Link to="/" className={styles.brand}>
          <span aria-hidden="true">{'</>'}</span>CritiqueCore
        </Link>
        <div className={styles.message}>
          <p className={styles.eyebrow}>СПІЛЬНОТА ДЛЯ НАВЧАЛЬНОГО КОДУ</p>
          <h2>
            Хороший код
            <br />
            починається
            <br />з обговорення.
          </h2>
          <p>Збирай запитання, знаходь рішення та отримуй зрозумілий відгук до кожного рядка.</p>
          <div className={styles.example}>
            <small>ThemeProvider.jsx Вирішено</small>
            <pre>{'useEffect(() => {\n  setTheme(readSavedTheme());\n}, []);'}</pre>
            <hr />
            <strong>Богдан · Ментор</strong>
            <p>
              Тепер початковий рендер узгоджений.
              <br />
              Дякую за короткий приклад!
            </p>
          </div>
        </div>
        <small className={styles.footer}>Для студентів, менторів і викладачів.</small>
      </section>
      <section className={styles.formArea}>
        <div className={styles.formContent}>{children}</div>
      </section>
    </main>
  );
}
