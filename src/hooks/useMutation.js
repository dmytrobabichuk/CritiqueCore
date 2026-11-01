import { useState } from 'react';
import { request } from '../services/api';
export default function useMutation() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function send(path, body) {
    setPending(true);
    setError('');
    try {
      return await request(path, { method: 'POST', body });
    } catch (failure) {
      setError(failure.message);
      throw failure;
    } finally {
      setPending(false);
    }
  }
  return { send, pending, error };
}
