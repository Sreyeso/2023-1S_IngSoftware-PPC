let width; 
let height;      
let game=0;
let lvl; 
let player;
let vel;

// Graphic assets
let img0;
let img1;

let gif0;
let gif1;

function preload() { 
  img0=loadImage('media/grass.png');
  img1=loadImage('media/dirt.png');

  gif0=loadImage('media/coin.gif');
  gif1=loadImage('media/gem.gif');
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
    "5","5","5","5","5","5","5","5","5","5",
    "5","5","5","5","5","5","5","5","5","5",
    "5","5","5","3","5","5","4","5","5","5",
    "5","5","5","5","5","5","5","5","5","5",
    "1","1","1","1","1","1","1","1","1","1",
    "0","0","0","0","0","0","0","0","0","0"],
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
      if (lvl.layout[i][j].type == 1) { // solid tile
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
