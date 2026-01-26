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
import { useMemo } from "react"

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

// Adjusted for new layout where each item takes 2 rows (name + details)
const ROWS_PER_PAGE_FIRST = 8
const ROWS_PER_PAGE_OTHER = 14

const InvoicePrint: React.FC<InvoiceProps> = ({
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
  const { categories, getSubtotal, getTotalAfterDiscount, getTaxAmount, getGrandTotal, discount, taxRate, getCategoryTotal } =
    usePricingContext()

  const subtotal = getSubtotal()
  const taxAmount = getTaxAmount()
  const grandTotal = getGrandTotal()

  // Flatten logic to handle pagination
  const pages = useMemo(() => {
    const flattenedRows: Array<{ type: "header" | "item_name" | "item_details" | "subtotal"; data?: any }> = []

    categories.forEach((category, catIndex) => {
      // Add Category Header
      flattenedRows.push({
        type: "header",
        data: { name: category.name, index: catIndex + 1, id: category.id },
      })

      // Add Items - now creates two rows per item: name row and details row
      category.subItems.forEach((item, itemIndex) => {
        // Name row
        flattenedRows.push({
          type: "item_name",
          data: { ...item, displayIndex: `${catIndex + 1}.${itemIndex + 1}` },
        })
        // Details row
        flattenedRows.push({
          type: "item_details",
          data: { ...item },
        })
      })

      // Add Category Subtotal
      flattenedRows.push({
        type: "subtotal",
        data: { total: getCategoryTotal(category.id) },
      })
    })

    const resultPages: Array<typeof flattenedRows> = []
    let currentPage: typeof flattenedRows = []
    let currentLimit = ROWS_PER_PAGE_FIRST

    flattenedRows.forEach((row, index) => {
      if (currentPage.length >= currentLimit) {
        resultPages.push(currentPage)
        currentPage = []
        currentLimit = ROWS_PER_PAGE_OTHER
      }
      currentPage.push(row)
    })

    if (currentPage.length > 0) {
      resultPages.push(currentPage)
    }

    return resultPages
  }, [categories, getCategoryTotal])

  const renderPageHeader = (pageIndex: number) => {
    if (pageIndex === 0) {
      return (
        <>
          {/* Header with blue diagonal design */}
          <Box
            sx={{
              position: "relative",
              backgroundColor: "#1565c0",
              height: "60px",
              width: "100%",
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
          <Grid container justifyContent="space-between" sx={{ mb: 4, mt: 4, position: 'relative', zIndex: 1 }}>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Bill To:
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                {billTo.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {billTo.position}{billTo.company}
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
                  className="company-logo"
                  sx={{
                    width: 50,
                    height: 50,
                    minWidth: 50,
                    minHeight: 50,
                    flexShrink: 0,
                    backgroundColor: "#1565c0",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1.5,
                  }}
                >
                  <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "24px" }}>C</Typography>
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", lineHeight: 1.2 }}>
                    {companyInfo.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
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
        </>
      )
    } else {
      // Simplified header for subsequent pages
      return (
        <Box sx={{ mb: 2, mt: 4, display: "flex", justifyContent: "space-between", borderBottom: '1px solid #eee', pb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>INVOICE (Cont.)</Typography>
            <Typography variant="body2">
              <strong>No:</strong> {invoiceNumber}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2">
              Page {pageIndex + 1}
            </Typography>
          </Box>
        </Box>
      )
    }
  }

  const renderSummarySection = () => (
    <Grid container spacing={3} sx={{ mt: 'auto', mb: 3 }}>
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
            <Typography variant="body2">฿{subtotal.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2">Discount:</Typography>
            <Typography variant="body2">฿{discount.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2">Tax ({taxRate}%):</Typography>
            <Typography variant="body2">฿{taxAmount.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
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
              ฿{grandTotal.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
  )

  const renderFooter = () => (
    <Box
      sx={{
        marginTop: "auto",
        pt: 1,
      }}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
          <Box
            className="icon-box"
            sx={{
              width: "32px",
              height: "32px",
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
            className="icon-box"
            sx={{
              width: "32px",
              height: "32px",
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
            className="icon-box"
            sx={{
              width: "32px",
              height: "32px",
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
          width: "100%",
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
  )

  return (
    <>
      {/* Global print styles */}
      <style jsx global>{`
        @media print {
          /* Hide navigation and sidebar elements */
          .MuiDrawer-root,
          .MuiAppBar-root,
          nav,
          aside,
          .no-print,
          [class*="Sidebar"],
          [class*="sidebar"],
          [class*="Drawer"],
          [class*="drawer"],
          [class*="Navigation"],
          [class*="navigation"] {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            visibility: hidden !important;
            position: absolute !important;
            left: -9999px !important;
          }
          
          /* Reset body and html for print */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            overflow: visible !important;
          }
          
          /* Make all parent containers visible */
          body *, 
          body *::before, 
          body *::after {
            visibility: visible !important;
          }
          
          /* Reset ALL parent wrappers to not interfere */
          /* Reset parent wrappers - removed MuiBox-root to prevent internal layout breakage */
          #__next,
          main, 
          [role="main"],
          .MuiContainer-root {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: none !important;
            min-height: auto !important;
            margin-left: 0 !important;
            transform: none !important;
          }
          
          /* Fix company logo size in print */
          .company-logo {
            width: 50px !important;
            height: 50px !important;
            min-width: 50px !important;
            max-width: 50px !important;
            min-height: 50px !important;
            max-height: 50px !important;
            flex-shrink: 0 !important;
            margin-right: 12px !important;
            border-radius: 50% !important;
          }

          /* Fix icon boxes size in print */
          .icon-box {
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
            max-width: 32px !important;
            min-height: 32px !important;
            max-height: 32px !important;
            flex-shrink: 0 !important;
            margin-right: 8px !important;
          }
          
          /* Print container styles */
          .print-container {
            display: block !important;
            visibility: visible !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* A4 page settings - force exact size */
          @page {
            size: 210mm 297mm;
            margin: 0;
          }
          
          /* Each print page - exact A4 dimensions */
          .print-page {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            padding: 10mm !important;
            margin: 0 !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            position: relative !important;
          }
          
          .print-page:last-child {
            page-break-after: auto !important;
          }
        }
        
        /* Screen styles - show A4 preview */
        @media screen {
          .print-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #f0f0f0;
            padding: 20px;
            min-height: 100vh;
          }
          
          .print-page {
            background: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            margin-bottom: 20px;
          }
        }
      `}</style>
      <div className="print-container">
        {pages.map((pageRows, pageIndex) => (
          <Box
            key={pageIndex}
            className="print-page"
            sx={{
              width: "210mm",
              height: "297mm",
              position: "relative",
              padding: "15mm",
              margin: "0 auto",
              marginBottom: "20px",
              backgroundColor: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {renderPageHeader(pageIndex)}

            <TableContainer component={Paper} elevation={0} sx={{ mb: 3, flexGrow: 1 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1565c0" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold", width: "80px" }}>NO.</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>PRODUCT DESCRIPTION</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center", width: "80px" }}>
                      UNIT
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center", width: "80px" }}>QTY</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "right", width: "120px" }}>
                      PRICE/UNIT
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "right", width: "120px" }}>
                      PRICE
                    </TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", width: "150px" }}>REMARK</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageRows.map((row, rowIndex) => {
                    if (row.type === "header") {
                      return (
                        <TableRow key={`header-${pageIndex}-${rowIndex}`}>
                          <TableCell
                            colSpan={7}
                            sx={{
                              backgroundColor: "#1565c0",
                              color: "white",
                              fontWeight: "bold",
                              py: 1,
                            }}
                          >
                            {row.data.index}. {row.data.name}
                          </TableCell>
                        </TableRow>
                      )
                    } else if (row.type === "item_name") {
                      const item = row.data;
                      return (
                        <TableRow key={`item-name-${pageIndex}-${rowIndex}`} sx={{ bgcolor: "#f8f9fa" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {item.displayIndex}
                          </TableCell>
                          <TableCell colSpan={5} sx={{ fontWeight: "bold" }}>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                              {item.name}
                            </Typography>
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      )
                    } else if (row.type === "item_details") {
                      const item = row.data;
                      const itemTotal = item.qty * item.pricePerUnit
                      return (
                        <TableRow key={`item-details-${pageIndex}-${rowIndex}`}>
                          <TableCell />
                          <TableCell>
                            <Typography variant="body2" color="text.secondary" sx={{ pl: 2 }}>
                              {item.description}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{item.unit}</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>{item.qty}</TableCell>
                          <TableCell sx={{ textAlign: "right" }}>฿{item.pricePerUnit.toLocaleString()}</TableCell>
                          <TableCell sx={{ textAlign: "right" }}>฿{itemTotal.toLocaleString()}</TableCell>
                          <TableCell>{item.remark}</TableCell>
                        </TableRow>
                      )
                    } else if (row.type === "subtotal") {
                      return (
                        <TableRow key={`subtotal-${pageIndex}-${rowIndex}`}>
                          <TableCell colSpan={5} />
                          <TableCell sx={{ textAlign: "right", fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                            รวม
                          </TableCell>
                          <TableCell sx={{ textAlign: "right", fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                            ฿{row.data.total.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      )
                    }
                    return null
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Render Summary only on the last page */}
            {pageIndex === pages.length - 1 && renderSummarySection()}

            {/* Add a spacer to push footer to bottom if not last page or if summary doesn't fill */}
            {/* {pageIndex !== pages.length -1 && <Box sx={{ flexGrow: 1 }} />} */}

            {pageIndex === pages.length - 1 && renderFooter()}
          </Box>
        ))}
      </div>
    </>
  )
}

export default InvoicePrint
