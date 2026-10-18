import AppShell from '../components/AppShell';
import Button from '../components/Button';
import Panel from '../components/Panel';
import CodeBlock from '../components/CodeBlock';
import styles from './Pages.module.css';

export default function DiscussionPage() {
  return (
    <AppShell breadcrumb="Frontend і React / Обговорення">
      <div className={styles.pageHeading}>
        <div className={styles.badgeRow}>
          <span className={styles.badge}>Питання</span>
          <span className={styles.successBadge}>Вирішено</span>
          <span className={styles.muted}>312 переглядів</span>
        </div>
        <h1>Помилка гідратації в Next.js і localStorage</h1>
      </div>
      <div className={styles.columns}>
        <div className={styles.stack}>
          <Panel>
            <div className={styles.author}>
              <span className={styles.avatar}>ОК</span>
              <div>
                Олена Коваль<small>Студент · 2 години тому</small>
              </div>
            </div>
            <p className={styles.postText}>
              Зберігаю тему оформлення у localStorage. Після оновлення сторінки Next.js показує
              помилку гідратації. На сервері тема світла, а в браузері — темна. Як узгодити перший
              рендер?
            </p>
            <p className={styles.error}>Text content does not match server-rendered HTML</p>
            <CodeBlock filename="ThemeProvider.jsx">
              {
                "const [theme, setTheme] = useState(\n  localStorage.getItem('theme') ?? 'light'\n);\nreturn <div data-theme={theme}>...</div>;"
              }
            </CodeBlock>
            <div className={styles.postFooter}>
              <span>#nextjs #hydration</span>
              <button type="button" className={styles.textButton}>
                Зберегти тему
              </button>
            </div>
          </Panel>
          <h2 className={styles.answerTitle}>Відповіді · 9</h2>
          <article className={styles.accepted}>
            <small>Прийнята відповідь</small>
            <h3>Богдан Рудницький · Ментор</h3>
            <p className={styles.postText}>
              Перший рендер клієнта має збігатися із серверним. Почни зі стабільної теми, а
              localStorage прочитай у useEffect після монтування.
            </p>
            <CodeBlock filename="Варіант рішення">
              {
                "const [theme, setTheme] = useState('light');\nuseEffect(() => {\n  setTheme(localStorage.getItem('theme') ?? 'light');\n}, []);"
              }
            </CodeBlock>
            <div className={styles.postFooter}>12 корисних оцінок · Відповісти</div>
          </article>
          <div className={styles.actions}>
            <span className={styles.muted}>Маєш інше рішення? Додай пояснення.</span>
            <Button>Написати відповідь</Button>
          </div>
        </div>
        <aside className={styles.stack}>
          <Panel title="Олена Коваль">
            <p className={styles.muted}>Студент · Інженерія ПЗ</p>
            <hr className={styles.divider} />
            <p className={styles.muted}>
              32 корисні оцінки
              <br />5 опублікованих тем
            </p>
          </Panel>
          <Panel title="Пов’язані теми">
            <p>useEffect чи useLayoutEffect?</p>
            <p className={styles.muted}>Frontend і React · 6 відповідей</p>
            <p>Зберігання стану між сесіями</p>
            <p className={styles.muted}>Архітектура · 4 відповіді</p>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}
