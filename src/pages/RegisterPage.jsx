import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import Field from '../components/Field';
import styles from './Auth.module.css';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <p className={styles.eyebrow}>НОВИЙ АКАУНТ</p>
      <h1>Приєднуйся до спільноти</h1>
      <p className={styles.description}>Створи акаунт для запитань та Code Review.</p>
      <form>
        <Field id="name" label="Ім’я та прізвище">
          <input id="name" name="name" autoComplete="name" placeholder="Як до тебе звертатися" />
        </Field>
        <Field id="email" label="Електронна пошта">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@student.uzhnu.edu.ua"
          />
        </Field>
        <Field id="password" label="Пароль" hint="Щонайменше 8 символів">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Створи надійний пароль"
          />
        </Field>
        <div className={styles.options}>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            Погоджуюся з правилами спільноти
          </label>
        </div>
        <Button>Створити акаунт</Button>
      </form>
      <hr className={styles.divider} />
      <p className={styles.switchText}>Уже маєш акаунт?</p>
      <Button secondary to="/login">
        Перейти до входу
      </Button>
    </AuthLayout>
  );
}
