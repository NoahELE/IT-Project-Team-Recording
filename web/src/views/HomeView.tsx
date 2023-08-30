import { Typography, Button, Container, Box } from '@mui/material';

export default function HomeView() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1">
          Welcome to Recording Management
        </Typography>
        <Typography variant="body1" gutterBottom>
          The site offers translation and recording capabilities. You can record
          your own voice by selecting text in a language you are familiar with.
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" href="/public">
            Get Started
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
