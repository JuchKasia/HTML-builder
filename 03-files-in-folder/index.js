const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
  for (let file of files) {
    if (err) {
      throw err
    };
    if (file.isFile()) {
      let dirPath = path.join(__dirname, 'secret-folder', file.name);
      
      fs.stat(dirPath, (err, stats) => {
        let fileName = file.name.split('.')[0];
        let FileExtname = path.extname(file.name).split('.')[1];
        let fileSize = (stats.size / 1000).toFixed(3);
        console.log(`${fileName}-${FileExtname}-${fileSize}kb`);
      });
    }
  }
});

