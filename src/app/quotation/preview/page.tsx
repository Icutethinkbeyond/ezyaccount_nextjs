"use client";
import { Box, Button, Container } from "@mui/material";
import InvoicePrintPage from "@/components/forms/pricing-table/InvoicePreview";
import { useEffect } from "react";
import { headerClean, useQuotationListContext } from "@/contexts/QuotationContext";
import { usePricingContext } from "@/contexts/PricingContext";

export default function InvoicePage() {
  const { setCategories, setDiscount, setVatIncluded, setWithholdingTaxRate } =
    usePricingContext();
  const { setHeadForm, setIsPreview } = useQuotationListContext();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    return () => {
      setCategories([]);
      setWithholdingTaxRate(0);
      setDiscount(0);
      setVatIncluded(false);
      // โหลดข้อมูลบริษัทและผู้ติดต่อ
      setHeadForm(headerClean);
      setIsPreview(false)
    };
  }, []);

  return (
    <Box
      sx={{
        "@media print": {
          "& .no-print": {
            display: "none",
          },
<<<<<<< Updated upstream
        }}
      >
        <InvoicePrintPage />
      </Box>
  )
=======
        },
      }}
    >
      <InvoicePrintPage />
    </Box>
  );
>>>>>>> Stashed changes
}
