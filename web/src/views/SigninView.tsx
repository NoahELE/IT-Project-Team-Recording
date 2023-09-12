import * as React from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useShowError, signInPOST } from '../utils.tsx';

const defaultTheme = createTheme();

export default function SigninView() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      console.error('Username or password is not a string.');
      return;
    }

    const userData = {
      username,
      password,
    };
    console.log(JSON.stringify(userData, null, 2));

    signInPOST(userData)
      .then((data) => {
        console.log(data);
        showError(new Error('Sign in success!'), 'success');
      })
      .catch((error) => {
        showError(new Error('User Name or Password is not correct!'));
        console.error('SignIn ERROR:', error);
      });
  };
  const [snackbar, showError] = useShowError();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box mt={10}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href={'/signup'} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {snackbar}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
