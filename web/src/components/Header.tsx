import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ marginRight: '5rem' }}>
          <img src="/vite.svg" alt="LOGO" />
        </Box>
        <Button color="inherit" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate('/recording')}>
          Recording Management
        </Button>
        <Button color="inherit" onClick={() => navigate('/public')}>
          Public Records
        </Button>
        <Button color="inherit" onClick={() => navigate('/signin')}>
          Sign in/up
        </Button>
      </Toolbar>
    </AppBar>
  );
}
