import { useState } from 'react';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { LoginRequest, LoginResponse } from '@/types/api/auth';
import { post } from '@/utils/request';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      const response = await post<LoginResponse, LoginRequest>(
        '/api/auth/login',
        {
          email,
          password,
        }
      );
      console.log(response);
      // TODO: user data 저장
      // TODO: access token 저장
      // TODO: refresh token 저장
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
      <Button type="button" variant="contained" onClick={handleSubmit}>
        SUBMIT
      </Button>
    </Stack>
  );
}
