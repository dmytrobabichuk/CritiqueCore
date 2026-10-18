import AppShell from '../components/AppShell';
import Button from '../components/Button';
import Panel from '../components/Panel';
import TopicCard from '../components/TopicCard';
import styles from './Pages.module.css';

export default function HomePage() {
  return (
    <AppShell breadcrumb="Обговорення">
      <div className={`${styles.pageHeading} ${styles.headingRow}`}>
        <div>
          <p className={styles.eyebrow}>CRITIQUECORE / СПІЛЬНОТА</p>
          <h1>Обговорення</h1>
          <p className={styles.description}>
            Запитуй, ділися рішеннями та допомагай покращувати навчальний код.
          </p>
        </div>
        <Button>+ Створити тему</Button>
      </div>
      <div className={styles.tabs}>
        <button type="button" className={styles.selected}>
          Усі теми
        </button>
        <button type="button">Без відповіді</button>
        <button type="button">Вирішені</button>
        <button type="button" className={styles.sort}>
          Спочатку нові ↓
        </button>
      </div>
      <div className={styles.columns}>
        <div className={styles.stack}>
          <section className={styles.pinned}>
            <small>Закріплено Як користуватися спільнотою</small>
            <h2>Спочатку контекст. Потім — код.</h2>
            <p className={styles.muted}>
              Додай очікуваний результат і короткий приклад: так ти швидше отримаєш корисну
              відповідь.
            </p>
          </section>
          <TopicCard
            author="Олена Коваль · Студент · 2 год тому"
            title="Помилка гідратації в Next.js і localStorage"
            description="Як зберегти тему оформлення та уникнути розбіжності HTML після завантаження?"
            tags="#react #nextjs #hydration"
            status="9 відповідей · Вирішено"
          />
          <TopicCard
            author="Тарас Васильчук · Студент · 4 год тому"
            title="Code Review: перевірка JWT у Node.js / Express"
            description="Перевіряю middleware авторизації. Потрібен відгук щодо помилок і структури коду."
            tags="#nodejs #jwt #security"
            status="3 коментарі · Потребує змін"
          />
          <TopicCard
            author="Максим Гриценко · Викладач · учора"
            title="Як організувати REST API для лабораторної?"
            description="Обговорюємо маршрути, контролери та сервіси на прикладі невеликого застосунку."
            tags="#architecture #api"
            status="12 відповідей · Обговорення"
          />
          <div className={styles.pagination}>
            <span>Показано 3 із 128 тем</span>
            <span>1 2 3 Наступна →</span>
          </div>
        </div>
        <aside className={styles.stack}>
          <Panel title="Твоя наступна тема">
            <p className={styles.muted}>Знайди відповідь у пошуку або опиши проблему спільноті.</p>
            <Button secondary>Поставити запитання</Button>
          </Panel>
          <Panel title="Популярні теги">
            <ul className={styles.plainList}>
              <li>#react 42 теми</li>
              <li>#nodejs 28 тем</li>
              <li>#typescript 19 тем</li>
              <li>#architecture 14 тем</li>
            </ul>
          </Panel>
          <Panel title="Корисна дискусія">
            <p className={styles.muted}>
              01 Один допис — одне питання.
              <br />
              02 Мінімальний приклад коду.
              <br />
              03 Пояснення важливіше оцінки.
            </p>
            <button type="button" className={styles.textButton}>
              Правила спільноти →
            </button>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}
