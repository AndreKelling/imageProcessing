const fs = require('fs');
const mime = require('mime');
const chalk = require('chalk');
const Jimp = require('jimp');

const originalPath = 'origImages/';
const processedPath = 'processedImages/';

fs.readdir(processedPath, (err, files) => {
    if (!!files.length) {
        console.log(chalk.red('stopping!!',processedPath, `is not empty`));
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
        const finishPath = `${processedPath}${file}`;
        const fileType = mime.getType(filePath);

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
                    .resize(400, 400)
                    //.resize(1280, 1280)
                    .quality(90) // set JPEG quality
                   // .crop( 0, 420, 1280, 440 )
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
