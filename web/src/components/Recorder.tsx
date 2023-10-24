import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { submitTask } from '../api';
import { Task } from '../entity';
import { useShowSnackbar } from '../utils';

interface Props {
  task: Task;
}

export default function Recorder({ task }: Props) {
  const { mediaBlobUrl, status, startRecording, stopRecording } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: { type: 'audio/wav' },
    });
  const [recordedTime, setRecordedTime] = useState(0.0);
  const isRecording = status === 'recording';

  const [snackbar, showSnackbar] = useShowSnackbar();

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

  const uploadButtonOnClick = () => {
    if (mediaBlobUrl !== undefined) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => submitTask(task.task_id, task.block_id, blob))
        .catch((err) => {
          showSnackbar(`Failed to upload task - ${err}`);
        });
    }
  };

  return (
    <>
      <Typography variant="h5">Recording Task {task.block_id}</Typography>
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
          <Typography variant="subtitle1">
            Recorded Time: {recordedTime.toFixed(1)} seconds.
          </Typography>
          {mediaBlobUrl !== undefined && (
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
          )}
        </Stack>
        <Typography variant="body1" width={500}>
          {task.text}
        </Typography>
      </Stack>
      {snackbar}
    </>
  );
}
