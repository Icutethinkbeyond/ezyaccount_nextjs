"use client";
import React from "react";
import { Grid, Box, IconButton, Grid2, Typography } from "@mui/material";
import { Print, GetApp, Message } from "@mui/icons-material";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import PageContainer from "@/components/container/PageContainer";

// components
import Breadcrumb from "@/components/shared/BreadcrumbCustom";
import DashboardCard from "@/components/shared/DashboardCard";
import CompanyInformation from "@/components/forms/CompanyInformations";
import ContactotInformation from "@/components/forms/ContactorInformations";
import NewItems from "@/components/forms/NewItems";
import ItemsTable from "@/components/forms/ItemsTable";
import DocumentFooter from "@/components/forms/DocumentFooter";
import CalculateItems from "@/components/forms/CalculateItems";

const NewQuotation = () => {
  const handlePrint = () => {
    console.log("Print clicked");
  };

  const handleMessage = () => {
    console.log("Message clicked");
  };

  const handleDownload = async () => {
    // สร้าง ExcelJS workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Quotation");

    // ตั้งค่าคอลัมน์
    worksheet.columns = [
      { header: "สินค้า / บริการ", key: "product", width: 30 },
      { header: "จำนวน", key: "qty", width: 10 },
      { header: "ส่วนลด", key: "discount", width: 10 },
      { header: "ราคา", key: "price", width: 15 },
      { header: "ราคารวม", key: "total", width: 15 },
    ];

    // เพิ่มหัวเรื่องและกำหนดพื้นหลัง
    worksheet.mergeCells("A1:E1");
    worksheet.getCell("A1").value = "ใบเสนอราคา";
    worksheet.getCell("A1").font = { size: 18, bold: true };
    worksheet.getCell("A1").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("A1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFDDDDDD" }, // สีพื้นหลังอ่อน
    };

    worksheet.mergeCells("A2:E2");
    worksheet.getCell("A2").value = `วันที่ออก: 01/01/2024  ใช้ได้ถึง: 31/12/2024`;
    worksheet.getCell("A2").alignment = { horizontal: "right" };

    // เพิ่มข้อมูลบริษัท
    worksheet.getCell("A4").value = "[Company Name]";
    worksheet.getCell("A5").value = "[Street Address]";
    worksheet.getCell("A6").value = "[City, ST ZIP]";
    worksheet.getCell("A7").value = "Phone: (000) 000-0000";
    worksheet.getCell("A8").value = "Fax: (000) 000-0000";
    worksheet.getCell("A9").value = "Email: [Email Address]";

    // เพิ่มข้อมูลลูกค้า
    worksheet.getCell("A11").value = "ลูกค้า:";
    worksheet.getCell("B11").value = "[Customer Name]";
    worksheet.getCell("A12").value = "[Customer Address]";
    worksheet.getCell("A13").value = "[Customer Email / Phone]";

    // เพิ่มข้อมูลสินค้า
    const products = [
      { product: "Service Fee", qty: 1, price: 200.00, total: 200.00 },
      { product: "Labor: 5 hours at $75/hr", qty: 5, price: 75.00, total: 375.00 },
    ];

    let currentRow = 16;
    products.forEach((product) => {
      worksheet.addRow([product.product, product.qty, 0, product.price, product.total]);
      currentRow++;
    });

    // กำหนดพื้นหลังให้กับแถวรวม
    worksheet.getCell(`D${currentRow + 1}`).value = "รวมเป็นเงิน";
    worksheet.getCell(`E${currentRow + 1}`).value = 575.00;
    worksheet.getCell(`D${currentRow + 1}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
    };

    worksheet.getCell(`D${currentRow + 2}`).value = "ส่วนลดรวม";
    worksheet.getCell(`E${currentRow + 2}`).value = "-";
    worksheet.getCell(`D${currentRow + 2}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
    };

    worksheet.getCell(`D${currentRow + 3}`).value = "ราคาหลังหักส่วนลด";
    worksheet.getCell(`E${currentRow + 3}`).value = 575.00;
    worksheet.getCell(`D${currentRow + 3}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
    };

    worksheet.getCell(`D${currentRow + 4}`).value = "ภาษีมูลค่าเพิ่ม 7%";
    worksheet.getCell(`E${currentRow + 4}`).value = 40.25;
    worksheet.getCell(`D${currentRow + 4}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
    };

    worksheet.getCell(`D${currentRow + 5}`).value = "จำนวนเงินรวมทั้งสิ้น";
    worksheet.getCell(`E${currentRow + 5}`).value = 615.25;
    worksheet.getCell(`D${currentRow + 5}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
    };

    worksheet.getCell(`D${currentRow + 6}`).value = "หัก ณ ที่จ่าย 13%";
    worksheet.getCell(`E${currentRow + 6}`).value = 79.98;
    worksheet.getCell(`D${currentRow + 6}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
    };

    worksheet.getCell(`D${currentRow + 7}`).value = "ยอดชำระรวม";
    worksheet.getCell(`E${currentRow + 7}`).value = 535.27;
    worksheet.getCell(`D${currentRow + 7}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
    };

    // เพิ่มลายเซ็น
    worksheet.getCell(`A${currentRow + 9}`).value = "______________________";
    worksheet.getCell(`A${currentRow + 10}`).value = "ผู้ออกเอกสาร";
    worksheet.getCell(`E${currentRow + 9}`).value = "______________________";
    worksheet.getCell(`E${currentRow + 10}`).value = "ผู้สั่งซื้อสินค้า";

    // เพิ่มหมายเหตุ
    worksheet.getCell(`A${currentRow + 12}`).value = "If you have any questions, please contact [Name, Phone, email@address.com]";

    // บันทึกไฟล์ Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Quotation.xlsx");
  };

  return (
    <PageContainer>
      <Breadcrumb
        title="Add Maintenance Requests"
        breadcrumbs={[
          { name: "Home", href: "/dashboard" },
          { name: "Maintenance Requests", href: "/maintenance-request" },
          { name: "Add Maintenance Request" },
        ]}
      />

      {/* DashboardCard พร้อมส่วนหัวแบบกำหนดเอง */}
      <DashboardCard
        title={<Typography variant="h2">เพิ่มใบเสนอราคา</Typography>}
        action={
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <IconButton
              onClick={handlePrint}
              sx={{ color: "primary.main", fontSize: 28 }}
            >
              <Print />
            </IconButton>
            <IconButton
              onClick={handleMessage}
              sx={{ color: "info.main", fontSize: 28 }}
            >
              <Message />
            </IconButton>
            <IconButton
              onClick={handleDownload}
              sx={{ color: "success.main", fontSize: 28 }}
            >
              <GetApp />
            </IconButton>
          </Box>
        }
      >
        {/* เนื้อหาใน DashboardCard */}
        <Grid2 container spacing={3} sx={{ p: 3 }}>
          <Grid2 size={6}>
            <CompanyInformation />
          </Grid2>
          <Grid2 size={6}>
            <ContactotInformation />
          </Grid2>
          <Grid2 size={12}>
            <NewItems />
          </Grid2>
          <Grid2 size={12}>
            <ItemsTable />
          </Grid2>
          <Grid2 container size={12}>
            <Grid2 size={6}>
              <DocumentFooter />
            </Grid2>
            <Grid2 size={6}>
              <CalculateItems />
            </Grid2>
          </Grid2>
        </Grid2>
      </DashboardCard>
    </PageContainer>
  );
};

export default NewQuotation;
