import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { jwtVerify } from 'jose';

import { GetTokenResponse } from '@/types/api/auth';
import { authState } from '@/states/authState';
import { get } from '@/utils/request';

export function useAuthRequest() {
  const [{ token }, setAuthState] = useRecoilState(authState);
  const activeToken = useRef(token);

  useEffect(() => {
    activeToken.current = token;
  }, [token]);

  const refreshToken = async () => {
    const response = await get<GetTokenResponse>('/api/auth/token');
    if (response.success) {
      setAuthState((state) => ({ ...state, token: response.token }));
      activeToken.current = response.token;
    }
  };

  const authGet = async <T>(url: string) => {
    if (!activeToken.current) {
      await refreshToken();
    } else {
      try {
        await jwtVerify(
          activeToken.current,
          new TextEncoder().encode(
            process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET_KEY
          )
        );
      } catch (error) {
        await refreshToken();
      }
    }

    if (activeToken.current) {
      return get<T>(url, {
        Authorization: `Bearer ${activeToken.current}`,
      });
    }
  };

  return { authGet };
}
