// services/postsService.ts
import type { FlatPost, PostFromAPI } from '../types/post';
import { normalizePost } from '../utils/normalizePost';

const API_URL = 'http://localhost:1337/api/posts';

export async function fetchPosts(limit = 10): Promise<FlatPost[]> {
  const res = await fetch(`${API_URL}?pagination[limit]=${limit}`);
  if (!res.ok) throw new Error('Erro ao buscar posts');

  const data = await res.json();
  return data.data.map((post: PostFromAPI) => normalizePost(post));
}

export async function createPost(
  title: string,
  content: string,
  token: string,
): Promise<FlatPost> {
  const slug = slugify(title);

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        title,
        content,
        slug,
      },
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || 'Erro ao criar post');
  }

  const data = await res.json();
  return normalizePost(data.data);
}

// Pode estar num utils separado, ou interno:
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
