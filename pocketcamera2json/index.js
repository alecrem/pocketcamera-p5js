const p5 = require('node-p5');

function sketch(p) {
  // Variables to read images
  p.img = [], p.imgIndex, p.paletteIndex;
  p.photoPixels = [];
  // Variables for a responsive square canvas
  p.offsetX, p.offsetY, p.sqSide;
  // Constants used to draw the image
  p.photoPalettes = [
    // dmg
    ['#2a423a', '#375a4a', '#5a7940', '#7c8110'], 
    // pocket
    ['#181818', '#8c926b', '#8c926b', '#c6cba4'], 
    // light
    ['#005138', '#006a4b', '#019a72', '#00b383'], 
    // color
    ['#3a3a3a', '#4d8ea1', '#96c879', '#eceaed'], 
  ];
  p.caracterPalettes = [
    // dmg
    ['#2a423a', '#375a4a', '#5a7940', '#7c8110'], 
    // pocket
    ['#181818', '#8c926b', '#8c926b', '#c6cba4'], 
    // light
    ['#005138', '#006a4b', '#019a72', '#00b383'], 
    // color
    ['#3a3a3a', '#95626f', '#dc95a8', '#eceaed'], 
  ];
  p.bgColor = 0;
  p.pixelOverlap = 2;

  p.setup = async () => {
    p.img.push(await p.loadImage("../photos/bg09.png"));
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
      for (x = initialX; x < p.img[p.imgIndex].height + initialX; x++) {
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
    return allRowsPix;
  }
}

let p5Instance = p5.createSketch(sketch);

