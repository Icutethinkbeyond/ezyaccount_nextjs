const workbook = new ExcelJS.Workbook();
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

// const filename = process.argv[2];

// const wb = new Workbook();
// const ws = wb.addWorksheet('blort');

worksheet.columns = [
  {header: 'Col 1',  width: 6},
  {header: 'Col 2',  width: 12},
  {header: 'Col 3',  width: 5.25},
  {header: 'Col 4',  width: 17.88},
  {header: 'Col 5',  width: 6},
  {header: 'Col 6',  width: 6},
  {header: 'Col 7',  width: 12},
  {header: 'Col 8',  width: 8.5},
  {header: 'Col 9',  width: 8.13},
];

worksheet.getCell('A32').value = {formula: '"("&BAHTTEXT(H38)&")"', result: 3};
worksheet.getCell('A35').value = 'หมายเหตุ';
// set cell alignment to top-left, middle-center, bottom-right
worksheet.getCell('A32').alignment = { vertical: 'middle', horizontal: 'left' };
worksheet.getCell('A35').alignment = { vertical: 'middle', horizontal: 'left' };

worksheet.getCell('G32').value = 'รวมเป็นเงิน';
worksheet.getCell('G33').value = 'ส่วนลดรวม';
worksheet.getCell('G34').value = 'ราคาหลังหักส่วนลด';
worksheet.getCell('G35').value = 'ภาษีมูลค่าเพิ่ม 7%';
worksheet.getCell('G36').value = 'จำนวนเงินรวมทั้งสิ้น';
worksheet.getCell('G37').value = 'หัก ณ ที่จ่าย';
worksheet.getCell('G38').value = {
  richText: [
    { text: 'ยอดชำระรวม'},
    {font: {bold: true}},
  ]
};
// set cell alignment to top-left, middle-center, bottom-right
worksheet.getCell('G32').alignment = { vertical: 'middle', horizontal: 'right' };
worksheet.getCell('G33').alignment = { vertical: 'middle', horizontal: 'right' };
worksheet.getCell('G34').alignment = { vertical: 'middle', horizontal: 'right' };
worksheet.getCell('G35').alignment = { vertical: 'middle', horizontal: 'right' };
worksheet.getCell('G36').alignment = { vertical: 'middle', horizontal: 'right' };
worksheet.getCell('G37').alignment = { vertical: 'middle', horizontal: 'right' };
worksheet.getCell('G38').alignment = { vertical: 'middle', horizontal: 'right' };



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
worksheet.getCell('H38').value = {
  richText: [
    { text: {formula: 'H36-H37', result: 3}},
    {font: {bold: true}},
  ]
};
worksheet.getCell('H37:I37').border = {
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

const options = {
  dateFormat: 'DD/MM/YYYY HH:mm:ss',
};

workbook.writeFile(filename, options)
  .then(() => {
    console.log('Done.');
  })
  .catch(error => {
    console.log(error.message);
  });