import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Collapse,
  Container,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword, editProfile } from '../api';
import { useShowSnackbar } from '../utils.tsx';

const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

export default function ProfileView() {
  const [snackbar, showSnackbar] = useShowSnackbar();
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  function findTime() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleEmailFormat = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setIsEmailValid(emailValidation.test(email));
  };

  const handlePasswordFormat = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setIsPasswordValid(passwordValidation.test(password));
  };

  const handleChangePasswordClick = () => {
    if (openPanel === 'changePasswordOpen') {
      setOpenPanel(null);
    } else {
      setOpenPanel('changePasswordOpen');
    }
  };

  const handleEditProfileClick = () => {
    if (openPanel === 'editProfileOpen') {
      setOpenPanel(null);
    } else {
      setOpenPanel('editProfileOpen');
    }
  };

  const handleLogout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleChangePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const oldPassword = data.get('oldPassword');
    const newPassword = data.get('newPassword');
    const newConfirmPassword = data.get('newConfirmPassword');

    if (!oldPassword || !newPassword || !newConfirmPassword) {
      showSnackbar('Please fill all the text field!');
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
      oldPassword: oldPassword as string,
      newPassword: newPassword as string,
    };
    console.log(JSON.stringify(userData, null, 2));

    changePassword(userData)
      .then(() => {
        showSnackbar('Change Password Success', 'success');
      })
      .catch((error) => {
        showSnackbar(`Change Password Failed - ${error}`);
      });
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

    editProfile(userData)
      .then(() => {
        showSnackbar('Edit Profile Success', 'success');
      })
      .catch((error) => {
        showSnackbar(`Edit Profile Failed - ${error}`);
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
          {findTime()}
        </Typography>
        <Button
          variant="text"
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleChangePasswordClick}
        >
          <ListItemText primary="Want to change password?" />
          {openPanel === 'changePasswordOpen' ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Box
          component="form"
          noValidate
          onSubmit={handleChangePassword}
          sx={{ mt: 3 }}
        >
          <Collapse
            in={openPanel === 'changePasswordOpen'}
            timeout="auto"
            unmountOnExit
          >
            <Stack spacing={2} width={500}>
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
            </Stack>
          </Collapse>
        </Box>

        <Button
          variant="text"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleEditProfileClick}
        >
          <ListItemText primary="Edit Profile" />
          {openPanel === 'editProfileOpen' ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Box
          component="form"
          noValidate
          onSubmit={handleEditProfileSubmit}
          sx={{ mt: 3 }}
        >
          <Collapse
            in={openPanel === 'editProfileOpen'}
            timeout="auto"
            unmountOnExit
          >
            <Stack spacing={2} width={500}>
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
            </Stack>
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
