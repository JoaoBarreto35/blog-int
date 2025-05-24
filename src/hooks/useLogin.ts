import { useState } from 'react';
import { login } from '../services/authService';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    setError(null);

    try {
      // Strapi espera o campo 'identifier' para login, que pode ser email
      const res = await login({ identifier: email, password });
      localStorage.setItem('token', res.jwt);
      localStorage.setItem('user', JSON.stringify(res.user));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, loading, error };
}
