"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  FormControl,
  useTheme,
  Button,
} from "@mui/material";
import { usePricingContext } from "@/contexts/PricingContext";
import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
// import { usePricing } from "../contexts/PricingContext"

const PricingSummary: React.FC = () => {
  const theme = useTheme();
  const router = useRouter()
  const localActive = useLocale();

  const { getTotalPrice } = usePricingContext();

  const [discount, setDiscount] = useState<number>(0);
  const [includeVat, setIncludeVat] = useState<boolean>(false);
  const [withholdingTaxRate, setWithholdingTaxRate] = useState<number>(0);

  const subtotal = getTotalPrice();
  const priceAfterDiscount = subtotal - discount;
  const vat = includeVat ? priceAfterDiscount * 0.07 : 0;
  const totalWithVat = priceAfterDiscount + vat;
  const withholdingTax = (totalWithVat * withholdingTaxRate) / 100;
  const finalTotal = totalWithVat - withholdingTax;

  const handlePreviewInvoice = () => {
    router.push(`/${localActive}/protected/income/quotation/preview`)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight="bold">
        สรุปราคา
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* รวมเป็นเงิน */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography>รวมเป็นเงิน</Typography>
        <Typography fontWeight="bold">
          {subtotal.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>

      {/* ส่วนลดรวม */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography>ส่วนลดรวม</Typography>
        <TextField
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          size="small"
          sx={{ width: 120 }}
          inputProps={{ min: 0, step: 0.01 }}
        />
      </Box>

      {/* ราคาหลังหักส่วนลด */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography>ราคาหลังหักส่วนลด</Typography>
        <Typography fontWeight="bold">
          {priceAfterDiscount.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* ภาษีมูลค่าเพิ่ม 7% */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={includeVat}
              onChange={(e) => setIncludeVat(e.target.checked)}
            />
          }
          label="ภาษีมูลค่าเพิ่ม 7%"
        />
        <Typography fontWeight="bold">
          {vat.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>

      {/* จำนวนเงินรวมทั้งสิ้น */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          backgroundColor: theme.palette.primary.light,
          p: 1.5,
          borderRadius: 1,
        }}
      >
        <Typography fontWeight="bold">จำนวนเงินรวมทั้งสิ้น</Typography>
        <Typography fontWeight="bold" variant="h6" color="primary">
          {totalWithVat.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* หักภาษี ณ ที่จ่าย */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={withholdingTaxRate}
            onChange={(e) => setWithholdingTaxRate(Number(e.target.value))}
            displayEmpty
          >
            <MenuItem value={0}>คิด ณ ที่จ่าย 0%</MenuItem>
            <MenuItem value={1}>1%</MenuItem>
            <MenuItem value={2}>2%</MenuItem>
            <MenuItem value={3}>3%</MenuItem>
            <MenuItem value={5}>5%</MenuItem>
            <MenuItem value={10}>10%</MenuItem>
          </Select>
        </FormControl>
        <Typography fontWeight="bold">
          {withholdingTax.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* ยอดชำระรวม */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.palette.success.light,
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          ยอดชำระรวม
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="success.dark">
          {finalTotal.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>
      <Box sx={{ mb: 3, mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Visibility />}
          onClick={handlePreviewInvoice}
          size="large"
        >
          ดูตัวอย่างใบเสนอราคา
        </Button>
      </Box>
    </Paper>
  );
};

export default PricingSummary;
