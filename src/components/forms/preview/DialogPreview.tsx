import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvoicePreview from "./InvoicePreview";
import { HeadForm, useQuotationListContext } from "@/contexts/QuotationContext";

interface PreviewDialogProps {
  open: boolean;
  onClose: () => void;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ open, onClose }) => {
  const { headForm } = useQuotationListContext();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        ดูตัวอย่าง {headForm?.quotationNumber}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
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
