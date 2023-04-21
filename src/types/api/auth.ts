import { User } from '@/models/user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export type GetTokenResponse =
  | { success: true; token: string }
  | { success: false };

export type GetUserResponse = Omit<User, 'password'>;
