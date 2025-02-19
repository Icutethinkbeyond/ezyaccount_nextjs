import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbar: (snackbar: { message: string, notiColor: "success" | "error" }) => void; // เพิ่ม setSnackbar
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [notiColor, setNotiColor] = useState<"success" | "error">("success");

  const handleClose = () => setOpen(false);

  const setSnackbar = ({ message, notiColor }: { message: string, notiColor: "success" | "error" }) => {
    setMessage(message);
    setNotiColor(notiColor);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ message, setMessage, open, setOpen, setSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notiColor} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbarContext must be used within a SnackbarProvider');
  }
  return context;
};
