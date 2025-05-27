import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPost } from '../../services/postsServices';
import type { FlatPost } from '../../types/post';
import styles from "./styles.module.css"
import Header from '../../components/Header';

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<FlatPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetchPost(slug)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Carregando post...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!post) return <p>Post não encontrado</p>;

  // Corrige a URL da imagem, adicionando a base do Strapi se necessário
 const imageUrl = post.image?.url ? `http://localhost:1337${post.image.url}` : null;

  return (
    <div>
      <Header/>
      <div className={styles.titleContainer}>
        <div className={styles.left}>
          {imageUrl ? <div><img src={imageUrl} alt={post.title} /><p>BarretoTech: Imagem gerada por IA</p></div> : <p>Imagem não disponível</p>}
          
        </div>
           <h1 className={styles.title}>{post.title}</h1>
           <div className={styles.detail}>
            <div className={styles.detail2}></div>
           </div>
      </div>

      <div className={styles.content}>
        <div></div>
        <p>{post.content}</p>
        <div className={styles.ads}>
          <div className={styles.adstest}>ADS</div>
          <div className={styles.adstest}>ADS</div>
          <div className={styles.adstest}>ADS</div>
          <div className={styles.adstest}>ADS</div>
        </div>
      </div>
      
    </div>
  );
}