export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId?: string; // Opcional, caso nem todos os posts tenham esse campo
 image?: {
    id: number;
    url: string;
  }; // Ajustado para refletir a resposta da API corretamente
}

export interface FlatPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId?: string;
  image?: {
    id: number;
    url: string;
  }; // Ajustado para refletir a resposta da API corretamente
}
// Tipo esperado ao receber os dados da API
export interface PostFromAPI {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId?: string;
  image?: {
    id: number;
    url: string;
  };
}

// Tipo usado ao criar um post (sem `url`, só o ID)
export interface PostToCreate {
  title: string;
  content: string;
  slug: string;
  published: boolean;
  image?: {id:number}; // 🔹 Aqui precisa seguir o formato correto para criar no Strapi
}
// Se `Int` for realmente necessário, inclua ele aqui
export interface Int {
  key: string;
  value: number;
}