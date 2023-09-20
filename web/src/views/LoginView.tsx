import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api.ts';
import { useShowError } from '../utils.tsx';

export default function LoginView() {
  const [snackbar, showError] = useShowError();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    // Check if all the text is filled
    if (!username || !password) {
      showError(new Error('Please fill all the text field!'));
      return;
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      showError(new Error('Username or password is not a string.'));
      return;
    }

    const userData = {
      username,
      password,
    };
    console.log(JSON.stringify(userData, null, 2));

    login(userData)
      .then(() => {
        showError(
          new Error('Login success - Redirecting to Home Page'),
          'success',
        );
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        showError(new Error(`Login Failed - ${error}`));
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {snackbar}
    </Container>
  );
}
