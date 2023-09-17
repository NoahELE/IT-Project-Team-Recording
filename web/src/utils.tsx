import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { ReactElement, useCallback, useState } from 'react';

type Severity = 'error' | 'warning' | 'info' | 'success';
type ErrorCallback = (error: Error, severity?: Severity) => void;

/**
 * Custom hook that displays a snackbar with an error message.
 * @returns [snackbar, showError] snackbar is a ReactElement that should be
 * rendered in the component, showError is a callback that takes an error and
 * an optional severity level and displays the error in a snackbar
 */
export function useShowError(): [ReactElement, ErrorCallback] {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [severity, setSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('error');
  const onClose = () => setOpen(false);

  const snackbar = (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert severity={severity}>
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

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
