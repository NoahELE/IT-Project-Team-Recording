import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useShowSnackbar } from '../utils.tsx';

const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

export default function ProfileView() {
  const [snackbar, showSnackbar] = useShowSnackbar();
  const [openPanel, setOpenPanel] = React.useState<string | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleEmailFormat = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setIsEmailValid(emailValidation.test(email));
  };

  const handleChangePasswordClick = () => {
    if (openPanel === 'changePassword') {
      setOpenPanel(null);
    } else {
      setOpenPanel('changePassword');
    }
  };

  const handlePasswordFormat = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setIsPasswordValid(passwordValidation.test(password));
  };

  const handleEditProfileClick = () => {
    if (openPanel === 'editProfile') {
      setOpenPanel(null);
    } else {
      setOpenPanel('editProfile');
    }
  };

  const handleLogout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('This is logout function');
  };

  const handleChangePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const email = data.get('email');
    const oldPassword = data.get('oldPassword');
    const newPassword = data.get('newPassword');
    const newConfirmPassword = data.get('newConfirmPassword');

    if (
      !username ||
      !email ||
      !oldPassword ||
      !newPassword ||
      !newConfirmPassword
    ) {
      showSnackbar('Please fill all the text field!');
      return;
    }

    // Check is email format correct
    if (!emailValidation.test(email as string)) {
      showSnackbar('Invalid email address.');
      return;
    }

    // Check is password format correct
    if (!passwordValidation.test(newPassword as string)) {
      showSnackbar(
        'Password must contain at least one uppercase letter, ' +
          'one lowercase letter, one number, ' +
          'and be at least 6 characters long.',
      );
      return;
    }

    // Check is password equal to confirm password
    if (newPassword !== newConfirmPassword) {
      showSnackbar('New password does not match.');
      return;
    }

    const userData = {
      username: data.get('username') as string,
      email: data.get('email') as string,
      oldPassword: data.get('oldPassword') as string,
      newPassword: data.get('newPassword') as string,
      newConfirmPassword: data.get('newConfirmPassword') as string,
    };
    console.log(JSON.stringify(userData, null, 2));
  };

  const handleEditProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('newUsername');
    const email = data.get('newEmail');

    if (!username || !email) {
      showSnackbar('Please fill all the text field!');
      return;
    }

    // Check is email format correct
    if (!emailValidation.test(email as string)) {
      showSnackbar('Invalid email address.');
      return;
    }

    const userData = {
      username: data.get('newUsername') as string,
      email: data.get('newEmail') as string,
    };
    console.log(JSON.stringify(userData, null, 2));
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
        <Button
          variant="text"
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleChangePasswordClick}
        >
          <ListItemText primary="Want to change password?" />
          {openPanel === 'changePassword' ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Box
          component="form"
          noValidate
          onSubmit={handleChangePassword}
          sx={{ mt: 3 }}
        >
          <Collapse
            in={openPanel === 'changePassword'}
            timeout="auto"
            unmountOnExit
          >
            <TextField
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              id="oldPassword"
              autoComplete="oldPassword"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
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
            <TextField
              required
              fullWidth
              name="newConfirmPassword"
              label="Confirm Password"
              type="password"
              id="newConfirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
          </Collapse>
        </Box>

        <Button
          variant="text"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleEditProfileClick}
        >
          <ListItemText primary="Edit Profile" />
          {openPanel === 'editProfile' ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Box
          component="form"
          noValidate
          onSubmit={handleEditProfileSubmit}
          sx={{ mt: 3 }}
        >
          <Collapse
            in={openPanel === 'editProfile'}
            timeout="auto"
            unmountOnExit
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="newUsername"
              label="New Username"
              type="newUsername"
              id="newUsername"
              autoComplete="newUsername"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newEmail"
              label="New Email"
              type="newEmail"
              id="newEmail"
              autoComplete="newEmail"
              onChange={handleEmailFormat}
              error={isEmailValid === false}
              helperText={
                isEmailValid === false ? 'Invalid email address.' : ''
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit Profile
            </Button>
          </Collapse>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleLogout} noValidate sx={{ mt: 1 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Logout
        </Button>
      </Box>
      {snackbar}
    </Container>
  );
}
