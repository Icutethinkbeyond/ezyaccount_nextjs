// contexts/SnackbarContext.tsx

"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from "react";

export interface AutohideSnackbarState {
  message?: string | null
  notiColor: string
}

export const initialSnackbar: AutohideSnackbarState = { 
  message: "",
  notiColor: "error",
}

// กำหนดประเภทของ Context
interface SnackbarContextProps {
  snackbar: AutohideSnackbarState;
  setSnackbar: Dispatch<React.SetStateAction<AutohideSnackbarState>>;
  openDialog: boolean;
  setOpenDialog: Dispatch<React.SetStateAction<boolean>>;
}

// สร้าง Context
const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<AutohideSnackbarState>(initialSnackbar);

  return (
    <SnackbarContext.Provider
      value={{
        openDialog,
        setOpenDialog,
        snackbar,
        setSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbarContext must be used within a SnackbarProvider");
  }
  return context;
};
