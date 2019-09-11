const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');
var cron = require('node-cron');

const directoryPath = path.join('/home/vignesh/workspace/filePath');

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
});

cron.schedule('*/10 * * * * *', function() {

fs.createReadStream('/home/vignesh/workspace/filePath/C2ImportCalEventSample.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
  });


