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

// Context สำหรับคำนวณราคา (หมวดสินค้า, VAT, ส่วนลด ฯลฯ)
import { usePricingContext } from "@/contexts/PricingContext";

// Context สำหรับข้อมูลหัวเอกสารใบเสนอราคา (บริษัท / ผู้ติดต่อ)
import { useQuotationListContext } from "@/contexts/QuotationContext";


import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface PricingSummaryProps {
  isEdit?: boolean;
  quotationId?: string;
}

const PricingSummary: React.FC<PricingSummaryProps> = ({ isEdit = false, quotationId }) => {
  const theme = useTheme();
  const router = useRouter();
  const localActive = useLocale();

  // ดึงข้อมูลและฟังก์ชันที่เกี่ยวกับการคำนวณราคาจาก PricingContext
  const {
    getTotalPrice,   // รวมราคาสินค้าทั้งหมด
    discount,        // ส่วนลดรวม
    setDiscount,     // setter ส่วนลด
    vatIncluded,     // คิด VAT หรือไม่
    setVatIncluded,  // setter VAT
    taxRate,         // อัตราภาษี (%)
    withholdingTaxRate,
    setWithholdingTaxRate,
    getWithholdingTaxAmount,
  } = usePricingContext();

  // ข้อมูลหัวเอกสาร (บริษัท / ผู้ติดต่อ)
  const { headForm, setHeadForm } = useQuotationListContext();

  // หมวดสินค้าและรายการย่อย (ใช้สำหรับบันทึกลง DB)
  const { categories } = usePricingContext();



  /**
   * ======================
   * ส่วนคำนวณราคา
   * ======================
   */
  const subtotal = getTotalPrice();                    // ราคารวมก่อนหักส่วนลด
  const priceAfterDiscount = subtotal - discount;     // ราคาหลังหักส่วนลด
  const vat = vatIncluded
    ? priceAfterDiscount * (taxRate / 100)            // คำนวณ VAT
    : 0;

  const totalWithVat = priceAfterDiscount + vat;       // รวม VAT
  const withholdingTax = getWithholdingTaxAmount(); // ภาษี ณ ที่จ่าย
  const finalTotal = totalWithVat - withholdingTax;    // ยอดสุทธิที่ต้องชำระ

  /**
   * เปิดหน้า Preview ใบเสนอราคา
   */
  const handlePreviewInvoice = () => {
    router.push(`/${localActive}/protected/income/quotation/preview`);
  };

  /**
   * บันทึกใบเสนอราคา
   */
  const handleSaveQuotation = async () => {
    try {
      // ตรวจสอบข้อมูลที่จำเป็นต้องมี
      if (!headForm.companyName || !headForm.contactorName) {
        alert("กรุณากรอกข้อมูลบริษัทและผู้ติดต่อให้ครบถ้วน");
        return;
      }

      /**
       * เตรียมข้อมูลสำหรับส่งไป Backend
       * (แยก field ชัดเจน ป้องกัน type mismatch)
       */
      const quotationData = {
        // ข้อมูลบริษัท
        companyName: headForm.companyName,
        companyTel: headForm.companyTel,
        taxId: headForm.taxId,
        branch: headForm.branch,
        dateCreate: headForm.dateCreate,
        companyAddress: headForm.companyAddress,

        // ข้อมูลผู้ติดต่อ
        contactorName: headForm.contactorName,
        contactorTel: headForm.contactorTel,
        contactorEmail: headForm.contactorEmail,
        contactorAddress: headForm.contactorAddress,
        note: headForm.note, // บันทึกหมายเหตุลง DB

        // ข้อมูลการเงิน
        includeVat: vatIncluded,
        taxRate: 7,                  // อัตรา VAT (ปัจจุบันใช้ 7%)
        globalDiscount: discount,    // ส่วนลดรวม
        withholdingTax: withholdingTax, // ภาษีหัก ณ ที่จ่าย
        withholdingTaxRate: withholdingTaxRate, // อัตราภาษีหัก ณ ที่จ่าย

        // รายการสินค้า / บริการ
        categories: categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          subItems: cat.subItems.map((item) => ({
            id: item.id,
            description: item.description,
            unit: item.unit,
            qty: item.qty,
            pricePerUnit: item.pricePerUnit,
            remark: item.remark,
          })),
        })),
      };

      // เรียก Action เพื่อบันทึกหรืออัพเดทข้อมูล
      const url = isEdit && quotationId
        ? `/api/income/quotation/${quotationId}`
        : '/api/income/quotation/new';

      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quotationData),
      });
      const result = await res.json();

      if (result.success) {
        alert(isEdit ? "อัพเดทใบเสนอราคาสำเร็จ!" : "บันทึกใบเสนอราคาสำเร็จ!");
        router.push(`/${localActive}/protected/income/quotation`);
      } else {
        alert("เกิดข้อผิดพลาด: " + result.error);
      }
    } catch (e) {
      console.error(e);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      {/* หัวข้อสรุปราคา */}
      <Typography variant="h6" gutterBottom fontWeight="bold">
        สรุปราคา
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* รวมเป็นเงิน */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>รวมเป็นเงิน</Typography>
        <Typography fontWeight="bold">
          {subtotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
        </Typography>
      </Box>

      {/* ส่วนลด */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>ส่วนลดรวม</Typography>
        <TextField
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          size="small"
          sx={{ width: 120 }}
        />
      </Box>

      {/* ราคาหลังหักส่วนลด */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>ราคาหลังหักส่วนลด</Typography>
        <Typography fontWeight="bold">
          {priceAfterDiscount.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* VAT */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={vatIncluded}
              onChange={(e) => setVatIncluded(e.target.checked)}
            />
          }
          label="ภาษีมูลค่าเพิ่ม 7%"
        />
        <Typography fontWeight="bold">
          {vat.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
        </Typography>
      </Box>

      {/* ยอดรวม VAT */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
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

      {/* ภาษีหัก ณ ที่จ่าย */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={withholdingTaxRate}
            onChange={(e) => setWithholdingTaxRate(Number(e.target.value))}
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
          {withholdingTax.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* หมายเหตุ */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          หมายเหตุ (Notes)
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="ระบุหมายเหตุที่ต้องการให้แสดงในใบเสนอราคา..."
          value={headForm.note || ""}
          onChange={(e) => setHeadForm({ ...headForm, note: e.target.value })}
          variant="outlined"
          size="small"
          sx={{ bgcolor: "white" }}
        />
      </Box>

      {/* ยอดสุทธิ */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: theme.palette.success.light,
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          ยอดชำระรวม
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="success.dark">
          {finalTotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
        </Typography>
      </Box>

      {/* ปุ่มควบคุม */}
      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Visibility />}
          onClick={handlePreviewInvoice}
          fullWidth
        >
          ดูตัวอย่างใบเสนอราคา
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleSaveQuotation}
          fullWidth
          sx={{ color: "white" }}
        >
          บันทึกใบเสนอราคา
        </Button>
      </Box>
    </Paper >
  );
};

export default PricingSummary;
