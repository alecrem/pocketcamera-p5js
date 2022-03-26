// Variables to read images
let img = [], imgIndex, paletteIndex;
let photoPixels = [];
// Variables for a responsive square canvas
let offsetX, offsetY, sqSide;
// Constants used to draw the image
const photoPalettes = [
  // ['#404f11', '#6f8127', '#9fa83f', '#d0d059'], // Green DMG
  // https://lospec.com/palette-list/nintendo-gameboy-bgb
  ['#081820', '#346856', '#88c070', '#e0f8d0'], 
  // https://lospec.com/palette-list/2bit-demichrome
  ['#211e20', '#555568', '#a0a08b', '#e9efec'], 
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
  for (y = 0; y < img[imgIndex].height; y++) {
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
