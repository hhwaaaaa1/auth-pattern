import { useSetRecoilState } from 'recoil';

import { LoginRequest, LoginResponse } from '@/types/api/auth';
import { authState } from '@/states/authState';
import { get, post } from '@/utils/request';

export function useAuthAPI() {
  const setAuthState = useSetRecoilState(authState);

  const login = async (email: string, password: string) => {
    const { user, token } = await post<LoginResponse, LoginRequest>(
      '/api/auth/login',
      { email, password }
    );
    setAuthState({ user, token, isUserInitialized: true });
  };

  const logout = async () => {
    await get('/api/auth/logout');
    setAuthState({ isUserInitialized: true });
  };

  return { login, logout };
}
