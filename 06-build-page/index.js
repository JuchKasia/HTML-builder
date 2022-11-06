const path = require('path');
const fs = require('fs');
const {mkdir} = require('fs/promises');
const dirProject = path.join(__dirname, 'project-dist');
const dirOldAssets = path.join(__dirname, 'assets');
const dirNewAssets = path.join(dirProject, 'assets');
const dirOldStyle = path.join(__dirname, 'styles');
const newStyle = path.join(dirProject, 'style.css');

const copyFileFromFolder = (oldDir, newDir) => {
    mkdir(newDir, {recursive: true}).then(() => {
        fs.readdir(oldDir, {withFileTypes: true}, (err, files,) => {
            for (let file of files) {
                let name = path.join(oldDir, file.name);
                let nameCopy = path.join(newDir, file.name);
                if (file.isDirectory()) {
                    copyFileFromFolder(name, nameCopy)
                    console.log('create folder ' + file.name)
                } else {
                    fs.createReadStream(name).pipe(fs.createWriteStream(nameCopy));
                }
            }
        });
    });
}

const enjoyStyle = () => {
    const writeStream = fs.createWriteStream(newStyle);
    fs.readdir(dirOldStyle, {withFileTypes: true}, (err, files,) => {
        console.log('merge style')
        for (let file of files) {
            if (file.isFile() && path.extname(file.name) === '.css') {
                fs.createReadStream(path.join(dirOldStyle, file.name), 'utf8').on('data', data => {
                    writeStream.write(data);
                })
            }
        }
    });
}

function htmlBuild(template, index) {
    let html = '';
    let templateStream = fs.createReadStream(template, {encoding: 'utf8'});
    templateStream.on('data', data => {
        html += data.toString();
    });
    console.log('create index.html')
    templateStream.on('end', () => {
        replaceContent(html, index);
    });
}

function replaceContent(html, target) {
    const workDir = path.join(__dirname, 'components')
    let newHtml = html
    const regexp = /{{.*}}/gm;
    let match;
    while (match = regexp.exec(html)) {
        let income = match[0]
        let matchName = match[0].replace('{{','').replace('}}','.html')
        let getTemplateContent = fs.createReadStream(path.join(workDir,matchName), {encoding: 'utf8'});
        let templateContent = ''
        getTemplateContent.on('data', data => {
            templateContent = data.toString();
        });
        getTemplateContent.on('end', () => {
            newHtml = newHtml.replace(income,templateContent)
            let writeIndex = fs.createWriteStream(target, {encoding: 'utf8'});
            writeIndex.write(newHtml);
        });
    }
}

fs.rm(dirProject, {recursive: true, force: true}, () => {
    console.log('rebuild project')
    mkdir(dirProject, {recursive: true}).then(() => {
        console.log('create folder project-dist')
        mkdir(dirNewAssets, {recursive: true}).then(() => {
            console.log('create folder asset')
            copyFileFromFolder(dirOldAssets, dirNewAssets)
            enjoyStyle();
            htmlBuild(path.join(__dirname, 'template.html'), path.join(dirProject, 'index.html'));
        });
    });
});