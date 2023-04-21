import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { Button } from '@mui/material';

import { authState } from '@/states/authState';

export default function Home() {
  const { user } = useRecoilValue(authState);
  const router = useRouter();

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <Button variant="outlined" onClick={() => router.push(`/my`)}>
          MY PAGE
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={() => router.push('/login')}
        >
          LOGIN
        </Button>
      )}
    </div>
  );
}
