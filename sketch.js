let img = [], imgIndex;
let offsetX, offsetY, sqSide;
const bgColor = 0;

function preload() {
  img.push(loadImage("./photos/20070804_pescao.png"));
}

function setup() {
  imgIndex = 0;
  img[imgIndex].loadPixels();
  createCanvas(windowWidth, windowHeight);
  windowResized();
  noStroke();
  drawEverything();
}

function draw() {
  // background(bgColor);
}

function drawEverything() {
  background(bgColor);
  push();
  translate(offsetX, offsetY);
  // rect(0, 0, sqSide, sqSide);
  drawPhoto();
  pop();
}
function drawPhoto() {
  const pixelSize = sqSide/img[imgIndex].width;
  console.log(pixelSize, pixelSize * img[imgIndex].width);
  push();
  photoOffsetY = sqSide * (1 - (img[imgIndex].height/img[imgIndex].width))/2;
  translate(0, photoOffsetY);
  for (y = 0; y < img[imgIndex].height; y++) {
    for (x = 0; x < img[imgIndex].width; x++) {
      let pix = img[imgIndex].get(x, y);
      fill(pix);
      rect(x * pixelSize, y * pixelSize, ~~pixelSize+2, ~~pixelSize+2);
    }
  }
  pop();
  fill(bgColor);
  rect(0, 0, sqSide, photoOffsetY);
  rect(0, sqSide - photoOffsetY, sqSide, photoOffsetY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sqSide = min(windowHeight, windowWidth);
  offsetX = ~~((windowWidth - sqSide) / 2);
  offsetY = ~~((windowHeight - sqSide) / 2);
  drawEverything();
}
