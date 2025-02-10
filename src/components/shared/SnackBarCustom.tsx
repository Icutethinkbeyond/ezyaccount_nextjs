import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useNotifyContext } from "@/contexts/NotifyContext";

interface SnackProps {

}

const AutohideSnackbar: React.FC<SnackProps> = ({
 
}) => {

   const { notify, setNotify } = useNotifyContext();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotify({
      ...notify,
      open: false
    });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={notify.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={notify.color}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notify.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AutohideSnackbar;
