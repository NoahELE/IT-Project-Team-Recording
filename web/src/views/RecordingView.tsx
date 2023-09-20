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
import { useNavigate } from 'react-router-dom';
import { deleteRecording, getAllRecordings } from '../api';
import RecordingList from '../components/RecordingList';
import { Recording } from '../entity';
import { useShowSnackbar } from '../utils';

export default function RecordingView() {
  const navigate = useNavigate();
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

  const [snackbar, showSnackbar] = useShowSnackbar();

  const [recordings, setRecordings] = useState<Recording[]>([]);
  useEffect(() => {
    getAllRecordings()
      .then((recordings) => {
        setRecordings(recordings);
      })
      .catch((error: Error) => {
        showSnackbar(`Failed to fetch recordings - ${error.message}`);
        if (
          error.message ===
          'It seems that you are not logged in. Please login first.'
        ) {
          navigate('/login');
        } else if (
          error.message ===
          'It seems that your token is invalid. Please login again.'
        ) {
          navigate('/login');
        }
      });
  }, [navigate, showSnackbar]);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  return (
    <Container sx={{ mt: 10 }}>
      <Stack spacing={5}>
        <Stack direction="row" spacing={10}>
          <Stack spacing={3} flexGrow={1}>
            <Box width={500}>
              {isRecording ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={stopRecording}
                >
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
            expedita voluptatem est placeat sint eligendi dolor? Eveniet ex
            placeat modi? Velit, officiis dolorum soluta doloremque iste
            voluptate quisquam provident.
          </Typography>
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
                deleteRecording(id as string).catch((error) => {
                  showSnackbar(
                    `Failed to delete recording with id ${id} - ${error}`,
                  );
                });
              });
            }}
          >
            Delete Selected
          </Button>
        </Stack>
      </Stack>
      {snackbar}
    </Container>
  );
}
