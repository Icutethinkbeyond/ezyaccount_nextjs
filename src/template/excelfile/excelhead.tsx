import ExcelJS from 'exceljs';
// import { useDatabaseContext } from "@/contexts/dbContext";
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Quotation");

const excelHead= () => {

    // const { quotationState } = useDatabaseContext();
    // Example: Write data into specific cells
        //เลขเอกสารหรือเลขอ้างอิง
        worksheet.getCell("I5").value = "#1234567";
        // วันปัจจุบัน
        let currentDate = new Date();
        worksheet.getCell("B2").value = currentDate;
        // เพิ่ม 30 วัน
        let futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + 30);
        worksheet.getCell("D2").value = futureDate;
        worksheet.getCell("D2").alignment = { horizontal: "left" };
        // เพิ่มข้อมูลบริษัท
        worksheet.getCell("A3").value = "[ชื่อบริษัท]";
        worksheet.getCell("A4").value = "[ที่อยู่]";
        worksheet.getCell("A5").value = "[เบอร์โทร]";
        worksheet.getCell("A6").value = "[เลขที่เสียภาษี]";
        worksheet.getCell("A7").value = "[E-mail]";

        // เพิ่มข้อมูลลูกค้า
        worksheet.getCell("A9").value = "ลูกค้า";
        worksheet.getCell("A10").value = "[ที่อยู่]";
        worksheet.getCell("A11").value = "[เบอร์โทร,e-mail]";
    
        return excelHead;
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