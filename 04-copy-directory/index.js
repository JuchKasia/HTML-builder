
const fs = require('fs');
const path = require('path');

const dirCopy = path.join(__dirname, 'files-copy');
const dirFiles = path.join(__dirname, 'files');

fs.readdir(dirCopy, (err, file) => {
  if (file) {
    file.forEach(el => {
      fs.unlink(path.join(dirCopy, el), () => {
      });
    });
  }
});

fs.mkdir(dirCopy, () => {
  console.log('Created folder');
});

fs.readdir(dirFiles, (err, file) => {
  file.forEach(el => {
    fs.readFile(path.join(__dirname, 'files', el), 'utf8', (err, data) => {
      fs.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files-copy', el), () => {
      });
    });
  });
  console.log('Files copy');
});


