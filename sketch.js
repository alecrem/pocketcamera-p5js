// Variables to read images
let imgIndex, paletteIndex;
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
// Image data
const img = [
  ["z////vAAAURuq+bqh6qum4r+LAAAAAQl6PR6cL","z/////eAAAVv6qqqhmvquq7rqAAAAAAAAAAAAA","z///////EAi+Xqr6Wpjurub6aMAABAAAAAAAAA","z////////KhqpqKqurmaKhqqqKAAAAAAAAAAAA","z/////////Wua8bqm6r5J1r5neAUAAAAAAAAAA","z//////////q256vqpZaJmqqqaEFAAAAAAAAAA","z//+r//////4q9ruXpXZJOj6b6FAAAAABAAAAA","z//am//////qa+76qomaKaiaqqJAAAAAAAAAAA","z/bYj//////6q6b4nJWpWpmuXuDAAABEBAAAAA","zrJAi//////qqqqJ7WmmmqqqqqqAAAAAAAAAAA","juBAi/////v+m6Lpm2WZWpburumEAAAQAAAAAA","iEAAi//////mqYTagpWaWqqq7pSIAAAAAAAAAA","CAAAi/////vpqOSJg+SpR5W+npSIAABAAAAAAA","AAAAh//////lpalWjmYWSpqVmqVKAAAEAAAAAA","AAAAS//////5i+a1p5LBSpXoquWKAAAQAAAAAA","AAAAi//////qepmpa2yFhpmlqqWaAQAAAAAAAA","AAAES/////vurqp0r5SYSpWtG5qtAQAAAAAAAA","AAAUi/////ua2qrWapYZFVZqpqqoEQAAAAAAAA","AQSpS/////v+VuW8EZGpSsW5q5WpEQBQAAAAAA","AARal//////quKmWJWSGBimqQppqJAAAAAAAAA","AUBZS/////fvr9ntTYSZC0mJA9EeGAAQAAAAAA","AABVl/////vqduqqYZRFVkqFQpJnGAAAAAAAAA","BUCoR/////vuKuW4XhCpCpmpVpm6aAAAAAAAAA","BUAlk/////uqNqqJqVmZUoZSmqpppAAAAAAAAA","CkBUV/////v+GqBuXYnZGJClW5WImYAAAAAAAA","iZUUU/////ufspSWKJqoSAiimVmoqJAAAAAAAA","SpFkC/////fuboGImFTpWVGpaqjtbNAAAAAAAA","SZZaF3////fq2qSJJYzitpGkqqqqqLAAAAAAAA","jpWZWw/////eBtVqC6b+alRorur+neAAAAAAAA","iqVZV4/////9hpZWRpzqJWgmq6uq6aAAAAAAAA","jtWpWo////vuZcGoC2w9rqKwrur+r+AAAAAAAA","iqWpVo/////mWoShiZjv+jKhqrrcqqEAAAAAAA","j+ruWY////v+HYFIn8Fp3xq6r+ruUqIAAAAAAA","iqqqaV7///vq0VRgpMMw++Oq65uqqq7OAAAAAA","Tpnur+7///vpKYBkXJNuv4Iubqrpq52PAAAAAA","AAAAh//////JWlEkXfjqnqcoaKhqpQ2LAAAAAA","AAAAA1r+rureC+LAh8gdz+IuaomuX0WeAAAAAE","AAAAAAAAAAyvo3rWrVOv87qqqlqqqlZLAAAAAA","AAAAAAAAAEjuV/nmXo3GvuW+Kum5mpG+AAAAAA","AAAAAAAAAAyt1vuspIp+nWqqqqmqqaF87EAAAA","AAAAAAAAAATuW+r9jKT8buqqWpb+LZSZzMAQBE","AAAAAAAAAARui3WhJFqqOrpqqqqruVVEyPAABG","AAAAAAAAAARej+vxqoj5ntb5W+q6rpWEC6AABJ","AAAAAAAAAAQeuquqKSLKvtJkqqqqqaVARVAAQK","AAAAAAAAAAA+PqqsD5bsY9apXZWum5BICEAAAI","AAAAAAAAAAAa5yhvlv8leWmpqpqqaWUVBAAARA","AAAAAAAAAAA+nvm+qND+X8GpnpXeVtFkAAAABI","AAhJAAAAAAA2+63kem2ruIkqmWmaqqJVIrAUQE","CkXvAAAAAAA9beruj5m/i4msb5nunpGUDrBpKF","hqqWJAAAAAAirqqr3R6veKapyqqq6qZlWZVqqF","S6rlBQAAAAAwasr9n4TwIuXuW+a5r+W5bpm9ZO","QQraVEAAAAAgXcib6QKiNoqmqqkmqq6mqZFRRL","BkgonUBAAQBgb8v+rwULTZWOVurqm6rqreAABF","SEJQJWAAAREgLaifrndbWhZqqqqq6quamaAARE","AJTwA5IAQcEoLui4feH4m/FEa9rur+L+WdAQRI","iKAFiRLAGhpZeqgn91gA7/+vrvv/O/tpaJEAhE","BwrICgSUC/GAb4O+jQTgz/q+7+r+r+btWYAQWE","AEASRUAqWAAA+QuX+JJV9/vvu77//qqmZUAARE","B0n0AdhwJABE7sH/mJD1X/fvv9r/runtFUAAAA","AJAIJAAiKAAA/b3VbLnSw7v9mr7/7vumFFAAAA","SABBh4CchEAEj+f6zZrZQ6r+r67+7/quGEAAAA","AQEgESBVRIAAzv+vitiHAoqbyy+//utgKAAAAA","AIApFFCwmJBAKvn+pOKhANn6War+/fbpaEAAAE","AASACBEGBqAy//+6P23wZOarp7+////aaAAAAA","BQFAAVBsBgFu//nh6eb6JtL9qu/+//vvaCAAAA","ARAVEgBHCaxfz+/xqOikpqZl3y/////rpXAAAA","BIBABQGwa+//vL/6v5C9ruSVnxv////+a6AAAB","AABARASq/vu767M/ev8LAUBZ577/////q4EAAC","AAAlAor+r+rty//8r7r8QQSoD/7///v/qZEAAK","BAAAAl6qqqupxv/r/K+zaYJg7z/////v6eAAQF","AIBAA5r+r+rpU//Nv+rujpSet/f///v+fuAAAE","ABAQqr66q+qqB//b7/P/PMX/3//9+//rrfAAAE","AQAhn+r+r+rtG///z8L9zMi+v///////vuAAAE","hAAlqq+r7ruqZ7//8v+4/7nv/Lvv/////KOAhE","AES5a+r+r+r+b/7/7+b/r+e////j7///ftPACK","AQVqqq+qqq6qqrz/MH/3+3/////////7uZfAqP","BQWur9r+r6r+r63/f9z/zp7///v//+r2q+IARO","ARmqqquq6qu6r67///y//7z7/v/7//q/vqIAAF","Akn+r+q+r+r+r+//v///u7/8////7/7/ruEABE","AQqqqqrrqqq6+O7////vP46//q//v////uEQVB","BkW+n5qun5r+rIy/////vqruw///76//ruIABE","AQWqlpqpaqqvuAv/////++I5//+//5/rqqIAAA","AASpW5Wum9r+K077////Iw///+v///rubtEAAA","AAAQVamamqqqaw///+/M0//3/+7/7/uVSmIAAA","AAAQCoWpW9adFwq+7//yP//67/2+ruAAAwEAAA","AAAEAQVamZFAhYE///P//7+/P6///EAAQAAAAA","AQAAAABUFUy9////r/P///v6r777IAAQR/IAAA","AAAABEAEAQyb7/////P///q//veAAAAh//NAAA","AEAAAEAEAAK6q+r+r/////i/7NAAAQ7///OAAA","AQAAAAAAAQeW/6qqqv/t///yNg////////MAAA","AABAAABAAgbkn+r5q+7////uA///////v/MAAA","AAAAAAAAAQqqK/qqq/////94////////+6MAAA","AEAAAAAAAgSpm/etl+v9v+L///////v/v6AAAA","AQAAAAAR2//7/7v7/vO3/q9//////vnvvKAAAA","AAAAAwroFpn+rpW7e5L67vwtr+3//v3+aJAABA","AAAAA7/YBQqqqqa/yv7q/////v67///qJAAAAA","AUAAA/vAApWtXum/vuW/Jw7/////v+rpBAAABE","AAAAQ/NABmVVmqq//7+Z//uq7a/qqlZAAAAAQA","AABAg/KgGprtWpm///ruAQBlXpBpJEAAAAAAAE","AAAAg/NVAlmqWpK//v7upvaml77/NEAAAAAAAA","AAAAh/eERpapGpa/7+//KUCYV/7+XAQOAAAAAA","AAAAj/eQmqqqmlZ3/7u7uhZlF2/qq2rFAAAAAA","AABAi6epWqnpWoX4//7+rorpm/vV7/rBAAAABE","AAAAgK7vZZmlZZma/////JSl77q0///BAAAAAA","AAAAA/R/blWpWpW+z//+rtm+//b7///ZAAAQBE","AAAAhkaV3paVWZqrq//v/paq/v3/q//LEAAABB","AAAAAdB62tXpWpX+r//+7uWUR1v/7///rIAQBF","AAAAAAhq7falVam7N6///qalq/f3/////EAAVF","AAAAAURu7/Wpmtm+Lk7+v5J5///u3///fIAURJ","AAAAAJBm7vqq6qq/dgPze7uu7//eF///+EAARG","AAAAAZB6//a5run+Mg//v+v+r//pl//vTKBUBJ","AAAAAVR6/vqqqa2/IE3//7/q7//u6//qeKAAVF"],
];
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  imgIndex = 0;
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
  let allPixels = [];
  const pixelsPerChar = 3;
  const bitsPerPixel = 2;
  // console.log('row length', img[imgIndex][0].length, img[imgIndex][0].length * 3);
  for (let y = 0; y < img[imgIndex].length; y++) {
    let row = [];
    for (let x = img[imgIndex][y].length - 1; x >= 0; x--) {
      const theChar = b64ToUint6(img[imgIndex][y].charCodeAt(x));
      let z = theChar;
      const pixel2 = z % 4;
      z >>= 2;
      const pixel1 = z % 4;
      z >>= 2;
      const pixel0 = z % 4;
      if(x !== img[imgIndex][y].length - 1) {
        row.push(pixel0);
      }
      row.push(pixel2);
      row.push(pixel1);
    }
    allPixels.push(row);
  }
  return allPixels;
}

function drawPhoto() {
  const pixelSize = sqSide/photoPixels.length;
  for (y = 0; y < photoPixels.length; y++) {
    for (x = 0; x < photoPixels[0].length; x++) {
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

const b64ToUint6 = (nChr) => {
  return nChr > 64 && nChr < 91 ?
      nChr - 65
    : nChr > 96 && nChr < 123 ?
      nChr - 71
    : nChr > 47 && nChr < 58 ?
      nChr + 4
    : nChr === 43 ?
      62
    : nChr === 47 ?
      63
    :
      0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sqSide = min(windowHeight, windowWidth);
  offsetX = ~~((windowWidth - sqSide) / 2);
  offsetY = ~~((windowHeight - sqSide) / 2);
  drawEverything();
}
