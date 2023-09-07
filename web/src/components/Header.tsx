import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  // TODO: find a better icon for header
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box flexGrow={1}>
          <img src="/logo.svg" alt="LOGO" height={50} />
        </Box>
        <Stack direction="row" spacing={1}>
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
