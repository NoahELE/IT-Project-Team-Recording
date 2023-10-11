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

function isOverflown(element: Element): boolean {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

interface GridCellExpandProps {
  value: string;
  width: number;
}

const GridCellExpand = memo(({ width, value }: GridCellExpandProps) => {
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
});

function renderCellExpand(params: GridRenderCellParams<Task, string>) {
  return (
    <GridCellExpand
      value={params.value || ''}
      width={params.colDef.computedWidth}
    />
  );
}

interface Props {
  tasks: Task[];
  setCurrentTask: (task: Task | null) => void;
  rowSelectionModel?: GridRowSelectionModel;
  setRowSelectionModel?: (rowSelectionModel: GridRowSelectionModel) => void;
}
export default function TaskList({
  tasks,
  setCurrentTask,
  rowSelectionModel,
  setRowSelectionModel,
}: Props) {
  function AudioPlayer({ file }: { file: string }) {
    const [audioSrc, setAudioSrc] = useState('');
    useEffect(() => {
      getAudioUrl(file)
        .then((url) => setAudioSrc(url))
        .catch((err) => {
          console.error(err);
        });
    }, [file]);
    return audioSrc === '' ? (
      'Loading'
    ) : (
      <audio src={audioSrc} controls preload="metadata" />
    );
  }

  function ModifyButton({ task }: { task: Task }) {
    return (
      <>
        <Button
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentTask(task);
          }}
        >
          Record
        </Button>
      </>
    );
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'file',
      headerName: 'Audio File',
      width: 500,
      sortable: false,
      align: 'center',
      renderCell: (params: GridRenderCellParams<Task, string>) => {
        if (params.row.has_existing) {
          return (
            <Box m={1}>
              <AudioPlayer file={params.row.file} />
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
      width: 200,
      sortable: false,
      renderCell: renderCellExpand,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      sortable: false,
      align: 'center',
      renderCell: (params: GridRenderCellParams<Task, string>) => {
        return <ModifyButton task={params.row} />;
      },
    },
  ];

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
        if (setRowSelectionModel !== undefined) {
          setRowSelectionModel(newRowSelectionModel);
        }
      }}
    />
  );
}
