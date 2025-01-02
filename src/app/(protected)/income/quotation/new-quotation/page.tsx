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
import { $Enums } from "@prisma/client";

const path = require('path');

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

    // ตั้งค่าคอลัมน์/row
    worksheet.columns = [
      {header: '', key: 'product', width: 6},
      {header: '', width: 12},
      {header: '', width: 5.25},
      {header: '', width: 17.88},
      {header: '', key: 'qty', width: 6},
      {header: '', key: 'discount', width: 6},
      {header: '', key: 'price', width: 12},
      {header: '', key: 'total', width: 8.5},
      {header: '', width: 8.13},
    ];
    worksheet.getRow(1).height = 39.57;
    worksheet.getRow(3).height = 24;
    worksheet.getRow(8).height = 18;
    worksheet.getRow(9).height = 20;
    worksheet.getRow(10).height = 14.25;
    worksheet.getRow(31).height = 14.25;
    worksheet.getRow(32).height = 16.5;
    worksheet.getRow(33).height = 16.5;
    worksheet.getRow(34).height = 16.5;
    worksheet.getRow(35).height = 28;
    worksheet.getRow(36).height = 24;
    worksheet.getRow(37).height = 24;
    worksheet.getRow(38).height = 21;
    worksheet.getRow(39).height = 14.25;
    worksheet.getRow(40).height = 14.25;
    worksheet.getRow(42).height = 16.5;
    worksheet.getRow(43).height = 21.75;
    worksheet.getRow(44).height = 16.5;
    worksheet.getRow(45).height = 16.5;
    worksheet.getRow(46).height = 16.5;

    // // เพิ่มรูปภาพ
    // const imagePath = path.join(__dirname,'public/images/logos/logo-normal-png.png');
    // const imageId = workbook.addImage({
    //   filename: imagePath, // ใส่พาธไฟล์รูปภาพของคุณ
    //   extension: 'png',
    // });

    // // วางรูปภาพนอกเซลล์ (เช่น บริเวณตำแหน่ง h1 แต่นอกขอบเซลล์)
    // worksheet.addImage(imageId, {
    //     tl: { col: 7.25, row: 0.2 }, // ตำแหน่งเริ่มต้น: นอกเซลล์ A1
    //     ext: { width: 97.92, height: 93.12 }, // กำหนดขนาดรูปภาพ
    // });

    // เพิ่มหัวเรื่องและกำหนดพื้นหลัง
    worksheet.getCell("A1").value = "ใบเสนอราคา";
    worksheet.getCell("A1").alignment = { vertical: "middle", horizontal: "left" };
    worksheet.getCell('A1').value = 'ใบเสนอราคา';
    worksheet.getCell('A2').value = 'วันที่ออก: ';
    // วันปัจจุบัน
    let currentDate = new Date();
    worksheet.getCell('B2').value = currentDate;
    worksheet.getCell("B2").alignment = { horizontal: "left" };
    worksheet.getCell('C2').value = 'ใช้ได้ถึง: ';
    // เพิ่ม 30 วัน
    let futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 30); 
    worksheet.getCell('D2').value = futureDate;
    worksheet.getCell("D2").alignment = { horizontal: "left" };

    worksheet.getCell('H5').value = 'เลขอ้างอิง';
    worksheet.getCell('I5').value = '#1234567';
    worksheet.getCell('H5').alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('I5').alignment = { vertical: 'middle', horizontal: 'left' };

    // เพิ่มข้อมูลบริษัท
    worksheet.getCell('A3').value = '[ชื่อบริษัท]';
    worksheet.getCell('A4').value = '[ที่อยู่]';
    worksheet.getCell('A5').value = '[เบอร์โทร]';
    worksheet.getCell('A6').value = '[เลขที่เสียภาษี]';
    worksheet.getCell('A7').value = '[E-mail]';

    // เพิ่มข้อมูลลูกค้า
    worksheet.getCell('A9').value = 'ลูกค้า';
    worksheet.getCell('A10').value = '[ที่อยู่]';
    worksheet.getCell('A11').value = '[เบอร์โทร,e-mail]';

    // รวมเซลล์ในคอลัมน์ H และ I สำหรับแถว 14 ถึง 30
    for (let row = 14; row <= 30; row++) {
      worksheet.mergeCells(`H${row}:I${row}`); // รวมเซลล์ H และ I ในแถวที่กำหนด
    }
    worksheet.getCell('A14').value = 'สินค้า/บริการ';
    worksheet.getCell('E14').value = 'จำนวน';
    worksheet.getCell('F14').value = 'ส่วนลด';
    worksheet.getCell('G14').value = 'ราคา';
    worksheet.getCell('H14').value = 'ราคารวม';
    worksheet.getCell('E14').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('F14').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('G14').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('H14').alignment = { vertical: 'middle', horizontal: 'center' };
    // ใส่เส้น top,bottom ให้กับช่วงคอลัมน์ A ถึง I ในแถวที่ 14
    for (let col = 1; col <= 9; col++) { // 1 = A, 9 = I
      const cell = worksheet.getCell(14, col); // แถว 14 และแต่ละคอลัมน์
      cell.border = { 
        top: { style: 'thin', color: { argb: 'FF000000' } },// เส้น top
        bottom: { style: 'thin', color: { argb: 'FF000000' } },// เส้น bottom
      };   
    }
    worksheet.getCell('J14').border = {
      left: {style:'thin', color: { argb: 'FF000000' } },
    };

    // ใส่สีพื้น (Fill) ให้กับช่วงคอลัมน์ A ถึง I ในแถวที่ 14
    for (let col = 1; col <= 9; col++) { // 1 = A, 9 = I
        const cell = worksheet.getCell(14, col); // แถว 14 และแต่ละคอลัมน์
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'BFBFBF' } // สีเทา
        };
    }

    // ใส่เส้นขอบซ้ายให้กับเซลล์ในคอลัมน์ A (แถว 15 ถึง 30)
    for (let row = 15; row <= 30; row++) {
      const cell = worksheet.getCell(`A${row}`);
      cell.border = {
          left: { style: 'thin', color: { argb: 'FF000000' } },   // เส้นซ้าย
      };
    }
    // ใส่เส้นขอบขวาให้กับเซลล์ในคอลัมน์ I (แถว 15 ถึง 30)
    for (let row = 15; row <= 30; row++) {
      const cell = worksheet.getCell(`I${row}`);
      cell.border = {
          right: { style: 'thin', color: { argb: 'FF000000' } },   // เส้นขวา
      };
    }
    // ใส่เส้นขอบซ้ายและขวาให้กับเซลล์ในคอลัมน์ E, F, G (แถว 15 ถึง 30)
    for (let row = 15; row <= 30; row++) {
      // คอลัมน์ E
      const cellE = worksheet.getCell(`E${row}`);
      cellE.border = {
          left: { style: 'thin', color: { argb: 'FF000000' } },   // เส้นซ้าย
          right: { style: 'thin', color: { argb: 'FF000000' } }   // เส้นขวา
      };

      // คอลัมน์ F
      const cellF = worksheet.getCell(`F${row}`);
      cellF.border = {
          left: { style: 'thin', color: { argb: 'FF000000' } },   // เส้นซ้าย
          right: { style: 'thin', color: { argb: 'FF000000' } }   // เส้นขวา
      };

      // คอลัมน์ G
      const cellG = worksheet.getCell(`G${row}`);
      cellG.border = {
          left: { style: 'thin', color: { argb: 'FF000000' } },   // เส้นซ้าย
          right: { style: 'thin', color: { argb: 'FF000000' } }   // เส้นขวา
      };
    }

    worksheet.getCell('E14').border = {
      top: {style:'thin', color: { argb: 'FF000000' } },
      left: {style:'thin', color: { argb: 'FF000000' } },
      bottom: {style:'thin', color: { argb: 'FF000000' } },
      right: {style:'thin', color: { argb: 'FF000000' } },
    };
    worksheet.getCell('F14').border = {
      top: {style:'thin', color: { argb: 'FF000000' } },
      left: {style:'thin', color: { argb: 'FF000000' } },
      bottom: {style:'thin', color: { argb: 'FF000000' } },
      right: {style:'thin', color: { argb: 'FF000000' } },
    };
    worksheet.getCell('G14').border = {
      top: {style:'thin', color: { argb: 'FF000000' } },
      left: {style:'thin', color: { argb: 'FF000000' } },
      bottom: {style:'thin', color: { argb: 'FF000000' } },
      right: {style:'thin', color: { argb: 'FF000000' } },
    };

    // ใส่เส้น top ให้กับช่วงคอลัมน์ A ถึง I ในแถวที่ 31
    for (let col = 1; col <= 9; col++) { // 1 = A, 9 = I
        const cell = worksheet.getCell(31, col); // แถว 30 และแต่ละคอลัมน์
        cell.border = { 
          top: { style: 'thin', color: { argb: 'FF000000' } },// เส้น bottom
        };   
    }

    // เพิ่มข้อมูลสินค้า
    // ตัวอย่างข้อมูล JSON
    const jsonData = [
      { product: "Service Fee 1", qty: 1, price: 120.00, discount: 0, total: 120.00 },
      { product: "Service Fee 6", qty: 1, price: 30.00, discount: 0, total: 30.00 },
      { product: "Service Fee 11", qty: 2, price: 50.00, discount: 0, total: 50.00 },
      { product: "Service Fee 16", qty: 3, price: 200.00, discount: 0, total: 200.00 }
    ];

    // ใช้ลูปเพื่อใส่ข้อมูลจาก JSON ไปยังคอลัมน์ A, E, F, G, H (แถว 15 ถึง 30)
    let rowIndex = 15; // เริ่มต้นจากแถวที่ 15
    jsonData.forEach((data, index) => {
        if (rowIndex + index <= 30) { // ตรวจสอบว่าแถวยังไม่เกินแถว 30
            worksheet.getCell(`A${rowIndex + index}`).value = data.product; // คอลัมน์ A
            worksheet.getCell(`E${rowIndex + index}`).value = data.qty; // คอลัมน์ E
            worksheet.getCell(`E${rowIndex + index}`).alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell(`F${rowIndex + index}`).value = data.discount; // คอลัมน์ F
            worksheet.getCell(`F${rowIndex + index}`).alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell(`G${rowIndex + index}`).value = data.price; // คอลัมน์ G
            worksheet.getCell(`H${rowIndex + index}`).value = data.total; // คอลัมน์ H
        }
    });

    worksheet.getCell('A32').value = {formula: '"("&BAHTTEXT(H38)&")"', result: 3};
    worksheet.getCell('A35').value = 'หมายเหตุ';
      // set cell alignment to top-left, middle-center, bottom-right
    worksheet.getCell('A32').alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getCell('A35').alignment = { vertical: 'middle', horizontal: 'left' };

    // เพิ่มหมายเหตุ
    // worksheet.getCell(`A${currentRow + 12}`).value = "If you have any questions, please contact [Name, Phone, email@address.com]";

    worksheet.getCell('G32').value = 'รวมเป็นเงิน';
    worksheet.getCell('G33').value = 'ส่วนลดรวม';
    worksheet.getCell('G34').value = 'ราคาหลังหักส่วนลด';
    worksheet.getCell('G35').value = 'ภาษีมูลค่าเพิ่ม 7%';
    worksheet.getCell('G36').value = 'จำนวนเงินรวมทั้งสิ้น';
    worksheet.getCell('G37').value = 'หัก ณ ที่จ่าย';
    worksheet.getCell('G38').value = 'ยอดชำระรวม';
      // set cell alignment to top-left, middle-center, bottom-right
      for (let row = 32; row <= 38; row++) { 
        const cell = worksheet.getCell(`G${row}`); // แถว 30 และแต่ละคอลัมน์
        cell.alignment = { 
          vertical: 'middle',
          horizontal: 'right'
        };
      }

      worksheet.mergeCells('H32:I32');
      worksheet.mergeCells('H33:I33');
      worksheet.mergeCells('H34:I34');
      worksheet.mergeCells('H35:I35');
      worksheet.mergeCells('H36:I36');
      worksheet.mergeCells('H37:I37');
      worksheet.mergeCells('H38:I38');

      worksheet.getCell('H32').value = {formula: 'SUM(H15:H30)', result: 3};
      worksheet.getCell('H33').value = {formula: 'SUM(F15:F30)', result: 3};
      worksheet.getCell('H34').value = {formula: 'H32-H33', result: 3};
      worksheet.getCell('H35').value = {formula: 'H34*0.07', result: 3};
      worksheet.getCell('H36').value = {formula: 'H34+H35', result: 3};
      worksheet.getCell('H37').value = {formula: 'H36*0.13', result: 3};
      worksheet.getCell('H38').value = {formula: 'H36-H37', result: 3};
      worksheet.getCell('G37').border = {
        top: {style:'thin'}
      };
      worksheet.getCell('H37').border = {
        top: {style:'thin'}
      };

      worksheet.mergeCells('B42:C42');
      worksheet.mergeCells('B43:C43');
      worksheet.mergeCells('E42:G42');
      worksheet.mergeCells('E43:G43');
      worksheet.mergeCells('H42:I42');
      worksheet.mergeCells('H43:I43');

       // เพิ่มลายเซ็น
      worksheet.getCell('B42').value = "_______________";
      worksheet.getCell('B43').value = 'ผู้ออกเอกสาร';
      worksheet.getCell('D42').value = "_______________";
      worksheet.getCell('D43').value = 'วันที่';
      worksheet.getCell('E42').value = "_______________";
      worksheet.getCell('E43').value = 'ผู้ซื้อสินค้า';
      worksheet.getCell('H42').value = "_______________";
      worksheet.getCell('H43').value = 'วันที่';

      // set cell alignment to top-left, middle-center, bottom-right
      worksheet.getCell('B42').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('B43').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('D42').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('D43').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('E42').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('E43').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('H42').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('H43').alignment = { vertical: 'middle', horizontal: 'center' };

      // ตั้งค่า Font Family สำหรับทั้งเวิร์กชีต
      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.font = {
                name: 'Cordia New',  // ตั้งค่า Font Family
                bold: false,    // ไม่ตัวหนา
                italic: false,  // ไม่เอียง
                color: { argb: 'FF000000' } // สีดำ
            };
        });
      });
      worksheet.mergeCells('A1:C1');
      worksheet.getCell("A1").font = { name: 'Cordia New',size: 28, bold: true };
      worksheet.getCell("G38").font = { name: 'Cordia New',size: 16, bold: true };
      worksheet.getCell("H38").font = { name: 'Cordia New',size: 16, bold: true };
      for (let row = 32; row <= 37; row++) { 
        const cell = worksheet.getCell(`G${row}`); // แถว 32-37 และแต่ละคอลัมน์
        cell.font = { name: 'Cordia New',size: 11, bold: true};
      }
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
