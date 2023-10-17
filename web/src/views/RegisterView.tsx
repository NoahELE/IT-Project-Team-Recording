import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { termsAndConditionsContent } from '../T&D.ts';
import { register } from '../api';
import { useShowSnackbar } from '../utils';

const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

export default function RegisterView() {
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEmailFormat = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setIsEmailValid(emailValidation.test(email));
  };
  const handlePasswordFormat = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setIsPasswordValid(passwordValidation.test(password));
  };
  const handleTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const [snackbar, showSnackbar] = useShowSnackbar();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    // Check is all the text filled
    if (!username || !email || !password || !confirmPassword) {
      showSnackbar('Please fill all the text field!');
      return;
    }

    // Check is email format correct
    if (!emailValidation.test(email as string)) {
      showSnackbar('Invalid email address.');
      return;
    }

    // Check is password format correct
    if (!passwordValidation.test(password as string)) {
      showSnackbar(
        'Password must contain at least one uppercase letter, ' +
          'one lowercase letter, one number, ' +
          'and be at least 6 characters long.',
      );
      return;
    }

    // Check is password equal to confirm password
    if (password !== confirmPassword) {
      showSnackbar('Password does not match.');
      return;
    }

    const userData = {
      username: data.get('username') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    console.log(JSON.stringify(userData, null, 2));

    register(userData)
      .then(() => {
        showSnackbar(
          'Registration success - Redirecting to Login Page',
          'success',
        );
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      })
      .catch((error) => {
        showSnackbar(`Registration Failed - ${error}`);
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
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmailFormat}
                error={isEmailValid === false}
                helperText={
                  isEmailValid === false ? 'Invalid email address.' : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handlePasswordFormat}
                error={isPasswordValid === false}
                helperText={
                  isPasswordValid === false
                    ? 'Password must contain at' +
                      ' least one uppercase letter, one lowercase letter, one number,' +
                      ' and be at least 6 characters long.'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                required
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    onChange={handleTerm}
                  />
                }
                label={
                  <>
                    Accept{' '}
                    <Link href="#" onClick={handleDialogOpen}>
                      Terms & Conditions
                    </Link>
                  </>
                }
              />
              <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="xl"
                fullWidth={true}
              >
                <DialogTitle>Terms & Conditions</DialogTitle>
                <DialogContent>
                  <pre>{termsAndConditionsContent}</pre>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isChecked}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {snackbar}
    </Container>
  );
}
