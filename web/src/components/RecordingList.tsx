import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { Recording } from '../entity';

interface Props {
  recordings: Recording[];
  rowSelectionModel?: GridRowSelectionModel;
  setRowSelectionModel?: (rowSelectionModel: GridRowSelectionModel) => void;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'audioUrl',
    headerName: 'Audio',
    width: 500,
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
  { field: 'text', headerName: 'Text', width: 200 },
];

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
          paginationModel: { page: 0, pageSize: 5 },
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
