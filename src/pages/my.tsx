import { useRecoilValue } from 'recoil';
import { Button } from '@mui/material';

import { authState } from '@/states/authState';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export default function Home() {
  const { user } = useRecoilValue(authState);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div>
      <p>Hello {user?.username}!</p>
      <Button variant="outlined" onClick={handleLogout}>
        LOGOUT
      </Button>
    </div>
  );
}
