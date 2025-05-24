import type { RegisterParams, LoginParams } from '../types/auth';

const API_URL = 'http://localhost:1337/api';

export async function register({ username, email, password }: RegisterParams) {
  const res = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData?.message?.[0]?.messages?.[0]?.message || 'Erro ao cadastrar',
    );
  }

  return res.json();
}

export async function login({ identifier, password }: LoginParams) {
  const res = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData?.message?.[0]?.messages?.[0]?.message || 'Erro ao logar',
    );
  }

  return res.json();
}
