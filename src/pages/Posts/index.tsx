import { PostCard } from '../../components/PostCard';
import { PostsContainer } from '../../components/PostsContainer';
import { SearchBar } from '../../components/SearchBar';
import { usePosts } from '../../hooks/usePosts';

export default function Posts() {
  const { posts, search, setSearch, loading, error } = usePosts();

  return (
    <main style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h1>Todos os Posts</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder='Pesquisar posts por título'
      />

      {loading && <p>Carregando posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && posts.length === 0 && <p>Nenhum post encontrado.</p>}
      <PostsContainer>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      </PostsContainer>
      
    </main>
  );
}
