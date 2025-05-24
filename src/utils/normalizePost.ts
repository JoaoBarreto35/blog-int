// utils/normalizePost.ts
import type { FlatPost, PostFromAPI } from '../types/post';

export function normalizePost(post: PostFromAPI): FlatPost {
  return {
    id: post.id,
    documentId: post.documentId,
    title: post.title,
    slug: post.slug,
    content: post.content,
    published: post.published,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    publishedAt: post.publishedAt,
  };
}
