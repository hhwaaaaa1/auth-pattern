import { atom } from 'recoil';

import { User } from '@/models/user';

type UserState = Omit<User, 'password'> & {
  token: string;
};

export const userState = atom<UserState>({
  key: 'userState',
});
