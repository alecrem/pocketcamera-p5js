let img = [], imgIndex;
let offsetX, offsetY, sqSide;
const bgColor = 0;
const pixelOverlap = 2;
let photoPixels = [];

function preload() {
  img.push(loadImage("./photos/20070804_pescao.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  imgIndex = 0;
  img[imgIndex].loadPixels();
  photoPixels = parseImage();
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
  const initialX = (img[imgIndex].width - img[imgIndex].height) / 2;
  for (y = 0; y < img[imgIndex].height; y++) {
    for (x = initialX; x < img[imgIndex].height + initialX; x++) {
      let pix = img[imgIndex].get(x, y);
      fill(pix);
      rect((x - initialX) * pixelSize, y * pixelSize, ~~pixelSize + pixelOverlap, ~~pixelSize + pixelOverlap);
    }
  }
  fill(bgColor);
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
