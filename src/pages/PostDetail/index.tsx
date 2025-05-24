import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      <h1>Detalhes do Post</h1>
      <p>
        Slug do post: <strong>{slug}</strong>
      </p>
      {/* Aqui depois você pode buscar os dados do post usando o slug */}
    </div>
  );
}
