// hooks/usePosts.ts
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
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [limit]);
  useEffect(() => {
    console.log('Posts do backend:', posts);
  }, [posts]);

  useEffect(() => {
    const lowerSearch = search.toLowerCase().trim();
    const results = posts.filter(post =>
      post.title?.toLowerCase().includes(lowerSearch),
    );

    setFilteredPosts(results);
  }, [search, posts]);

  return { posts: filteredPosts, search, setSearch, loading, error };
}
