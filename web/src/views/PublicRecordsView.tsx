import { Box, Grid, Stack, Typography } from '@mui/material';

export default function PublicRecordsView() {
  return (
    <Box mt={10}>
      <Typography variant="h2" component="h1">
        TO DO...
      </Typography>
      <Stack direction="row" spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              sx={{
                backgroundColor: 'red',
              }}
            >
              <Typography variant="h4">Human Audio Recording Tool</Typography>
              <Box mt={5}>
                <Typography variant="body1">Subtitle 1</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                backgroundColor: 'green',
              }}
            >
              <Typography variant="h4">C-LARA Platform</Typography>
              <Box mt={5}>
                <Typography variant="body1">Subtitle 1</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                backgroundColor: 'blue',
              }}
            >
              <Typography variant="h4">Title 3</Typography>
              <Box mt={5}>
                <Typography variant="body1">Subtitle 1</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
