# Image Processing

Node JS script-tool for handling images.

Used it for resizing, cropping and compression of amounts around 100's of images at a batch.

Worked fine with ~3500px sized images for me. Just needs heavy CPU then.

## Usage

1. Put your images into `origImages` directory
1. configure the script `index.js`, around line 45, to your needs
1. run the script with `npm run index`
1. wait until process finished 
1. grab you processed images out of `processedImages`

### suffix filename

1. set the variable `suffixName` to something you wan't to append to your file name.

e.g. `2727705.jpg` with suffixName = "_360" renames and saves as `2727705_360.jpg`

## Install

1. `npm i`

## Used this...

[Jimp](https://www.npmjs.com/package/jimp)

