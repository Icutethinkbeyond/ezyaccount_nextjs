import type React from "react"
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Grid,
} from "@mui/material"
import { usePricingContext } from "@/contexts/PricingContext"

interface InvoiceProps {
  invoiceNumber?: string
  invoiceDate?: string
  billTo?: {
    name: string
    position: string
    company: string
    phone: string
    email: string
  }
  companyInfo?: {
    name: string
    tagline: string
    phone: string
    email: string
    location: string
  }
  paymentMethod?: {
    accountNo: string
    accountName: string
    branchName: string
  }
  termsAndConditions?: string
}

const InvoicePrintPage: React.FC<InvoiceProps> = ({
  invoiceNumber = "#123456",
  invoiceDate = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  billTo = {
    name: "Jhone Doe",
    position: "Managing Director",
    company: "Company ltd.",
    phone: "+123-4567 8910",
    email: "example@mail.com",
  },
  companyInfo = {
    name: "COMPANY",
    tagline: "COMPANY TAGLINE HERE",
    phone: "+123 4567 8910",
    email: "example@mail.com",
    location: "Your location here",
  },
  paymentMethod = {
    accountNo: "1234 5678 910",
    accountName: "Jhone Doe",
    branchName: "XYZ",
  },
  termsAndConditions = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed dip nonumy eiusmod incididunt ut labore et dolore magna aliqua.",
}) => {
  const { categories, subtotal, discount, taxRate, totalAfterDiscount, taxAmount, grandTotal } = usePricingContext()

  // Flatten all items with their category information
  const allItems = categories.flatMap((category) =>
    category.items.map((item, index) => ({
      ...item,
      categoryName: category.name,
      itemNumber: `${category.id}.${index + 1}`,
    })),
  )

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        margin: "0 auto",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        "@media print": {
          boxShadow: "none",
          margin: 0,
          padding: "15mm",
        },
      }}
    >
      {/* Header with blue diagonal design */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#1565c0",
          height: "60px",
          mb: 3,
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            width: "150px",
            height: "100%",
            backgroundColor: "#0d47a1",
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
          },
        }}
      />

      {/* Company Info and Invoice Title */}
      <Grid container justifyContent="space-between" sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
            Bill To:
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            {billTo.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {billTo.position}, {billTo.company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: {billTo.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {billTo.email}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#1565c0",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1,
              }}
            >
              <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>C</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", lineHeight: 1 }}>
                {companyInfo.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {companyInfo.tagline}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
            INVOICE
          </Typography>
          <Typography variant="body2">
            <strong>Invoice Number:</strong> {invoiceNumber}
          </Typography>
          <Typography variant="body2">
            <strong>Invoice Date:</strong> {invoiceDate}
          </Typography>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1565c0" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", width: "80px" }}>NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>PRODUCT DESCRIPTION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>PRICE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>QTY.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "right", width: "120px" }}>
                TOTAL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.itemNumber}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {item.description}
                  </Typography>
                  {item.unit && (
                    <Typography variant="caption" color="text.secondary">
                      หน่วย: {item.unit}
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>฿{item.pricePerUnit.toFixed(2)}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
                <TableCell sx={{ textAlign: "right" }}>฿{item.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={7}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Thank You For Your Business
          </Typography>

          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
            Payment Method:
          </Typography>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <Typography variant="body2" sx={{ width: "120px" }}>
              Account No:
            </Typography>
            <Typography variant="body2">{paymentMethod.accountNo}</Typography>
          </Box>
          <Box sx={{ display: "flex", mb: 0.5 }}>
            <Typography variant="body2" sx={{ width: "120px" }}>
              Account Name:
            </Typography>
            <Typography variant="body2">{paymentMethod.accountName}</Typography>
          </Box>
          <Box sx={{ display: "flex", mb: 2 }}>
            <Typography variant="body2" sx={{ width: "120px" }}>
              Branch Name:
            </Typography>
            <Typography variant="body2">{paymentMethod.branchName}</Typography>
          </Box>

          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
            Terms & Conditions:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {termsAndConditions}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">Subtotal:</Typography>
              <Typography variant="body2">฿{subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">Discount:</Typography>
              <Typography variant="body2">฿{discount.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2">Tax ({taxRate}%):</Typography>
              <Typography variant="body2">฿{taxAmount.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#1565c0",
                p: 2,
                borderRadius: 1,
              }}
            >
              <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                Total:
              </Typography>
              <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                ฿{grandTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Box
              sx={{
                borderBottom: "1px solid black",
                width: "200px",
                ml: "auto",
                mb: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "cursive",
                  mb: 1,
                  fontStyle: "italic",
                }}
              >
                Signature
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Authorised sign
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box
        sx={{
          position: "relative",
          mt: "auto",
          pt: 3,
        }}
      >
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#1565c0",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1,
              }}
            >
              <Typography sx={{ color: "white", fontSize: "14px" }}>📞</Typography>
            </Box>
            <Typography variant="body2">{companyInfo.phone}</Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#1565c0",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1,
              }}
            >
              <Typography sx={{ color: "white", fontSize: "14px" }}>✉️</Typography>
            </Box>
            <Typography variant="body2">{companyInfo.email}</Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#1565c0",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1,
              }}
            >
              <Typography sx={{ color: "white", fontSize: "14px" }}>📍</Typography>
            </Box>
            <Typography variant="body2">{companyInfo.location}</Typography>
          </Grid>
        </Grid>

        {/* Blue footer with diagonal design */}
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#1565c0",
            height: "40px",
            mt: 2,
            "&::after": {
              content: '""',
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "150px",
              height: "100%",
              backgroundColor: "#0d47a1",
              clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)",
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default InvoicePrintPage
