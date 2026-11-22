import { useNavigate } from 'react-router';
import AuthLayout from '../components/AuthLayout';
import Field from '../components/Field';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
export default function AuthPage({ register = false }) {
  const auth = useAuth();
  const navigate = useNavigate();
  async function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await auth.authenticate(register ? 'register' : 'login', values);
      navigate('/');
    } catch {
      /* Помилку відображає хук. */
    }
  }
  return (
    <AuthLayout>
      <h1>{register ? 'Створити акаунт' : 'З поверненням'}</h1>
      <form onSubmit={submit}>
        {register && (
          <Field id="name" label="Ім’я">
            <input
              id="name"
              name="name"
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
            />
          </Field>
        )}
        <Field id="email" label="Електронна пошта">
          <input id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field id="password" label="Пароль">
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            maxLength={128}
            autoComplete={register ? 'new-password' : 'current-password'}
          />
        </Field>
        {auth.error && <p role="alert">{auth.error}</p>}
        <Button type="submit" disabled={auth.pending}>
          {auth.pending ? 'Зачекай…' : register ? 'Зареєструватися' : 'Увійти'}
        </Button>
      </form>
      <hr />
      <Button secondary to={register ? '/login' : '/register'}>
        {register ? 'Перейти до входу' : 'Створити акаунт'}
      </Button>
    </AuthLayout>
  );
}
