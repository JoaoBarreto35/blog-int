import { useEffect, useState } from 'react';
import { fetchPosts } from '../services/postsServices';
import type { FlatPost } from '../types/post';

export function usePosts(limit = 50) {
  const [posts, setPosts] = useState<FlatPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<FlatPost[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPosts(limit);
        if (data.length > 0) {
          setPosts(data);
          setFilteredPosts(data);
        } else {
          setError('Nenhum post encontrado');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
      } finally {
        setLoading(false);
      }
    }

    if (posts.length === 0) { // Evita requisições repetidas desnecessárias
      loadPosts();
    }
  }, [limit,posts.length]);

  useEffect(() => {
    if (posts.length > 0) {
      console.log('Posts do backend:', posts);
    }
  }, [posts]);

  useEffect(() => {
    if (search.trim()) {
      const lowerSearch = search.toLowerCase().trim();
      const results = posts.filter(post => post.title?.toLowerCase().includes(lowerSearch));
      setFilteredPosts(results);
    } else {
      setFilteredPosts(posts); // Se não houver pesquisa, mantém todos os posts
    }
  }, [search, posts]);

  return { posts: filteredPosts, search, setSearch, loading, error };
}