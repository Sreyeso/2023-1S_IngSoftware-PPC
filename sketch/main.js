let width; 
let height;      
let game=0;
let lvl; 

function preload() { 
  /*
  soundFormats('wav');
  s_zeta= loadSound('media/z.wav');
  s_equis= loadSound('media/x.wav');
  s_fin= loadSound('media/fin.wav');
  s_normal= loadSound('media/normal.wav');
  s_miss= loadSound('media/combobreak.wav');
  tutogame=loadImage('media/tutorialgame.png');
  tutoedit=loadImage('media/tutorialeditor.png');
  lvls =loadJSON('levels/levels.json');
  */
}
function windowResized() {
  width = windowWidth;
  height = windowHeight;
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background('tomato');
  width = windowWidth;
  height = windowHeight;
  lvl = new Level (10,6,
    [
    "0","0","0","0","0","0","0","0","0","0",
    "0","0","0","0","0","0","0","0","0","0",
    "0","0","0","0","0","0","0","0","0","0",
    "0","0","0","0","0","0","0","0","0","0",
    "0","0","0","0","0","0","0","0","0","0",
    "2","2","2","2","2","2","2","2","2","2"],
    70
  );
}

function draw() {
  background('tomato');
  lvl.draw();
}
