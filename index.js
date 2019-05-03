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
    fs.readdirSync(originalPath).forEach(file => {
        const filePath = `${originalPath}${file}`;
        const finishPath = `${processedPath}${file}`;
        const fileType = mime.getType(filePath);

        console.log('start processing',chalk.blue(filePath));

        if (fileType !== 'image/jpeg') {
            console.log(chalk.red('abort processing',filePath, `is not a jpeg. it\'s a "${fileType}"`));
            return;
        }

        Jimp.read(filePath)
            .then(img => {
                return img
                    .resize(400, 400) // resize
                    //.quality() // set JPEG quality
                    .write(finishPath); // save
            })
            .then(() => {
                console.log(chalk.green('finished processing',filePath,'... saved in',finishPath));
            })
            .catch(err => {
                console.error(err);
            });
    });
};
