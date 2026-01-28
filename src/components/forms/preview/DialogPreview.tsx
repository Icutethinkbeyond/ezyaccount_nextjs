import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import InvoicePreview from "./InvoicePreview";
import { HeadForm } from "@/contexts/QuotationContext";

interface PreviewDialogProps {
  open: boolean;
  onClose?: () => void;
  headForm: HeadForm;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  open,
  onClose,
  headForm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>ดูตัวอย่าง {headForm?.quotationNumber}</DialogTitle>
      <DialogContent>
        <InvoicePreview headData={headForm} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          ปิดการดูตัวอย่าง
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewDialog;
