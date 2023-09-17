import DashboardIcon from '@mui/icons-material/Dashboard';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from '/home.svg';

export default function HomeView() {
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: '36rem',
          backgroundColor: 'rgb(247, 249, 252)',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container style={{ maxWidth: '100rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  height: '30rem',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h3" component="h1">
                  Welcome to
                </Typography>
                <Typography
                  variant="h2"
                  component="h1"
                  color="rgb(56, 116, 203)"
                >
                  Recording Management
                </Typography>
                <Box mt={3}>
                  <Typography variant="body1" gutterBottom>
                    The site offers translation and recording capabilities.
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    You can record your own voice by selecting text in a
                    language you are familiar with.
                  </Typography>
                </Box>
                <Box mt={5}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="/public"
                    style={{ marginRight: '1rem' }}
                  >
                    Check out Public Records
                  </Button>
                  <Button variant="contained" color="primary" href="/register">
                    Register
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  backgroundImage: `url(${Image})`,
                  backgroundSize: '80%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  height: '100%',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              ></Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '36rem',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            height: '80%',
            p: 2,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Grid container spacing={5}>
              <Grid item xs={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <RecordVoiceOverIcon
                    style={{ color: 'green', fontSize: '3rem' }}
                  />
                  <Box mt={2}>
                    <Typography variant="h4">
                      Human Audio Recording Tool
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="body1">
                      Designed to revolutionize the way you record audio. It
                      allows users to easily create new audio files or update
                      existing ones, providing a seamless experience for all
                      your recording needs. Whether you're recording a project
                      that doesn't yet have an audio file or re-recording an
                      existing file, our tool makes the process simple and
                      efficient.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <DashboardIcon style={{ color: 'green', fontSize: '3rem' }} />
                  <Box mt={2}>
                    <Typography variant="h4">C-LARA Platform</Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="body1">
                      The C-LARA platform is a comprehensive solution designed
                      to manage and facilitate the entire audio recording
                      process. It allows users to send recording requests,
                      manage tasks, download current content, and even delete
                      recording tasks as needed. It is a one-stop platform for
                      all your recording management needs.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <VerifiedUserIcon
                    style={{ color: 'green', fontSize: '3rem' }}
                  />
                  <Box mt={2}>
                    <Typography variant="h4">
                      Easy-to-use User Interface
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="body1">
                      Our tools and platforms are designed to be very
                      user-friendly. The simple and clear interface design makes
                      it easy for users to get started without having to spend a
                      lot of time learning how to use it. Our goal is to allow
                      users to focus more on their recording tasks rather than
                      wasting time on complex operations.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
