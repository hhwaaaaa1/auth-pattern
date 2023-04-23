import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { GetUserResponse } from '@/types/api/auth';
import { authState } from '@/states/authState';
import { useAuthRequest } from '@/hooks/useAuthRequest';

interface UserRootProps {
  children: React.ReactNode;
}

export default function UserRoot({ children }: UserRootProps) {
  const setAuthState = useSetRecoilState(authState);
  const { authGet } = useAuthRequest();

  useQuery(
    'auth/user',
    () => authGet<GetUserResponse>('/api/auth/user'),
    {
      onSuccess: (user) => {
        setAuthState((state) => ({
          ...state,
          user,
          isUserInitialized: true,
        }));
      },
    }
  );

  return <>{children}</>;
}
