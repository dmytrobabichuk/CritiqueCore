import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useMutation from './useMutation';
export default function useAuth() {
  const context = useContext(AuthContext);
  const mutation = useMutation();
  async function authenticate(mode, values) {
    const data = await mutation.send(`/auth/${mode}`, values);
    context.setUser(data.user);
  }
  async function logout() {
    await mutation.send('/auth/logout', {});
    context.setUser(null);
  }
  return { ...context, ...mutation, authenticate, logout };
}
