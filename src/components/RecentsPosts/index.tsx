import { NewspaperIcon } from 'lucide-react';
import { usePosts } from '../../hooks/usePosts';
import styles from "./styles.module.css"
import { useNavigate } from 'react-router-dom';

export default function RecentsPosts(){
  const { posts, loading, error } = usePosts(5);
  

  const navigate = useNavigate();

  function handleRedirect(id : string){
    navigate(`/posts/${id}`);
  }

  return(
    <div>
      
    {loading && <p>Carregando posts...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    
    {!loading && posts.length === 0 && <p>Nenhum post encontrado.</p>}
    
    <ul className={styles.list}>
      <h1>Posts Recentes <NewspaperIcon/> </h1>
      {posts.map(post => (
      <li onClick={() => handleRedirect(post.slug)}>

  
        <div className={styles.content}>
      
          <h4>{post.title}</h4>
        </div>
      </li>
       
        ))}
</ul>

    </div>
  );
}