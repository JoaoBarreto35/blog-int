
import { useNavigate } from 'react-router-dom';
import type { FlatPost } from '../../types/post';
import styles from "./styles.module.css"

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

  const navigate = useNavigate();

  function handleRedirect() {
    navigate(`/posts/${post.slug}`);
  }
  return (

    <article
      className={styles.card}
      onClick={handleRedirect}
    >
      <h2 className={styles.title}>{post.title}</h2>
      <p>
        {shortDescription}
        {post.content && post.content.length > 100 ? '...' : ''}
      </p>
      <small>{formattedDate}</small>
    </article>
  );
}
