import { Box, Modal, SxProps, Typography } from '@mui/material';
import Recorder from './Recorder';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const modalStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  backgroundColor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: 24,
  padding: 4,
};

export default function ModifyRecordingModal({ open, setOpen }: Props) {
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={modalStyle}>
        <Typography variant="h5" fontSize="1.5rem" fontWeight="bold" mb={5}>
          ModifyRecordingModal
        </Typography>
        <Recorder />
      </Box>
    </Modal>
  );
}
