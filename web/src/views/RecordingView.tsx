import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import RecordingList from '../components/RecordingList';
import { Recording } from '../entity';

// HACK: mock data of the recordings
const recordings: Recording[] = [
  {
    id: '1',
    name: 'Recording 1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    name: 'Recording 2',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
];

export default function RecordingView() {
  const { mediaBlobUrl, status, startRecording, stopRecording } =
    useReactMediaRecorder({ audio: true });

  const [recordedTime, setRecordedTime] = useState(0.0);
  const isRecording = status === 'recording';
  useEffect(() => {
    let intervalId: number | null = null;
    if (isRecording) {
      intervalId = setInterval(() => {
        setRecordedTime((prev) => prev + 0.1);
      }, 100);
    }
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [isRecording]);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  return (
    <Box mt={10}>
      <Container>
        <Stack spacing={5}>
          <Stack direction="row" spacing={10}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={3}>
                <Button
                  variant="contained"
                  disabled={isRecording}
                  onClick={() => {
                    startRecording();
                    setRecordedTime(0.0);
                  }}
                >
                  Start Recording
                </Button>
                <Button
                  variant="contained"
                  disabled={!isRecording}
                  onClick={stopRecording}
                >
                  Stop Recording
                </Button>
              </Stack>
              <Typography variant="h5">
                Recorded Time: {recordedTime.toFixed(1)} seconds.
              </Typography>
            </Stack>
            {mediaBlobUrl !== undefined && (
              <audio src={mediaBlobUrl} controls />
            )}
          </Stack>

          <Divider variant="middle" />

          <RecordingList
            recordings={recordings}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
          />

          <Stack direction="row-reverse" spacing={3}>
            <Button
              onClick={() => {
                rowSelectionModel.forEach((id) => {
                  // TODO: delete the selected recordings
                  console.log(id);
                });
              }}
            >
              Delete Selected
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
