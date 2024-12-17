import ExcelJS from 'exceljs';
import { useDatabaseContext } from "@/contexts/dbContext";

const excelHead= () => {

  const { quotationState } = useDatabaseContext();
  // 1. Create a new workbook
  const workbook = new ExcelJS.Workbook();
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
    worksheet.columns = [
      {header: 'Col 1', key: 'product', width: 6},
      {header: 'Col 2', width: 12},
      {header: 'Col 3', width: 5.25},
      {header: 'Col 4', width: 17.88},
      {header: 'Col 5', key: 'qty', width: 6},
      {header: 'Col 6', key: 'discount', width: 6},
      {header: 'Col 7', key: 'price', width: 12},
      {header: 'Col 8', key: 'totalprice', width: 8.5},
      {header: 'Col 9', width: 8.13},
    ];
    // add image to workbook by filename
    const imageId1 = workbook.addImage({
      filename: 'path/to/image.png',
      extension: 'png',
    });
    // insert an image over B2:D6
    worksheet.addImage(imageId1, 'H1:I2');

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
    return (

      exportExcelHeader
        
    );
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