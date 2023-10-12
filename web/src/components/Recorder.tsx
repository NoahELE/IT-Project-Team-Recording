import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { postTask } from '../api';
import { Task } from '../entity';

interface Props {
  taskId: string;
  task: Task;
}

export default function Recorder({ taskId, task }: Props) {
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

  const uploadButtonOnClick = () => {
    if (mediaBlobUrl !== undefined) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => {
          postTask(taskId, task.file, blob).catch((err) => {
            console.error(err);
          });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <Typography variant="h5">Recording Task {task.id}</Typography>
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
    </>
  );
}
