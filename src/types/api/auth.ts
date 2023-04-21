import { User } from '@/models/user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RefreshTokenResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
}
