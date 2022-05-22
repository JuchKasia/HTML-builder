const fs = require('fs'); 
const path = require('path');
const { stdin, stdout } = require('process');


const WriteStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));


stdout.write('Enter your text: \n');
stdin.on('data' , data => { 
  if (data.toString() === 'exit') { 
    stdout.write('Have a good day');
    process.exit();
  } else {
    WriteStream.write(data.toString());
  }
});

process.on('SIGINT', () => {
  stdout.write('Have a good day');
  process.exit();
});