import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Delete, RemoveCircle } from "@mui/icons-material";

interface ConfirmDeleteProps {
  itemName: string; // Name of the item to be deleted
  onDelete: () => void; // Callback for deletion action
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  itemName,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);

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
    onDelete();
    handleClose();
  };

  return (
    <>
      <IconButton size="small" color="error" onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete <strong>{itemName}</strong>? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDelete;