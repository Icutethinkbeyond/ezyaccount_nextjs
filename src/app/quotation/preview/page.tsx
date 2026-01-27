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
        <InvoicePrintPage />
      </Box>
  )
}
