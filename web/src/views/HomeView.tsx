import { Container, Typography } from '@mui/material';

export default function HomeView() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ marginBottom: '3rem' }}>
        Recording Management
      </Typography>
      <Typography variant="subtitle1">
        C-LARA currently only uses TTS audio Human audio is better for
        high-quality texts. <br />
        More examples on LARA site <br />
        Task: implement human audio recording tool
      </Typography>
    </Container>
  );
}
