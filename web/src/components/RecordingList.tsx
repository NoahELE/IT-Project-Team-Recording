import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Recording } from '../entity';

interface Props {
  recordings: Recording[];
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
          <audio src={params.value} controls />
        </Box>
      );
    },
  },
];

export default function RecordingList({ recordings }: Props) {
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
    />
  );
}
