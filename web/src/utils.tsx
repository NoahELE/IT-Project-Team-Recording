import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { ReactElement, useCallback, useState } from 'react';

export function useShowError(): [ReactElement, (error: Error) => void] {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const onClose = () => setOpen(false);
  const snackbar = (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert
        severity="error"
        sx={{
          fontSize: '1.2em',
          padding: '20px',
        }}
      >
        {error?.message}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Alert>
    </Snackbar>
  );

  const errorCallback = useCallback((error: Error) => {
    setError(error);
    setOpen(true);
  }, []);

  return [snackbar, errorCallback];
}
