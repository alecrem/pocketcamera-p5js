const p5 = require('node-p5');

function sketch(p) {
  // Variables to read images
  p.img = [], p.imgIndex;
  p.photoPixels = [];

  p.setup = async () => {
    p.img.push(await p.loadImage("../photos/20070804_pescao.png"));
    p.imgIndex = 0;
    p.img[p.imgIndex].loadPixels();
    p.photoPixels = p.parseImage();
    console.log(JSON.stringify(p.photoPixels));

    p.noLoop()
  }

  p.parseImage = () => {
    const initialX = (p.img[p.imgIndex].width - p.img[p.imgIndex].height) / 2;
    let allRowsPix = [];
    for (let y = 0; y < p.img[p.imgIndex].height; y++) {
      let rowPix = [];
      for (let x = initialX; x < p.img[p.imgIndex].height + initialX; x++) {
        let pix = p.img[p.imgIndex].get(x, y);
        // 0, 102, 153, 255
        if (pix[0] < 64) {
          rowPix.push(0);
        } else if (pix[0] < 128) {
          rowPix.push(1);
        } else if (pix[0] < 192) {
          rowPix.push(2);
        } else {
          rowPix.push(3);
        }
      }
      allRowsPix.push(rowPix);
    }
    let allRowsBase64 = [];
    const pixelsPerChar = 3;
    const bitsPerPixel = 2;
    for (let y = 0; y < allRowsPix.length; y++) {
      let base64digit = 0;
      let row = '';
      for (let x = allRowsPix[y].length - 1; x >= 0; x--) {
        base64digit += allRowsPix[y][x] << bitsPerPixel * (x % pixelsPerChar);
        if(x % pixelsPerChar == pixelsPerChar - 1 || x == 0) {
          row += String.fromCharCode(uint6ToB64(base64digit));
          base64digit = 0;
        }
      }
      // console.log('row length', row.length, row.length * 3, allRowsPix[y].length);
      allRowsBase64.push(row);
    }
    return allRowsBase64;
  }
}

const uint6ToB64 = (nUint6) => {
  return nUint6 < 26 ?
      nUint6 + 65
    : nUint6 < 52 ?
      nUint6 + 71
    : nUint6 < 62 ?
      nUint6 - 4
    : nUint6 === 62 ?
      43
    : nUint6 === 63 ?
      47
    :
      65;
}

let p5Instance = p5.createSketch(sketch);

