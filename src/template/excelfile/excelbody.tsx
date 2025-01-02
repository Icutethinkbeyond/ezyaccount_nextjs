import React, { useState, useEffect } from "react";
import ExcelJS from 'exceljs';
import excelhead from '@/template/excelfile/excelhead';
import { Quotation,useDatabaseContext } from "@/contexts/dbContext";
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Quotation");

interface ProductTableProps {
  data: Quotation[];
  tableName: string | null;
  newDocumentHref: string | null;
  newDocumentName: string | null;
}


const excelBody = () =>  {

  const [rows, setRows] = useState<Quotation[]>([]);
 
  const exportExcelBody = async () => {
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

  };
  return exportExcelBody;
};
export default excelBody;



// const options = {
//   dateFormat: 'DD/MM/YYYY HH:mm:ss',
// };

// workbook.writeFile(filename, options)
//   .then(() => {
//     console.log('Done.');
//   })
//   .catch(error => {
//     console.log(error.message);
//   });