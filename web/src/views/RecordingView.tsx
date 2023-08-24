import { Button, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

export default function RecordingView() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
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

  return (
    <Container>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            disabled={isRecording}
            onClick={startRecording}
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
        {mediaBlobUrl !== undefined && <audio src={mediaBlobUrl} controls />}
      </Stack>
    </Container>
  );
}
