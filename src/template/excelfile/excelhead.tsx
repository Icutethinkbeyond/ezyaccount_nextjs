import ExcelJS from 'exceljs';
import { useDatabaseContext } from "@/contexts/dbContext";
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Quotation");

const excelHead= () => {

    const { quotationState } = useDatabaseContext();
    // 1. Create a new workbook
  
    // สร้าง ExcelJS workbook
    // const workbook = new ExcelJS.Workbook();
    // const worksheet = workbook.addWorksheet("Quotation");
    const exportExcelHeader = async () => {
    
    // const Workbook = require('../lib/doc/workbook');
    // workbook.creator = 'Me';
    // workbook.lastModifiedBy = 'Her';
    // workbook.created = new Date();
    // workbook.modified = new Date();
    // workbook.lastPrinted = new Date();

    // create new sheet with pageSetup settings for A4 - portrait
    const worksheet =  workbook.addWorksheet('My Sheet', {
        pageSetup:{paperSize: 9, orientation:'portrait'}
      });
    // adjust pageSetup settings afterwards
    worksheet.pageSetup.margins = {
      left: 0.25, right: 0.25,
      top: 0.75, bottom: 0.75,
      header: 0.3, footer: 0.3
    };

    // Set Print Area for a sheet
    worksheet.pageSetup.printArea = 'A1:I44';

    const filename = process.argv[2];
    
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

    // เพิ่มรูปภาพ
    const imageId = workbook.addImage({
      filename: '/public/images/logos/logo-normal-png.png', // ใส่พาธไฟล์รูปภาพของคุณ
      extension: 'png',
    });

    // วางรูปภาพนอกเซลล์ (เช่น บริเวณตำแหน่ง h1 แต่นอกขอบเซลล์)
    worksheet.addImage(imageId, {
        tl: { col: 7.25, row: 0.2 }, // ตำแหน่งเริ่มต้น: นอกเซลล์ A1
        ext: { width: 97.92, height: 93.12 }, // กำหนดขนาดรูปภาพ
    });

    worksheet.getCell('A1').value = 'ใบเสนอราคา';
    worksheet.getCell('A2').value = 'วันที่ออก';
    worksheet.getCell('B2').value = new Date();
    worksheet.getCell('C2').value = 'ใช้ได้ถึง';
    worksheet.getCell('D2').value = new Date();

    worksheet.getCell('H5').value = 'เลขอ้างอิง';
    worksheet.getCell('H5').value = '#1234567';

    worksheet.getCell('A3').value = '[ชื่อบริษัท]';
    worksheet.getCell('A4').value = '[ที่อยู่]';
    worksheet.getCell('A5').value = '[เบอร์โทร]';
    worksheet.getCell('A6').value = '[เลขที่เสียภาษี]';
    worksheet.getCell('A7').value = '[E-mail]';

    worksheet.getCell('A9').value = 'ลูกค้า';
    worksheet.getCell('A10').value = '[ที่อยู่]';
    worksheet.getCell('A11').value = '[เบอร์โทร,e-mail]';
    
    };
    return exportExcelHeader;
  };
    

export default excelHead;


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