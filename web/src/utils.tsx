import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { ReactElement, useCallback, useState } from 'react';
import { existingUser, UserLoginResponse } from './entity.ts';
import axios from 'axios';

export function useShowError(): [
  ReactElement,
  (error: Error, severity?: 'error' | 'warning' | 'info' | 'success') => void,
] {
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

  const errorCallback = useCallback(
    (
      error: Error,
      severity: 'error' | 'warning' | 'info' | 'success' = 'error',
    ) => {
      setError(error);
      setSeverity(severity);
      setOpen(true);
    },
    [],
  );

  return [snackbar, errorCallback];
}

export const signInPOST = async (
  data: existingUser,
): Promise<UserLoginResponse> => {
  const response = await axios.post<UserLoginResponse>(
    'https://reqres.in/api/login', // Simulate URL userName: eve.holt@reqres.in password: cityslicka
    data,
  );
  return response.data;
};
