import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
  return (
    <Stack
      component="form"
      spacing={1}
      css={{
        width: '300px',
        margin: 'auto',
      }}
    >
      <TextField label="email" variant="outlined" />
      <TextField label="password" variant="outlined" type="password" />
      <Button type="submit" variant="contained">
        SUBMIT
      </Button>
    </Stack>
  );
}
