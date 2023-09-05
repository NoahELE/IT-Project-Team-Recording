import { Box, Container, Stack } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import RecordingList from '../components/RecordingList';
import { Recording } from '../entity';

// HACK: mock data of the recordings
const recordings: Recording[] = [
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
  const { mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  return (
    <Box mt={10}>
      <Container>
        <Stack spacing={5}>
          <Stack direction="row" spacing={10}>
            {mediaBlobUrl !== undefined && (
              <audio src={mediaBlobUrl} controls />
            )}
          </Stack>
          <RecordingList
            recordings={recordings}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
          />
        </Stack>
      </Container>
    </Box>
  );
}
