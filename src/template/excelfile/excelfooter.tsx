import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import excelhead from '@/template/excelfile/excelhead';
import excelBody from '@/template/excelfile/excelbody';
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Quotation");

const excelFooter = () => {

  const exportExcelFooter = async () => {
      
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
          worksheet.getCell('G38').value = {
              richText: [
                { text: 'ยอดชำระรวม'},
                {
                  font: { bold: true },
                  text: ''
                },
              ]
            };
            // set cell alignment to top-left, middle-center, bottom-right
            for (let row = 32; row <= 38; row++) { 
              const cell = worksheet.getCell(`G${row}`); // แถว 30 และแต่ละคอลัมน์
              cell.alignment = { 
                vertical: 'middle', horizontal: 'right'
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
      
            worksheet.mergeCells('B43:C43');
            worksheet.mergeCells('E43:G43');
            worksheet.mergeCells('H43:I43');
      
            worksheet.getCell('B43').value = 'ผู้ออกเอกสาร';
            worksheet.getCell('D43').value = 'วันที่';
            worksheet.getCell('E43').value = 'ผู้ซื้อสินค้า';
            worksheet.getCell('H43').value = 'วันที่';
      
            // set cell alignment to top-left, middle-center, bottom-right
            worksheet.getCell('B43').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('D43').alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('E43').alignment = { vertical: 'middle', horizontal: 'center' };
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
          // บันทึกไฟล์ Excel
          const buffer = await workbook.xlsx.writeBuffer();
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveAs(blob, "Quotation.xlsx");
        
      };
};
export default excelFooter;
