import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

import { authState } from '@/states/authState';
import { withAuth } from '@/hoc/withAuth';
import { useAuthAPI } from '@/hooks/useAuthAPI';

export default withAuth(function My() {
  const { user } = useRecoilValue(authState);
  const { logout } = useAuthAPI();
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
});
