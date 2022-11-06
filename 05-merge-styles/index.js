const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.createWriteStream(bundlePath, err => {
  if (err) console.log(err);
});

(async () => {
  await fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);

    for (let file of files){
      if (path.extname(file.name).slice(1) === 'css' && file.isFile()) {
        const currentFilePath = path.join(pathFolder, file.name);

        fs.readFile(currentFilePath, 'utf-8', (err, stylesData) => {
          if (err) console.log(err);

          fs.appendFile(bundlePath, stylesData, (err) => {
            if (err) console.log(err);
          });
        });
      }
    }
  })
})()