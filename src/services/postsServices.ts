import type { FlatPost, PostFromAPI, PostToCreate } from '../types/post';
import { normalizePost } from '../utils/normalizePost';

const API_URL = 'http://localhost:1337/api/posts';
const UPLOAD_URL = 'http://localhost:1337/api/upload';

/**
 * Busca um post pelo slug, garantindo que a imagem seja carregada corretamente.
 */
export async function fetchPost(slug: string): Promise<FlatPost> {
  const res = await fetch(`${API_URL}?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image`);
  const data = await res.json();

  console.log('🔎 Resposta da API (fetchPost):', JSON.stringify(data, null, 2));

  if (!res.ok || !data.data?.length) {
    throw new Error('Erro ao buscar post');
  }

  return normalizePost(data.data[0]);
}

/**
 * Busca múltiplos posts com limite definido.
 */
export async function fetchPosts(limit = 10): Promise<FlatPost[]> {
  const res = await fetch(`${API_URL}?pagination[limit]=${limit}&populate=image`);
  const data = await res.json();

  console.log('🔎 Resposta da API (fetchPosts):', JSON.stringify(data, null, 2));

  if (!res.ok || !data.data.length) {
    throw new Error('Erro ao buscar posts');
  }

  return data.data.map((post: PostFromAPI) => normalizePost(post));
}

/**
 * Faz o upload de uma imagem e retorna seu ID.
 */
export async function uploadImage(image: File, token: string): Promise<number> {
  const formData = new FormData();
  formData.append('files', image);

  const res = await fetch(UPLOAD_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  console.log('🖼️ Resposta do upload:', JSON.stringify(data, null, 2));

  if (!res.ok || !data[0]?.id) {
    console.error('❌ Erro ao enviar imagem:', data);
    throw new Error(data.error?.message || 'Erro no upload de imagem');
  }

  return data[0].id;
}

/**
 * Cria um novo post e associa a imagem corretamente.
 */
export async function createPost(
  title: string,
  content: string,
  token: string,
  imageId?: number
): Promise<PostFromAPI> {
  const slug = slugify(title);

  const dataPayload: PostToCreate = {
    title,
    content,
    slug,
    published: true,
  };

  if (imageId) {
    dataPayload.image = { id: imageId }; // ✅ Ajuste para vincular corretamente no Strapi
  }

  console.log('📸 Enviando dados para criação do post:', JSON.stringify(dataPayload, null, 2));

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: dataPayload }),
  });

  const data = await res.json();

  console.log('📝 Resposta ao criar post:', JSON.stringify(data, null, 2));

  if (!res.ok) {
    console.error('❌ Erro ao criar post:', data);
    throw new Error(data.error?.message || 'Erro na criação do post');
  }

  return data.data;
}

/**
 * Função utilitária para criar slugs a partir do título.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // remove acentos
    .replace(/[\u0300-\u036f]/g, '') // remove marcas de acentuação
    .trim()
    .replace(/[\s\W-]+/g, '-') // transforma espaços em "-"
    .replace(/^-+|-+$/g, ''); // remove "-" extras do início e fim
}