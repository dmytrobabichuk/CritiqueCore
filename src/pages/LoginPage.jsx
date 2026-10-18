import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import Field from '../components/Field';
import styles from './Auth.module.css';

export default function LoginPage() {
  return (
    <AuthLayout>
      <p className={styles.eyebrow}>ВХІД ДО СПІЛЬНОТИ</p>
      <h1>З поверненням</h1>
      <p className={styles.description}>Увійди, щоб продовжити обговорення й перевірку коду.</p>
      <form>
        <Field id="email" label="Електронна пошта">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@student.uzhnu.edu.ua"
          />
        </Field>
        <Field id="password" label="Пароль">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Введи пароль"
          />
        </Field>
        <div className={styles.options}>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            Запам’ятати мене
          </label>
          <button type="button" className={styles.textButton}>
            Забув пароль?
          </button>
        </div>
        <Button>Увійти</Button>
      </form>
      <hr className={styles.divider} />
      <p className={styles.switchText}>Ще не маєш акаунта?</p>
      <Button secondary>Зареєструватися</Button>
    </AuthLayout>
  );
}
