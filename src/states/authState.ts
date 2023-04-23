import { atom } from 'recoil';
import { v4 } from 'uuid';

import { User } from '@/models/user';

interface AuthState {
  isUserInitialized: boolean;
  user?: Omit<User, 'password'>;
  token?: string;
}

export const authState = atom<AuthState>({
  key: `authState/${v4()}`,
  default: {
    isUserInitialized: false,
  },
});
