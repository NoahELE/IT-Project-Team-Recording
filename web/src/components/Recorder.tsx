import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

export default function Recorder() {
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

  return (
    <Stack direction="row" spacing={10}>
      <Stack spacing={3} flexGrow={1}>
        <Box width={500}>
          {isRecording ? (
            <Button variant="contained" color="error" onClick={stopRecording}>
              Stop Recording
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                startRecording();
                setRecordedTime(0.0);
              }}
            >
              Start Recording
            </Button>
          )}
        </Box>
        <Typography variant="h5">
          Recorded Time: {recordedTime.toFixed(1)} seconds.
        </Typography>
        {mediaBlobUrl !== undefined && (
          <audio
            src={mediaBlobUrl}
            controls
            preload="metadata"
            style={{ width: 400 }}
          />
        )}
      </Stack>
      <Typography width={500}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem aliquid
        expedita voluptatem est placeat sint eligendi dolor? Eveniet ex placeat
        modi? Velit, officiis dolorum soluta doloremque iste voluptate quisquam
        provident.
      </Typography>
    </Stack>
  );
}
