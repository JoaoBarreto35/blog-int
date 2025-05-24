import type { FlatPost } from '../../types/post';

interface PostCardProps {
  post: FlatPost;
}

export function PostCard({ post }: PostCardProps) {
  // Para evitar erro, uso encadeamento opcional e fallback
  const shortDescription =
    post.content.slice(0, 100) ?? 'Descrição não disponível';
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString()
    : 'Data indisponível';

  return (
    <article
      className='post-card'
      style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}
    >
      <h2>{post.title}</h2>
      <p>
        {shortDescription}
        {post.content && post.content.length > 100 ? '...' : ''}
      </p>
      <small>{formattedDate}</small>
    </article>
  );
}
