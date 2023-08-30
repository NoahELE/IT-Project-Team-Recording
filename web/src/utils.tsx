import { Snackbar } from '@mui/material';
import { ReactElement, useCallback, useState } from 'react';

export function useShowError(): [ReactElement, (error: Error) => void] {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const snackbar = (
    <Snackbar
      open={open}
      message={error?.message}
      autoHideDuration={5000}
      onClose={() => {
        setOpen(false);
      }}
    />
  );

  const errorCallback = useCallback((error: Error) => {
    setError(error);
    setOpen(true);
  }, []);

  return [snackbar, errorCallback];
}
