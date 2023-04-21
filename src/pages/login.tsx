import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { LoginRequest } from '@/types/api/auth';
import { userState } from '@/states/userState';
import { post } from '@/utils/request';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUserState = useSetRecoilState(userState);
  const router = useRouter();

  const handleChangeEmail = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(value);
  };

  const handleChangePassword = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    try {
      const token = await post<string, LoginRequest>(
        '/api/auth/login',
        {
          email,
          password,
        }
      );
      setUserState({ token });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      spacing={1}
      css={{
        width: '300px',
        margin: 'auto',
      }}
    >
      <TextField
        label="email"
        variant="outlined"
        onChange={handleChangeEmail}
      />
      <TextField
        label="password"
        variant="outlined"
        type="password"
        onChange={handleChangePassword}
      />
      <Button
        type="button"
        variant="contained"
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
    </Stack>
  );
}
