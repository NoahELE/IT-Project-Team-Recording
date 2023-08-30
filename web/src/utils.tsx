import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';
import { ReactElement, useCallback, useState } from 'react';

export function useShowError(): [ReactElement, (error: Error) => void] {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const onClose = () => setOpen(false);
  const snackbar = (
    <Snackbar
      open={open}
      message={error?.message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      autoHideDuration={5000}
      onClose={onClose}
    />
  );

  const errorCallback = useCallback((error: Error) => {
    setError(error);
    setOpen(true);
  }, []);

  return [snackbar, errorCallback];
}
