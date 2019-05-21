const fs = require('fs');
const mime = require('mime');
const chalk = require('chalk');
const Jimp = require('jimp');

const originalPath = 'origImages/';
const processedPath = 'processedImages/';

//const suffixName = '1080'; // there shouldn't be any dot's in the filename!

fs.readdir(processedPath, (err, files) => {
    if (!!files.length) {
        console.log(chalk.red('stopping!!',processedPath, `is not empty`));
        console.log(chalk.blue('Files:'),files);
        return;
    }

    processFiles();
});

const processFiles = () => {
    const consoleFileLimit = 10;
    const files = fs.readdirSync(originalPath);

    if (files.length >= consoleFileLimit) {
        console.log('start processing',chalk.blue(files.length),'files');
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const filePath = `${originalPath}${file}`;
        const fileType = mime.getType(filePath);
        let filename = file;

        if (typeof suffixName !== "undefined") {
            let fileArr = file.split('.');
            fileArr[1] = `.${fileArr[1]}`;
            fileArr.splice(1, 0, suffixName);
            filename = fileArr.join('');
        }

        const finishPath = `${processedPath}${filename}`;

        if (files.length < consoleFileLimit) {
            console.log('start processing',chalk.blue(filePath));
        }

        if (fileType !== 'image/jpeg') {
            console.log(chalk.red('abort processing',filePath, `is not a jpeg. it\'s a "${fileType}"`));
            continue;
        }

        Jimp.read(filePath)
            .then(img => {
                return img
                    //.resize(980, 551)
                    .resize(360, 240)
                    // .crop( 100, 0, 1080, 720 )
                    .quality(75) // set JPEG quality
                    .write(finishPath);
            })
            .then(() => {
                console.log(chalk.green('kind of finished processing',filePath,'... saved in',finishPath));
            })
            .catch(err => {
                console.error(err);
            });
    }
};
