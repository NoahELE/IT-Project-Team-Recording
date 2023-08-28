import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function RootView() {
  return (
    <>
      <Header />
      <Box mt={10}>
        <Outlet />
      </Box>
    </>
  );
}
