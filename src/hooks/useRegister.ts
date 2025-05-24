import { useState } from 'react';
import { register } from '../services/authService';
import type { RegisterParams } from '../types/auth';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (data: RegisterParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await register(data);
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido');
      }
      throw err; // opcional: relança o erro para tratamento no componente
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    loading,
    error,
  };
}
