import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import InvoicePreview from "./InvoicePreview";
import { HeadForm, useQuotationListContext } from "@/contexts/QuotationContext";

interface PreviewDialogProps {
  open: boolean;
  onClose?: () => void;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ open, onClose }) => {
  const { headForm } = useQuotationListContext();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>ดูตัวอย่าง {headForm?.quotationNumber}</DialogTitle>
      <DialogContent>
        <InvoicePreview />
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
