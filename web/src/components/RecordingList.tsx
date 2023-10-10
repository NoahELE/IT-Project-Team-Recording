import { Box, Button, Paper, Popper, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { memo, useEffect, useRef, useState } from 'react';
import { Recording } from '../entity';
import ModifyRecordingModal from './ModifyRecordingModal';

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

function renderCellExpand(params: GridRenderCellParams<Recording, string>) {
  return (
    <GridCellExpand
      value={params.value || ''}
      width={params.colDef.computedWidth}
    />
  );
}

interface ModifyButtonProps {
  id: string;
}

function ModifyButton({ id }: ModifyButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        Modify Record {id}
      </Button>
      <ModifyRecordingModal id={id} open={open} setOpen={setOpen} />
    </>
  );
}

function renderCellButton(params: GridRenderCellParams<Recording, string>) {
  const { id } = params.row;
  return <ModifyButton id={id} />;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'audioUrl',
    headerName: 'Audio',
    width: 450,
    sortable: false,
    align: 'center',
    renderCell: (params: GridRenderCellParams<Recording, string>) => {
      if (params.value === undefined) {
        return null;
      }
      return (
        <Box m={1}>
          <audio
            src={params.value}
            controls
            preload="metadata"
            style={{ width: 400 }}
          />
        </Box>
      );
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
    renderCell: renderCellButton,
  },
];

interface Props {
  recordings: Recording[];
  rowSelectionModel?: GridRowSelectionModel;
  setRowSelectionModel?: (rowSelectionModel: GridRowSelectionModel) => void;
}

export default function RecordingList({
  recordings,
  rowSelectionModel,
  setRowSelectionModel,
}: Props) {
  return (
    <DataGrid
      rows={recordings}
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
