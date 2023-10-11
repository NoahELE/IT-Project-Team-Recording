import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { createRecording, updateRecording } from '../api';

interface Props {
  id?: string;
  text: string;
  type: 'create' | 'update';
}

export default function Recorder({ id, text, type }: Props) {
  const { mediaBlobUrl, status, startRecording, stopRecording } =
    useReactMediaRecorder({ audio: true });
  const [recordedTime, setRecordedTime] = useState(0.0);
  const isRecording = status === 'recording';

  const [recordingName, setRecordingName] = useState('');

  const uploadButtonOnClick = () => {
    if (mediaBlobUrl !== undefined) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => {
          if (type === 'create') {
            // FIXME also fetch text
            return createRecording({ name: recordingName }, blob);
          } else if (type === 'update') {
            if (id === undefined) {
              throw new Error('Expect id to be defined');
            }
            return updateRecording(id, { name: recordingName }, blob);
          }
        })
        .catch((err) => console.log(err));
    }
  };

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
    <Stack direction="row" spacing={5}>
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
          <>
            <TextField
              label="Recoding Name"
              onChange={(e) => setRecordingName(e.target.value)}
            />
            <Stack spacing={3} direction="row">
              <audio
                src={mediaBlobUrl}
                controls
                preload="metadata"
                style={{ width: 400 }}
              />
              <Button
                variant="contained"
                sx={{ alignSelf: 'center' }}
                onClick={uploadButtonOnClick}
              >
                Upload
              </Button>
            </Stack>
          </>
        )}
      </Stack>
      <Typography width={500}>{text}</Typography>
    </Stack>
  );
}
