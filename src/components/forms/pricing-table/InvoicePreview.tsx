import type React from "react";
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
  Grid2,
} from "@mui/material";
import { usePricingContext } from "@/contexts/PricingContext";
import { HeadForm, useQuotationListContext } from "@/contexts/QuotationContext";
import { useEffect, useMemo } from "react";
import { formatThaiDate } from "@/utils/utils";

interface InvoiceProps {
}

// Adjusted for new layout where each item takes 2 rows (name + details)
const ROWS_PER_PAGE_FIRST = 8;
const ROWS_PER_PAGE_OTHER = 14;

const InvoicePreview: React.FC<InvoiceProps> = ({
}) => {
  const {
    categories,
    getSubtotal,
    getTaxAmount,
    getGrandTotal,
    discount,
    getCategoryTotal,
    withholdingTaxRate,
    vatIncluded,
    getWithholdingTaxAmount
  } = usePricingContext();
  const { headForm, isPreview } = useQuotationListContext();

  useEffect(() => {
console.log(headForm, categories)
  }, [])

  // Get note from QuotationContext if not passed as prop
  // const { headForm } = useQuotationListContext();
  const displayNote = headForm?.note;

  const subtotal = getSubtotal();
  const taxAmount = getTaxAmount();
  const grandTotal = getGrandTotal();

  // Flatten logic to handle pagination
  const pages = useMemo(() => {
    const flattenedRows: Array<{
      type: "header" | "item_name" | "item_details" | "subtotal";
      data?: any;
    }> = [];

    categories.forEach((category, catIndex) => {
      // Add Category Header
      flattenedRows.push({
        type: "header",
        data: { name: category.name, index: catIndex + 1, id: category.id },
      });

      // Add Items - now creates two rows per item: name row and details row
      category.subItems.forEach((item, itemIndex) => {
        // Name row
        flattenedRows.push({
          type: "item_name",
          data: { ...item, displayIndex: `${catIndex + 1}.${itemIndex + 1}` },
        });
        // Details row
        flattenedRows.push({
          type: "item_details",
          data: { ...item },
        });
      });

      // Add Category Subtotal
      flattenedRows.push({
        type: "subtotal",
        data: { total: getCategoryTotal(category.id) },
      });
    });

    const resultPages: Array<typeof flattenedRows> = [];
    let currentPage: typeof flattenedRows = [];
    let currentLimit = ROWS_PER_PAGE_FIRST;

    flattenedRows.forEach((row, index) => {
      if (currentPage.length >= currentLimit) {
        resultPages.push(currentPage);
        currentPage = [];
        currentLimit = ROWS_PER_PAGE_OTHER;
      }
      currentPage.push(row);
    });

    if (currentPage.length > 0) {
      resultPages.push(currentPage);
    }

    return resultPages;
  }, [categories, getCategoryTotal, headForm]);
  

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
          <Grid
            container
            justifyContent="space-between"
            sx={{ mb: 4, mt: 4, position: "relative", zIndex: 1 }}
          >
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ fontSize: 20, mb: 2 }}>
                ลูกค้า: คุณ{headForm.contactorName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                เบอร์โทรศัพท์: {headForm.companyTel}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                อีเมล: {headForm.contactorEmail}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                ที่อยู่ {headForm.contactorAddress}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", mb: 2, fontSize: 25 }}
              >
                ใบเสนอราคา
              </Typography>
              <Typography variant="body2">
                <strong>เลขที่:</strong> {headForm.quotationNumber}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>ออกเมื่อวันที่:</strong>{" "}
                {formatThaiDate(headForm.dateCreate)}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  mt: 3,
                  fontSize: 16,
                }}
              >
                {headForm.companyName} สาขา {headForm.branch}
              </Typography>
              <Typography
                variant="h6"
                sx={{ lineHeight: 1.2, mt: 1, fontSize: 12 }}
              >
                {headForm.taxId &&
                  `เลขประจำตัวผู้เสียภาษี ${headForm.taxId}`}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ lineHeight: 1, mr: 1, fontSize: 12 }}
              >
                {headForm.companyAddress}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ lineHeight: 1, fontSize: 12 }}
              >
                {headForm.contactorTel}
              </Typography>
            </Grid>
          </Grid>
        </>
      );
    } else {
      // Simplified header for subsequent pages
      return (
        <Box
          sx={{
            mb: 2,
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #eee",
            pb: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ใบเสนอราคา
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              <strong>เลขที่:</strong> {headForm.quotationNumber}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" sx={{ fontSize: 10 }}>
              หน้าที่ {pageIndex + 1}
            </Typography>
          </Box>
        </Box>
      );
    }
  };

  const renderSummarySection = () => (
    <Grid2 container spacing={3} sx={{ mt: "auto", mb: 3 }}>
      <Grid2 size={{ xs: 5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
          หมายเหตุ:
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          {displayNote || "-"}
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 7 }}>
        <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2">ยอดรวมย่อย:</Typography>
            <Typography variant="body2">
              {subtotal.toLocaleString("th-TH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              บาท
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2">ส่วนลด:</Typography>
            <Typography variant="body2">
              {discount.toLocaleString("th-TH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              บาท
            </Typography>
          </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="body2">{!vatIncluded && 'ไม่มี'}ภาษีมูลค่าเพิ่ม {vatIncluded && '(7%)'}:</Typography>
              <Typography variant="body2">
                {taxAmount.toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                บาท
              </Typography>
            </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2">หัก ฯ ที่จ่าย {withholdingTaxRate && `(${withholdingTaxRate}%)`}:</Typography>
            <Typography variant="body2">
              {getWithholdingTaxAmount().toLocaleString("th-TH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              บาท
            </Typography>
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
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              รวมทั้งสิ้น:
            </Typography>
            <Typography
              sx={{ color: "white", fontSize: 18, letterSpacing: 0.5 }}
            >
              {getGrandTotal().toLocaleString("th-TH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              บาท
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Box
            sx={{
              borderBottom: "1px solid black",
              width: "200px",
              ml: "auto",
              mb: 5,
              mt: 5,
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
              {/* Signature */}
            </Typography>
          </Box>

          <Typography variant="body2">ลงลายมือชื่อ</Typography>
        </Box>
      </Grid2>
    </Grid2>
  );

  const renderFooter = () => (
    <Box
      sx={{
        marginTop: "auto",
        pt: 1,
      }}
    >
      {/* <Grid container spacing={2} sx={{ mb: 2 }}>
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
      </Grid> */}

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
  );

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
          html,
          body {
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
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
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

            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ mb: 3, flexGrow: 1 }}
            >
              <Table sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1565c0" }}>
                    <TableCell
                      sx={{ color: "white", fontSize: 12, width: "30px" }}
                    >
                      NO.
                    </TableCell>
                    <TableCell
                      sx={{ color: "white", width: "500px", fontSize: 12 }}
                    >
                      สินค้า
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: 12,
                        textAlign: "center",
                        width: "80px",
                      }}
                    >
                      จำนวน
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: 12,
                        textAlign: "center",
                        width: "80px",
                      }}
                    >
                      หน่วย
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: 12,
                        textAlign: "right",
                        width: "200px",
                      }}
                    >
                      ราคา/หน่วย
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: 12,
                        textAlign: "right",
                        width: "150px",
                      }}
                    >
                      ราคา
                    </TableCell>
                    {/* <TableCell
                      sx={{
                        color: "white",
                        width: "150px",
                        fontSize: 12,
                      }}
                    >
                      หมายเหตุ
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageRows.map((row, rowIndex) => {
                    if (row.type === "header") {
                      return (
                        <TableRow key={`header-${pageIndex}-${rowIndex}`}>
                          <TableCell
                            colSpan={6}
                            sx={{
                              backgroundColor: "#1565c0",
                              color: "white",
                              // fontWeight: "bold",
                              py: 1,
                              fontSize: 14,
                            }}
                          >
                            {row.data.index}. {row.data.name}
                          </TableCell>
                        </TableRow>
                      );
                    } else if (row.type === "item_name") {
                      const item = row.data;
                      const itemTotal = item.qty * item.pricePerUnit;
                      return (
                        <TableRow
                          key={`item-name-${pageIndex}-${rowIndex}`}
                          sx={{ bgcolor: "#d6e9ff" }}
                        >
                          <TableCell sx={{ fontSize: 12 }}>
                            {item.displayIndex}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontSize: 12 }}>
                              {item.name}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center", fontSize: 12 }}>
                            {item.qty}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center", fontSize: 12 }}>
                            {item.unit}
                          </TableCell>
                          <TableCell sx={{ textAlign: "right", fontSize: 12 }}>
                            {item.pricePerUnit.toLocaleString()}
                          </TableCell>
                          <TableCell sx={{ textAlign: "right", fontSize: 12 }}>
                            {itemTotal.toLocaleString()}
                          </TableCell>
                          {/* <TableCell>{item.remark}</TableCell> */}
                        </TableRow>
                      );
                    } else if (row.type === "item_details") {
                      const item = row.data;
                      // const itemTotal = item.qty * item.pricePerUnit;
                      return (
                        <TableRow key={`item-details-${pageIndex}-${rowIndex}`}>
                          <TableCell />
                          <TableCell colSpan={3}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ fontSize: 12 }}
                            >
                              <strong>รายละเอียด:</strong>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ fontSize: 12 }}
                            >
                              {item.description}
                            </Typography>
                          </TableCell>
                          <TableCell colSpan={2}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ fontSize: 12 }}
                            >
                              <strong>หมายเหตุ:</strong>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ fontSize: 12 }}
                            >
                              {item.remark}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    } else if (row.type === "subtotal") {
                      return (
                        <TableRow key={`subtotal-${pageIndex}-${rowIndex}`}>
                          {/* <TableCell colSpan={5} /> */}
                          <TableCell
                            colSpan={5}
                            sx={{
                              textAlign: "right",
                              fontWeight: "bold",
                              backgroundColor: "#f5f5f5",
                            }}
                          >
                            รวมทั้งสิ้น
                          </TableCell>
                          <TableCell
                            colSpan={2}
                            sx={{
                              textAlign: "right",
                              fontWeight: "bold",
                              backgroundColor: "#f5f5f5",
                              fontSize: 16,
                            }}
                          >
                            {row.data.total.toLocaleString()} บาท
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return null;
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
  );
};

export default InvoicePreview;
