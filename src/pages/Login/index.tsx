import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
  const { handleLogin, loading, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleLogin({ email, password });
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Senha</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type='submit' disabled={loading} style={{ marginTop: 20 }}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </div>
  );
}
