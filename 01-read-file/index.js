const fs = require('fs');  /* Для взаимод. с файловой сист. в NodeJs исп. модуль fs*/
const path = require('path'); /* Для корректн. указания пути к файлу*/
const filePath = path.join(__dirname, 'text.txt');

/* Создание нового ReadStream из файла text.txt */

const ReadStream = new fs.ReadStream(filePath, 'utf8');

ReadStream.on('data', (data) => {
    process.stdout.write(data.toString());
});


