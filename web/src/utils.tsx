import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { ReactElement, useCallback, useMemo, useState } from 'react';

type Severity = 'error' | 'warning' | 'info' | 'success';
type ShowSnackbarCallback = (message: string, severity?: Severity) => void;

/**
 * Custom hook that displays a snackbar with an error message.
 * @returns [snackbar, showSnackbar] snackbar is a ReactElement that should be
 * rendered in the component, showSnackbar is a callback that takes an error and
 * an optional severity level and displays the error in a snackbar
 */
export function useShowSnackbar(): [ReactElement, ShowSnackbarCallback] {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<Severity>('error');
  const onClose = () => setOpen(false);

  const snackbar = useMemo(
    () => (
      <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
        <Alert severity={severity}>
          {message}
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
    ),
    [message, open, severity],
  );

  const showSnackbar = useCallback<ShowSnackbarCallback>(
    (message, severity = 'error') => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    },
    [],
  );

  return [snackbar, showSnackbar];
}

/**
 * check if the user is logged in by checking if the token is in local storage
 * @returns true if the user is logged in, false otherwise
 */
export function isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  if (token === null || token === '') {
    return false;
  }
  return true;
}
