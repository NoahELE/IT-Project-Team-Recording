import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, getAllTasks } from '../api';
import Recorder from '../components/Recorder';
import TaskList from '../components/TaskList';
import { Task } from '../entity';
import { useCurrentTaskStore } from '../store';
import { useShowSnackbar } from '../utils';

export default function RecordingView() {
  const navigate = useNavigate();

  const [snackbar, showSnackbar] = useShowSnackbar();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskId, setTaskId] = useState('');
  useEffect(() => {
    getAllTasks()
      .then((taskResponse) => {
        setTasks(taskResponse.data);
        setTaskId(taskResponse.task_id);
      })
      .catch((error) => {
        showSnackbar(`Failed to fetch tasks - ${error}`);
      });
  }, [navigate, showSnackbar]);

  const currentTask = useCurrentTaskStore((state) => state.currentTask);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  return (
    <Container sx={{ mt: 10 }}>
      <Stack spacing={5}>
        {currentTask !== null ? (
          <Recorder taskId={taskId} task={currentTask} />
        ) : (
          <Typography variant="body1">
            You haven't selected a task yet.
          </Typography>
        )}

        <Divider variant="middle" />

        <TaskList
          tasks={tasks}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
        />

        <Stack direction="row-reverse" spacing={3}>
          <Button
            onClick={() => {
              rowSelectionModel.forEach((id) => {
                if (typeof id !== 'number') {
                  throw new Error('Expected id to be number');
                }

                deleteTask(taskId, id).catch((error) => {
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
