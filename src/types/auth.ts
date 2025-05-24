export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export interface LoginParams {
  identifier: string; // pode ser username ou email
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}
