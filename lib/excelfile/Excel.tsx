import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const Excel: React.FC = () => {
  const generateExcel = async () => {
    // สร้าง Workbook และ Worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet', {
      pageSetup: { paperSize: 9, orientation: 'portrait' },
    });

    // ตั้งค่าหน้ากระดาษ
    worksheet.pageSetup.margins = {
      left: 0.25,
      right: 0.25,
      top: 0.75,
      bottom: 0.75,
      header: 0.3,
      footer: 0.3,
    };
    worksheet.pageSetup.printArea = 'A1:I44';

    // กำหนดคอลัมน์
    worksheet.columns = [
      { header: 'Col 1', width: 6 },
      { header: 'Col 2', width: 12 },
      { header: 'Col 3', width: 5.25 },
      { header: 'Col 4', width: 17.88 },
      { header: 'Col 5', width: 6 },
      { header: 'Col 6', width: 6 },
      { header: 'Col 7', width: 12 },
      { header: 'Col 8', width: 8.5 },
      { header: 'Col 9', width: 8.13 },
    ];

    // เพิ่มข้อมูลส่วนหัว
    worksheet.getCell('A1').value = 'ใบเสนอราคา';
    worksheet.getCell('A2').value = 'วันที่ออก';
    worksheet.getCell('C2').value = 'ใช้ได้ถึง';
    worksheet.getCell('H5').value = 'เลขอ้างอิง';
    worksheet.getCell('H6').value = '#1234567';

    worksheet.getCell('A3').value = '[ชื่อบริษัท]';
    worksheet.getCell('A4').value = '[ที่อยู่]';
    worksheet.getCell('A5').value = '[เบอร์โทร]';
    worksheet.getCell('A6').value = '[เลขที่เสียภาษี]';
    worksheet.getCell('A7').value = '[E-mail]';

    worksheet.getCell('A9').value = 'ลูกค้า';
    worksheet.getCell('A10').value = '[ที่อยู่]';
    worksheet.getCell('A11').value = '[เบอร์โทร, e-mail]';

    // เพิ่มเส้นขอบ
    worksheet.getCell('A14:I30').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    worksheet.getCell('A14:I14').border = {
      bottom: { style: 'thin' },
    };
    worksheet.getCell('E14:E30').border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
    worksheet.getCell('G14:G30').border = {
      left: { style: 'thin' },
      right: { style: 'thin' },
    };

    // เพิ่มข้อมูลส่วนท้าย
    worksheet.getCell('A32').value = { formula: '"("&BAHTTEXT(H38)&")"', result: 3 };
    worksheet.getCell('A35').value = 'หมายเหตุ';
    worksheet.getCell('A32').alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getCell('A35').alignment = { vertical: 'middle', horizontal: 'left' };

    worksheet.getCell('G32').value = 'รวมเป็นเงิน';
    worksheet.getCell('G33').value = 'ส่วนลดรวม';
    worksheet.getCell('G34').value = 'ราคาหลังหักส่วนลด';
    worksheet.getCell('G35').value = 'ภาษีมูลค่าเพิ่ม 7%';
    worksheet.getCell('G36').value = 'จำนวนเงินรวมทั้งสิ้น';
    worksheet.getCell('G37').value = 'หัก ณ ที่จ่าย';
    worksheet.getCell('G38').value = 'ยอดชำระรวม';

    ['G32', 'G33', 'G34', 'G35', 'G36', 'G37', 'G38'].forEach((cell) => {
      worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'right' };
    });

    worksheet.mergeCells('H32:I32');
    worksheet.mergeCells('H33:I33');
    worksheet.mergeCells('H34:I34');
    worksheet.mergeCells('H35:I35');
    worksheet.mergeCells('H36:I36');
    worksheet.mergeCells('H37:I37');
    worksheet.mergeCells('H38:I38');

    worksheet.getCell('H32').value = { formula: 'SUM(H15:H30)', result: 3 };
    worksheet.getCell('H33').value = { formula: 'SUM(F15:F30)', result: 3 };
    worksheet.getCell('H34').value = { formula: 'H32-H33', result: 3 };
    worksheet.getCell('H35').value = { formula: 'H34*0.07', result: 3 };
    worksheet.getCell('H36').value = { formula: 'H34+H35', result: 3 };
    worksheet.getCell('H37').value = { formula: 'H36*0.13', result: 3 };
    worksheet.getCell('H38').value = { formula: 'H36-H37', result: 3 };

    // ส่วนลายเซ็น
    worksheet.mergeCells('B43:C43');
    worksheet.mergeCells('E43:G43');
    worksheet.mergeCells('H43:I43');

    worksheet.getCell('B43').value = 'ผู้ออกเอกสาร';
    worksheet.getCell('D43').value = 'วันที่';
    worksheet.getCell('E43').value = 'ผู้ซื้อสินค้า';
    worksheet.getCell('H43').value = 'วันที่';

    ['B43', 'D43', 'E43', 'H43'].forEach((cell) => {
      worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // บันทึกไฟล์ในเบราว์เซอร์
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'output.xlsx');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>สร้างและดาวน์โหลดไฟล์ Excel</h1>
      <button onClick={generateExcel} style={{ padding: '10px 20px', fontSize: '16px' }}>
        สร้างไฟล์ Excel
      </button>
    </div>
  );
};

export default Excel;
