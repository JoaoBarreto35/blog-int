// pages/CreatePost.tsx
import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { createPost } from '../../services/postsServices';

export default function CreatePost() {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!token)
        throw new Error('Você precisa estar logado para criar posts.');

      await createPost(title, content, token);

      alert('Post criado com sucesso!');
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Criar Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Conteúdo:
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </label>

        <button type='submit' disabled={loading}>
          {loading ? 'Criando...' : 'Criar Post'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
