// Variables to read images
let img = [], imgIndex, paletteIndex;
let photoPixels = [];
// Variables for a responsive square canvas
let offsetX, offsetY, sqSide;
// Constants used to draw the image
const photoPalettes = [
  // dmg
  ['#2a423a', '#375a4a', '#5a7940', '#7c8110'], 
  // pocket
  ['#181818', '#8c926b', '#8c926b', '#c6cba4'], 
  // light
  ['#005138', '#006a4b', '#019a72', '#00b383'], 
  // color
  ['#3a3a3a', '#4d8ea1', '#96c879', '#eceaed'], 
];
const caracterPalettes = [
  // dmg
  ['#2a423a', '#375a4a', '#5a7940', '#7c8110'], 
  // pocket
  ['#181818', '#8c926b', '#8c926b', '#c6cba4'], 
  // light
  ['#005138', '#006a4b', '#019a72', '#00b383'], 
  // color
  ['#3a3a3a', '#95626f', '#dc95a8', '#eceaed'], 
];
const bgColor = 0;
const pixelOverlap = 2;

function preload() {
  img.push(loadImage("./photos/20070804_pescao.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  imgIndex = 0;
  img[imgIndex].loadPixels();
  photoPixels = parseImage();

  paletteIndex = ~~(random() * photoPalettes.length);

  windowResized();
  drawEverything();
}

function drawEverything() {
  background(bgColor);
  push();
  translate(offsetX, offsetY);
  drawPhoto();
  pop();
}

function parseImage() {
  const initialX = (img[imgIndex].width - img[imgIndex].height) / 2;
  let allRowsPix = [];
  for (let y = 0; y < img[imgIndex].height; y++) {
    let rowPix = [];
    for (x = initialX; x < img[imgIndex].height + initialX; x++) {
      let pix = img[imgIndex].get(x, y);
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

function drawPhoto() {
  const pixelSize = sqSide/img[imgIndex].height;
  for (y = 0; y < img[imgIndex].height; y++) {
    for (x = 0; x < img[imgIndex].height; x++) {
      let pix = photoPixels[y][x];
      fill(photoPalettes[paletteIndex][pix]);
      rect(x * pixelSize, y * pixelSize, ~~pixelSize + pixelOverlap, ~~pixelSize + pixelOverlap);
    }
  }
  fill(bgColor);
  // Cover excess pixel-to-pixel overlap excess
  fill(0);
  rect(sqSide, 0, pixelOverlap, sqSide);
  rect(0, sqSide, sqSide, pixelOverlap);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sqSide = min(windowHeight, windowWidth);
  offsetX = ~~((windowWidth - sqSide) / 2);
  offsetY = ~~((windowHeight - sqSide) / 2);
  drawEverything();
}
