import { Box, Modal } from '@mui/material';
import { CSSProperties } from 'react';

interface Props {
  open: boolean;
}

const style: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  backgroundColor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: '24',
  padding: 4,
};

export default function ModifyRecordingModal({ open }: Props) {
  return (
    <Modal open={open}>
      <Box sx={style}>
        <div>ModifyRecordingModal</div>
      </Box>
    </Modal>
  );
}
