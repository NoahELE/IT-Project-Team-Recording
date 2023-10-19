import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, getAllTasks } from '../api';
import Recorder from '../components/Recorder';
import TaskList from '../components/TaskList';
import { Task } from '../entity';
import { useCurrentTaskStore } from '../store';
import { getTaskUniqueId, useShowSnackbar } from '../utils';

export default function RecordingView() {
  const navigate = useNavigate();

  const [snackbar, showSnackbar] = useShowSnackbar();

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    getAllTasks()
      .then((tasks) => {
        setTasks(tasks);
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
          <Recorder task={currentTask} />
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
                if (typeof id !== 'string') {
                  throw new Error('Expected id to be string');
                }
                const task = tasks.find((task) => getTaskUniqueId(task) === id);
                if (task === undefined) {
                  throw new Error(`Expected task with id ${id} to exist`);
                }

                deleteTask(task.task_id, task.block_id).catch((error) => {
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
