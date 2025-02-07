import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { Cancel, CleanHands, CleaningServices, Clear, Delete, RemoveCircle } from "@mui/icons-material";
import { AlertOctagon, Trash2 } from "lucide-react";
import { useSnackbarContext } from "@/contexts/SnackbarContext";
// import { DocumentStatus } from "@prisma/client";

interface ConfirmDeleteProps {
  massage?: string; // Name of the item to be deleted
  onDelete: (value: string, documentStatus?: any) => void; // Callback for deletion action
  itemId: string | null;
  dialogTitle?: string;
  onDisable?: boolean;
  deleteIcon?: string | JSX.Element;
  documentStatus?: any;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  massage,
  onDelete,
  itemId,
  dialogTitle,
  onDisable = false,
  deleteIcon,
  documentStatus,
}) => {
  const [open, setOpen] = useState(false);
  const { setOpenDialog, setSnackbar, snackbar } = useSnackbarContext();

  // Open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle the deletion
  const handleDelete = () => {
    if (!itemId) {
      setOpenDialog(true);
      setSnackbar({
        ...snackbar,
        message: "พบปัญหาบางอย่างโปรดติดต่อผู้พัฒนา",
        notiColor: "error",
      });
      return;
    }
    onDelete(itemId, documentStatus);
    handleClose();
  };

  return (
    <>
      <Button
        // variant="contained"
        variant="outlined"
        // color={onDisable ? "primary.main" : "#ffcbb5"}
        // sx={{ mr: 1, bgcolor: !onDisable ? "primary.main" : "#ffcbb5" }}
        startIcon={<CleaningServices />}
        disabled={onDisable}
        onClick={() => handleClickOpen()}
      >
        ล้างฟอร์ม
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle id="alert-dialog-title" variant="h3">
          <Grid2 container>
            <Avatar sx={{ bgcolor: "primary.main", width: 30, height: 30 }}>
              <AlertOctagon size={16} />
            </Avatar>
            <Typography variant="h4" ml={1} mt={0.2}>
              {dialogTitle ? dialogTitle : "แจ้งเตือนสำคัญ"}
            </Typography>
          </Grid2>
        </DialogTitle>
        <DialogContent sx={{ minHeight: 100 }}>
          <DialogContentText id="alert-dialog-description" mb={4}>
            {massage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            ยกเลิก
          </Button>
          <Button onClick={handleDelete} variant="contained">
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDelete;
