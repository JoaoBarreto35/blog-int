// utils/normalizePost.ts
import type { FlatPost, Post } from '../types/post';

export function normalizePost(post: Post): FlatPost {
  return {
    id: post.id,
    documentId: post.documentId || '',
    title: post.title || 'Sem título',
    slug: post.slug || '',
    content: post.content || '',
    published: post.published ?? false,
    createdAt: post.createdAt || '',
    updatedAt: post.updatedAt || '',
    publishedAt: post.publishedAt || '',
    image: post.image ? { id: post.image.id, url: post.image.url } : undefined, // Agora o formato está correto
  };
}
