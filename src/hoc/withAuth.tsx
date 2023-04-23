/* eslint-disable react/display-name */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { authState } from '@/states/authState';

export function withAuth<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
) {
  return (props: P) => {
    if (typeof window === undefined) {
      return null;
    }

    const { user, isUserInitialized } = useRecoilValue(authState);
    const router = useRouter();

    useEffect(() => {
      if (isUserInitialized && !user) {
        router.replace('/login');
      }
    }, [isUserInitialized, router]);

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}
