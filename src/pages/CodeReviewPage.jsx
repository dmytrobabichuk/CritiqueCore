import AppShell from '../components/AppShell';
import Button from '../components/Button';
import Panel from '../components/Panel';
import CodeBlock from '../components/CodeBlock';
import styles from './Pages.module.css';

export default function CodeReviewPage() {
  return (
    <AppShell breadcrumb="Code Review / Обговорення">
      <div className={styles.pageHeading}>
        <div className={styles.badgeRow}>
          <span className={styles.badge}>Code Review</span>
          <span className={styles.badge}>Потребує змін</span>
        </div>
        <h1>Перевірка JWT у Node.js / Express</h1>
        <p className={styles.description}>Тарас Васильчук · Студент · 4 години тому</p>
      </div>
      <div className={styles.columns}>
        <div className={styles.stack}>
          <Panel>
            <div className={styles.editorBar}>
              <span>auth.js +24 / −6 рядків</span>
              <span>JavaScript</span>
            </div>
            <CodeBlock filename="src/middleware/auth.js">
              {
                "01  import jwt from 'jsonwebtoken';\n02\n03  export function auth(req, res, next) {\n04    const header = req.headers.authorization;\n05    const token = header.replace('Bearer ', '');\n06    const payload = jwt.verify(token, secret);\n07    req.user = payload;\n08    next();\n09  }"
              }
            </CodeBlock>
            <section className={styles.reviewNote}>
              <strong>Рядок 04 · Коментар викладача</strong>
              <p>
                Перед replace перевір, чи є заголовок Authorization. Інакше звернення до відсутнього
                значення завершиться помилкою.
              </p>
            </section>
            <div className={styles.postFooter}>
              <span>3 коментарі до коду</span>
              <button type="button" className={styles.textButton}>
                Додати коментар
              </button>
            </div>
          </Panel>
          <Panel title="Підсумок перевірки">
            <p className={styles.postText}>
              Структура зрозуміла. Додай перевірку заголовка та обробку помилок токена перед
              наступним переглядом.
            </p>
            <div className={styles.actions}>
              <Button secondary>Залишити коментар</Button>
              <Button>Надіслати відгук</Button>
            </div>
          </Panel>
        </div>
        <aside className={styles.stack}>
          <Panel title="Файл на перевірці">
            <strong>auth.js</strong>
            <p className={styles.muted}>
              src/middleware/
              <br />
              JavaScript · 1.2 КБ
            </p>
          </Panel>
          <Panel title="Критерії перевірки">
            <ul className={styles.plainList}>
              <li>Читабельність коду</li>
              <li>Обробка помилок</li>
              <li>Перевірка вхідних даних</li>
            </ul>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}
