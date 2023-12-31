import { Box, Button, Paper, Popper, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { memo, useEffect, useRef, useState } from 'react';
import { getAudioUrl } from '../api';
import { Task } from '../entity';
import { useCurrentTaskStore } from '../store';
import { getTaskUniqueId, useShowSnackbar } from '../utils';

function isOverflown(element: Element): boolean {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = memo(
  ({ width, value }: { value: string; width: number }) => {
    const wrapper = useRef<HTMLDivElement>(null);
    const cellDiv = useRef<HTMLElement>(null);
    const cellValue = useRef<HTMLElement>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [showFullCell, setShowFullCell] = useState(false);
    const [showPopper, setShowPopper] = useState(false);

    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current!);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };

    const handleMouseLeave = () => {
      setShowFullCell(false);
    };

    useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }

      function handleKeyDown(nativeEvent: KeyboardEvent) {
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);

    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: 'center',
          lineHeight: '1.5rem',
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: '100%',
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {value}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
  },
);

const AudioPlayer = memo(
  ({ taskId, blockId }: { taskId: string; blockId: number }) => {
    const [audioSrc, setAudioSrc] = useState('');
    const [snackbar, showSnackbar] = useShowSnackbar();
    useEffect(() => {
      getAudioUrl(taskId, blockId)
        .then((url) => setAudioSrc(url))
        .catch((err) => {
          showSnackbar(`Failed to fetch audio - ${err}`);
        });
    }, [blockId, showSnackbar, taskId]);
    return audioSrc === '' ? (
      'Loading'
    ) : (
      <>
        <audio src={audioSrc} controls preload="metadata" />
        {snackbar}
      </>
    );
  },
);

const SelectButton = memo(({ task }: { task: Task }) => {
  const setCurrentTask = useCurrentTaskStore((state) => state.setCurrentTask);
  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentTask(task);
        }}
      >
        Select
      </Button>
    </>
  );
});

const columns: GridColDef[] = [
  { field: 'task_id', headerName: 'Task ID', width: 100 },
  { field: 'block_id', headerName: 'Block ID', width: 100 },
  {
    field: 'file',
    headerName: 'Audio File',
    width: 400,
    sortable: false,
    align: 'center',
    renderCell: (params: GridRenderCellParams<Task, string>) => {
      if (params.row.has_existing) {
        return (
          <Box m={1}>
            <AudioPlayer
              taskId={params.row.task_id}
              blockId={params.row.block_id}
            />
          </Box>
        );
      } else {
        return <Typography variant="body2">No audio file</Typography>;
      }
    },
  },
  {
    field: 'text',
    headerName: 'Text',
    width: 300,
    sortable: false,
    renderCell: (params: GridRenderCellParams<Task, string>) => {
      return (
        <GridCellExpand
          value={params.value || ''}
          width={params.colDef.computedWidth}
        />
      );
    },
  },
  {
    field: 'select',
    headerName: 'Select',
    width: 200,
    sortable: false,
    align: 'center',
    renderCell: (params: GridRenderCellParams<Task, string>) => {
      return <SelectButton task={params.row} />;
    },
  },
];

interface Props {
  tasks: Task[];
  rowSelectionModel: GridRowSelectionModel;
  setRowSelectionModel: (rowSelectionModel: GridRowSelectionModel) => void;
}

export default function TaskList({
  tasks,
  rowSelectionModel,
  setRowSelectionModel,
}: Props) {
  return (
    <DataGrid
      rows={tasks}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 20, 50]}
      checkboxSelection
      getRowHeight={() => 'auto'}
      rowSelectionModel={rowSelectionModel}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
      getRowId={(task: Task) => getTaskUniqueId(task)}
    />
  );
}
