export interface Post {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug: string;
    createdAt: string;
  };
}
// types/post.ts
export interface FlatPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string; // ✅ Adicione essa linha
}

// types/post.ts

export interface PostFromAPI {
  id: number;

  documentId: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
