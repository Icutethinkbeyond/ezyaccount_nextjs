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

// set single thin border around A1
worksheet.getCell('A14:I30').border = {
  top: {style:'thin'},
  left: {style:'thin'},
  bottom: {style:'thin'},
  right: {style:'thin'}
};
worksheet.getCell('A14:I14').border = {
  bottom: {style:'thin'},
};
worksheet.getCell('E14:E30').border = {
  left: {style:'thin'},
  right: {style:'thin'}
};
worksheet.getCell('G14:G30').border = {
  left: {style:'thin'},
  right: {style:'thin'}
};

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