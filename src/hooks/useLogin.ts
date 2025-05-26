import { useState } from 'react';
import { useAuth } from '../context/useAuth'; // ajuste o path se necessário
import { login } from '../services/authService';


export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useAuth(); // pega função do AuthContext

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
      const res = await login({ identifier: email, password });
      console.log('User salvo no contexto:', res.user);


      // Atualiza o contexto, que também atualiza o localStorage
      authLogin(res.user, res.jwt);
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
