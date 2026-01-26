import React, { useState, useEffect } from "react";
import ExcelJS from 'exceljs';
import excelhead from '@/template/excelfile/excelhead';
// import { Quotation,useDatabaseContext } from "@/contexts/dbContext";
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Quotation");

interface ProductTableProps {
  // data: Quotation[];
  tableName: string | null;
  newDocumentHref: string | null;
  newDocumentName: string | null;
}


const excelBody = () =>  {

  // const [rows, setRows] = useState<Quotation[]>([]);
 
  const exportExcelBody = async () => {
    // เพิ่มข้อมูลสินค้า
        // ตัวอย่างข้อมูล JSON
        const jsonData = [
          {
          product: "Service Fee 1",
          qty: 1,
          price: 120.0,
          discount: 0,
          total: 120.0,
          },
          {
          product: "Service Fee 6",
          qty: 1,
          price: 30.0,
          discount: 0,
          total: 30.0,
          },
          {
          product: "Service Fee 11",
          qty: 2,
          price: 50.0,
          discount: 0,
          total: 50.0,
          },
          {
          product: "Service Fee 16",
          qty: 3,
          price: 200.0,
          discount: 0,
          total: 200.0,
          },
      ];
      // ใช้ลูปเพื่อใส่ข้อมูลจาก JSON ไปยังคอลัมน์ A, E, F, G, H (แถว 15 ถึง 30)
      let rowIndex = 15; // เริ่มต้นจากแถวที่ 15
      jsonData.forEach((data, index) => {
          if (rowIndex + index <= 30) {
              // ตรวจสอบว่าแถวยังไม่เกินแถว 30
              worksheet.getCell(`A${rowIndex + index}`).value = data.product; // คอลัมน์ A
              worksheet.getCell(`E${rowIndex + index}`).value = data.qty; // คอลัมน์ E
              worksheet.getCell(`E${rowIndex + index}`).alignment = {
              vertical: "middle",
              horizontal: "center",
              };
              worksheet.getCell(`F${rowIndex + index}`).value = data.discount; // คอลัมน์ F
              worksheet.getCell(`F${rowIndex + index}`).alignment = {
              vertical: "middle",
              horizontal: "center",
              };
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