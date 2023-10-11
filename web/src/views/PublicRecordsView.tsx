import { Container, Stack } from '@mui/material';
import PublicRecordsList from '../components/PublicRecordsList';
import { PublicRecord } from '../entity';

// HACK: mock data of the recordings
const records: PublicRecord[] = [
  {
    id: '1',
    name: 'Recording 1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    text: 'They lived with their mother in a sand-bank, underneath the root of a very big fir-tree.',
  },
  {
    id: '2',
    name: 'Recording 2',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    text: 'Once upon a time there were four little rabbits, and their names were Flopsy, Mopsy, Cottontail and Peter.',
  },
];

export default function PublicRecordsView() {
  return (
    <Container sx={{ mt: 10 }}>
      <Stack spacing={5}>
        <PublicRecordsList records={records} />
      </Stack>
    </Container>
  );
}
