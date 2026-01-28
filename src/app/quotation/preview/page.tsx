"use client";
import { Box, Button, Container } from "@mui/material";
import InvoicePrintPage from "@/components/forms/preview/InvoicePreview";
import { useEffect } from "react";
import { headerClean, useQuotationListContext } from "@/contexts/QuotationContext";
import { usePricingContext } from "@/contexts/PricingContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function InvoicePage() {
  const { setCategories, setDiscount, setVatIncluded, setWithholdingTaxRate } =
    usePricingContext();
  const { setHeadForm, setIsPreview } = useQuotationListContext();
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    router.back();
  };

  // useEffect(() => {
  //   return () => {
  //     setCategories([]);
  //     setWithholdingTaxRate(0);
  //     setDiscount(0);
  //     setVatIncluded(false);
  //     // โหลดข้อมูลบริษัทและผู้ติดต่อ
  //     setHeadForm(headerClean);
  //   };
  // }, []);

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
      <Container
        maxWidth="md"
        className="no-print"
        sx={{ py: 3, display: "flex", justifyContent: "flex-start", gap: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ textTransform: "none" }}
        >
          กลับ
        </Button>
      </Container>
      <InvoicePrintPage />
    </Box>
  );
}
