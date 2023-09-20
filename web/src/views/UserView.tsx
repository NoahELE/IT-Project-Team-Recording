import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { useShowSnackbar } from '../utils';

export default function UserView() {
  const [snackbar, showSnackbar] = useShowSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    // Check if all the text is filled
    if (!username || !password) {
      showSnackbar('Please fill all the text field!');
      return;
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      showSnackbar('Username or password is not a string.');
      return;
    }

    const userData = {
      username,
      password,
    };
    console.log(JSON.stringify(userData, null, 2));

    login(userData)
      .then(() => {
        showSnackbar('Login success - Redirecting to Home Page', 'success');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        showSnackbar(`Login Failed - ${error}`);
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
          Hello User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Logout
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                Want to change password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {snackbar}
    </Container>
  );
}
