import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { ReactElement, useCallback, useState } from 'react';

type Severity = 'error' | 'warning' | 'info' | 'success';
type ErrorCallback = (error: Error, severity?: Severity) => void;
export function useShowError(): [ReactElement, ErrorCallback] {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [severity, setSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('error');
  const onClose = () => setOpen(false);

  const snackbar = (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert
        severity={severity}
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

  const errorCallback: ErrorCallback = useCallback(
    (error: Error, severity = 'error') => {
      setError(error);
      setSeverity(severity);
      setOpen(true);
    },
    [],
  );

  return [snackbar, errorCallback];
}
