import { useState } from 'react';
import { useRegister } from '../../hooks/useRegister';
import type { RegisterParams } from '../../types/auth';

export default function RegisterPage() {
  const { handleRegister, loading, error } = useRegister();
  const [form, setForm] = useState<RegisterParams>({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await handleRegister(form);
      console.log('Usuário registrado:', response);
      // redirecionar ou mostrar sucesso, se quiser
    } catch {
      // erro já tratado no hook
    }
  };
  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário</label>
          <input
            type='text'
            name='username'
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>E-mail</label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type='submit' disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
