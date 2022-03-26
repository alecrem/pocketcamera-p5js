let img = [], imgIndex;
let offsetX, offsetY, sqSide;
const bgColor = 0;

function preload() {
  img.push(loadImage("./photos/20070804_pescao.png"));
}

function setup() {
  imgIndex = 0;
  img[imgIndex].loadPixels();
  // console.log(img[imgIndex].get(0, img[imgIndex].height - 1));
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
  const pixelSize = sqSide/img[imgIndex].height;
  initialX = (img[imgIndex].width - img[imgIndex].height) / 2;
  for (y = 0; y < img[imgIndex].height; y++) {
    for (x = initialX; x < img[imgIndex].height + initialX; x++) {
      let pix = img[imgIndex].get(x, y);
      fill(pix);
      rect((x - initialX) * pixelSize, y * pixelSize, ~~pixelSize+2, ~~pixelSize+2);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sqSide = min(windowHeight, windowWidth);
  offsetX = ~~((windowWidth - sqSide) / 2);
  offsetY = ~~((windowHeight - sqSide) / 2);
  drawEverything();
}
