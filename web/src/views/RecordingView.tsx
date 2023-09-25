import { Button, Container, Divider, Stack } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRecording, getAllRecordings } from '../api';
import Recorder from '../components/Recorder';
import RecordingList from '../components/RecordingList';
import { Recording } from '../entity';
import { useShowSnackbar } from '../utils';

export default function RecordingView() {
  const navigate = useNavigate();

  const [snackbar, showSnackbar] = useShowSnackbar();

  const [recordings, setRecordings] = useState<Recording[]>([]);
  useEffect(() => {
    getAllRecordings()
      .then((recordings) => {
        setRecordings(recordings);
      })
      .catch((error) => {
        showSnackbar(`Failed to fetch recordings - ${error}`);
      });
  }, [navigate, showSnackbar]);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  return (
    <Container sx={{ mt: 10 }}>
      <Stack spacing={5}>
        <Recorder />

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
                if (typeof id !== 'string') {
                  throw new Error('Expected id to be string');
                }

                deleteRecording(id).catch((error) => {
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
