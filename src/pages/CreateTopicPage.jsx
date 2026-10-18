import AppShell from '../components/AppShell';
import Button from '../components/Button';
import Field from '../components/Field';
import Panel from '../components/Panel';
import CodeBlock from '../components/CodeBlock';
import styles from './Pages.module.css';

export default function CreateTopicPage() {
  return (
    <AppShell breadcrumb="Створення теми">
      <div className={styles.pageHeading}>
        <p className={styles.eyebrow}>НОВЕ ОБГОВОРЕННЯ</p>
        <h1>Створити тему</h1>
        <p className={styles.description}>
          Коротко поясни проблему й додай код, який допоможе її відтворити.
        </p>
      </div>
      <div className={styles.columns}>
        <Panel>
          <form>
            <Field id="topic-title" label="Заголовок" hint="Назва має пояснювати суть запитання.">
              <input
                id="topic-title"
                name="title"
                defaultValue="Code Review: перевірка JWT у Node.js / Express"
              />
            </Field>
            <div className={styles.formRow}>
              <Field id="category" label="Категорія">
                <select id="category" name="category" defaultValue="backend">
                  <option value="frontend">Frontend і React</option>
                  <option value="backend">Backend і API</option>
                  <option value="architecture">Архітектура</option>
                </select>
              </Field>
              <Field id="topic-type" label="Тип теми">
                <select id="topic-type" name="type">
                  <option>Code Review</option>
                  <option>Запитання</option>
                </select>
              </Field>
            </div>
            <Field id="tags" label="Теги" hint="До 5 тегів, які описують технології.">
              <input id="tags" name="tags" defaultValue="nodejs, jwt, security" />
            </Field>
            <div className={styles.editorBar}>
              <span>Написати Попередній перегляд</span>
              <span aria-hidden="true">B / {'</>'}</span>
            </div>
            <Field id="topic-body" label="Опис проблеми">
              <textarea
                id="topic-body"
                name="body"
                defaultValue="Перевіряю JWT у middleware Express. Хочу правильно повертати 401, якщо токен прострочений або має неправильний підпис. Нижче — мінімальний приклад. Чи достатньо оброблено помилки?"
              />
            </Field>
            <CodeBlock filename="src/middleware/auth.js">
              {
                "const token = header.replace('Bearer ', '');\nconst payload = jwt.verify(token, secret);\nreq.user = payload;\nnext();"
              }
            </CodeBlock>
            <div className={styles.attachment}>
              <span>auth.js 1.2 КБ · прикріплено</span>
              <button type="button" className={styles.textButton}>
                Додати файл
              </button>
            </div>
            <div className={styles.actions}>
              <Button secondary>Зберегти чернетку</Button>
              <Button>Опублікувати тему</Button>
            </div>
          </form>
        </Panel>
        <aside>
          <Panel title="Перед публікацією">
            <ul className={styles.plainList}>
              <li>Поясни очікуваний результат.</li>
              <li>Покажи фактичну поведінку.</li>
              <li>Додай короткий приклад коду.</li>
              <li>Перевір, чи немає секретних даних.</li>
            </ul>
            <hr className={styles.divider} />
            <p className={styles.muted}>Markdown допоможе відокремити пояснення від коду.</p>
            <button type="button" className={styles.textButton}>
              Поради до запитання →
            </button>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}
