let width; 
let height;      
let game=0;
let lvl; 
let player;
let vel;

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
  lvl = new Level (6,10,
    [
    "0","0","0","0","0","0","0","0","0","0",
    "0","1","0","0","0","0","5","0","0","0",
    "0","0","0","0","0","0","0","0","0","0",
    "0","0","3","0","0","0","0","0","5","0",
    "0","0","0","0","0","0","0","0","0","0",
    "2","2","2","2","2","2","2","2","2","2"],
    70
  );
  player = {
    x: (1/3)*width + (lvl.cols/2)*lvl.size,
    y: (1/3)*height,
    width: 20,
    height: 20,
    prevX: 0,    // previous x position
    prevY: 0     // previous y position
  };
}

function movePlayer(dx, dy) {
  // update the player's previous position
  player.prevX = player.x;
  player.prevY = player.y;

  // update the player's current position
  player.x += dx;
  player.y += dy;
}

function handleCollisions() {
  // calculate the player's bounding box
  let playerLeft = player.x;
  let playerRight = player.x + player.width;
  let playerTop = player.y;
  let playerBottom = player.y + player.height;

  // loop through the grid array and check for collisions
  for (let i = 0; i < lvl.rows; i++) {
    for (let j = 0; j < lvl.cols; j++) {
      if (lvl.layout[i][j].type == 2) { // solid tile
        // calculate the bounding box of the tile
        let tileLeft = (1/3)*width + (j * lvl.size);
        let tileRight = (1/3)*width +(j * lvl.size + lvl.size);
        let tileTop = (1/3)*height+ (i * lvl.size);
        let tileBottom = (1/3)*height+(i * lvl.size + lvl.size);

        // check if the player's bounding box overlaps with the tile's bounding box
        if (playerLeft < tileRight && playerRight > tileLeft && playerTop < tileBottom && playerBottom > tileTop) {
          // there is a collision!
          // reset the player's position to their previous position
          player.x = player.prevX;
          player.y = player.prevY;
        }
      }
    }
  }
}

function draw() {
  background('tomato');
  lvl.draw();
  push();
    fill('red');
    rect(player.x, player.y, player.width, player.height);
  pop();
  movePlayer(0,2);
  handleCollisions();
}
