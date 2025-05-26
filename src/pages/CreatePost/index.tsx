import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { uploadImage, createPost } from '../../services/postsServices';
import { showMessage } from '../../adapter';

export default function CreatePost() {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!token) throw new Error('Você precisa estar logado para criar posts.');

      let imageId: number | undefined;
      if (image) {
        console.log("📸 Enviando imagem...");
        imageId = await uploadImage(image, token);
      }

      await createPost(title, content, token, imageId);

      showMessage.success("✅ Post criado com sucesso!");
      setTitle('');
      setContent('');
      setImage(null);
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

        <label>
          Imagem:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) setImage(e.target.files[0]);
            }}
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