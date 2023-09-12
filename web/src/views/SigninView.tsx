import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { FormEvent } from 'react';
import { signIn } from '../api.ts';
import { useShowError } from '../utils.tsx';

const defaultTheme = createTheme();

export default function SignInView() {
  const [snackbar, showError] = useShowError();
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
      console.error('Username or password is not a string.');
      return;
    }

    const userData = {
      username,
      password,
    };
    console.log(JSON.stringify(userData, null, 2));

    signIn(userData).catch((error) => {
      showError(error as Error);
      console.error('Sign In ERROR:', error);
    });
  };

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
