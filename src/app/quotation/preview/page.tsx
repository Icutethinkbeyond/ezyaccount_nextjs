"use client"
import { Box, Button, Container } from "@mui/material"
import PrintIcon from "@mui/icons-material/Print"
import InvoicePrintPage from "@/components/forms/pricing-table/InvoicePreview"

export default function InvoicePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
      <Box
        sx={{
          "@media print": {
            "& .no-print": {
              display: "none",
            },
          },
        }}
      >
        {/* <Container maxWidth="md" className="no-print" sx={{ py: 3 }}>
          <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint} sx={{ mb: 2 }}>
            พิมพ์ใบแจ้งหนี้
          </Button>
        </Container> */}
        <InvoicePrintPage />
      </Box>
  )
}
