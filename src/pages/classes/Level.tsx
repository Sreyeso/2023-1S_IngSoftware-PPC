import p5 from 'p5';
import Tile from './Tile';
import Player from './Player';
const DEBUG = true;
export default class Level {
  rows: number;
  cols: number;
  rawLayout: string[];
  tile_size: number;
  layout: Tile[][];
  p: p5;
  images: any[];
  levelWidth: number;
  levelHeight: number;

  constructor(rows: number, cols: number, rawlayout: string[], tile_size: number, images: any[], p: p5) {
    this.rows = rows;
    this.cols = cols;
    this.rawLayout = rawlayout; 
    this.tile_size = tile_size;
    this.layout = []; 
    this.p = p;
    this.images = images;
    this.levelWidth = this.cols * this.tile_size;
    this.levelHeight = this.rows * this.tile_size;

    // create the layout
    this.createLayout();
  }

  createLayout() {
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        // get the code for the current tile
        let code = this.rawLayout[i * this.cols + j];
        let image;

        // use the appropriate image for the tile based on its code
        switch(code){
          case("gra"): image=this.images[0]; break;
          case("dir"): image=this.images[1]; break;
          case("coi"): image=this.images[2]; break;
          case("gem"): image=this.images[3]; break;
          case("cll"): image=this.images[4]; break;
          case("clr"): image=this.images[5]; break;
          case("flo"): image=this.images[6]; break;
          case("psm"): image=this.images[7]; break;
          case("pbd"): image=this.images[8]; break;
          case("pbu"): image=this.images[9]; break;
          case("tsm"): image=this.images[10]; break;
          case("tbd"): image=this.images[11]; break;
          case("tbu"): image=this.images[12]; break;
          case("sto"): image=this.images[13]; break;
          case("spi"): image=this.images[14]; break;
          case("000"): image=this.images[15]; break;
          default: image=this.images[16]; break;
        }
        
        // create a new tile with the code and image
        let tile = new Tile(code, image, this.p);
        row.push(tile);
      }
      // add the row of tiles to the layout
      this.layout.push(row);
    }
  }

  draw(xOffset: number, yOffset: number,debug:boolean) {
    this.p.push();
      this.p.noStroke();
      this.p.fill("lightskyblue");
    // draw the background of the level
      this.p.rect(xOffset, yOffset, this.levelWidth, this.levelHeight);
    this.p.pop();
    // draw each tile in the layout
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let x = xOffset + (j * this.tile_size);
        let y = yOffset + (i * this.tile_size);
        let tile = this.layout[i][j];
        tile.draw(x, y, this.tile_size,debug);
      }
    }
  }

  handleCollisions= (player:Player,xOffset:number,yOffset:number) => {
    // calculate the player's bounding box
    let playerLeft = player.x;
    let playerRight = player.x + player.width;
    let playerTop = player.y;
    let playerBottom = player.y + player.height;

    // add the player's velocity to their position
    let newPlayerLeft = playerLeft + player.vx;
    let newPlayerRight = playerRight + player.vx;
    let newPlayerTop = playerTop + player.vy;
    let newPlayerBottom = playerBottom + player.vy;

    let tileLeft ;
    let tileRight;
    let tileTop;
    let tileBottom;
    // loop through the grid array and check for collisions
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {

        switch(this.layout[i][j].code){

          case("gra"): 
          case("sto"):
            // calculate the bounding box of the tile with a buffer 
            tileLeft = xOffset + (j * this.tile_size);
            tileRight = xOffset +((j+1) * this.tile_size);
            tileTop = yOffset+ (i * this.tile_size);
            tileBottom = yOffset+((i+1) * this.tile_size);
    
            // check if the player's bounding box overlaps with the tile's bounding box
            if (newPlayerLeft < tileRight && newPlayerRight > tileLeft && newPlayerTop < tileBottom && newPlayerBottom > tileTop) {
              
                  let overlapLeft = Math.max(newPlayerLeft, tileLeft);
                  let overlapRight = Math.min(newPlayerRight, tileRight);
                  let overlapTop = Math.max(newPlayerTop, tileTop);
                  let overlapBottom = Math.min(newPlayerBottom, tileBottom);
                  let overlapWidth = overlapRight - overlapLeft;
                  let overlapHeight = overlapBottom - overlapTop;

                  // determine the direction of the collision
                  let direction;
                  
                  //DEBUG
                  if (DEBUG) console.log('OW: '+overlapWidth);
                  if (DEBUG) console.log('OH: '+overlapHeight);
                  if (DEBUG) console.log('Nya');
                  if (DEBUG) console.log('');


                  if (overlapWidth < overlapHeight) {
                    //Esas const son el bandaid al bugazo, cambiar a un porcentaje basado en las tiles
                    direction = overlapLeft-10 < newPlayerLeft ? "left" : "right";
                  } else {
                    direction = overlapTop < newPlayerTop+10 ? "up" : "down";
                  }

                // adjust the player's position based on the overlap and direction of the collision
                switch (direction) {
                  case "left":
                    if (DEBUG) console.log('Nya');
                    player.x += overlapWidth - player.vx;
                    break;
                  case "right":
                    if (DEBUG) console.log('Goode');
                    player.x -= overlapWidth - player.vx;
                    break;
                  case "up":
                    if (DEBUG) console.log('Bure');
                    player.y += overlapHeight - player.vy;
                    player.vy = 0;
                    break;
                  case "down":
                    player.y -= overlapHeight - player.vy;
                    player.jumps=2;
                    player.vy = 0; // reset the player's vertical velocity
                    break;
                }
            }
          break;

          case("spi"):
            // calculate the bounding box of the tile
            tileLeft = xOffset + (j * this.tile_size);
            tileRight =  xOffset +((j+1) * this.tile_size);
            tileTop = yOffset+ (i * this.tile_size)+(0.28*this.tile_size);
            tileBottom = yOffset+((i+1) * this.tile_size);

            // check if the player's bounding box overlaps with the tile's bounding box
            if (newPlayerLeft < tileRight && newPlayerRight > tileLeft && newPlayerTop < tileBottom && newPlayerBottom > tileTop) {
              // there is a collision!
              // reset the player's position to their previous position
                let overlapLeft = Math.max(newPlayerLeft, tileLeft);
                let overlapRight = Math.min(newPlayerRight, tileRight);
                let overlapTop = Math.max(newPlayerTop, tileTop);
                let overlapBottom = Math.min(newPlayerBottom, tileBottom);
                let overlapWidth = overlapRight - overlapLeft;
                let overlapHeight = overlapBottom - overlapTop;
      
                // determine the direction of the collision
                let direction;
                
                if (overlapWidth < overlapHeight) {
                  direction = overlapLeft < newPlayerLeft ? "left" : "right";
                } else {
                  direction = overlapTop < newPlayerTop ? "up" : "down";
                }

                // adjust the player's position based on the overlap and direction of the collision
                switch (direction) {
                  case "left":
                    player.x += overlapWidth - player.vx;
                    break;
                  case "right":
                    player.x -= overlapWidth - player.vx;
                    break;
                  case "up":
                    player.y += overlapHeight - player.vy;
                    break;
                  case "down":
                    player.y -= overlapHeight - player.vy;
                    player.vy = 0; // reset the player's vertical velocity
  
                    break;
                }
              /* Death triggers */
              player.isAlive=false;
            }
          break;
    
          case("coi"):
          case("gem"):
            // calculate the center and radius of the ellipse
            let centerX = xOffset + (j * this.tile_size) + (this.tile_size * 0.5);
            let centerY = yOffset+ (i * this.tile_size) + (this.tile_size * 0.5);
            let radiusX = this.tile_size * 0.35;
            let radiusY = this.tile_size * 0.35;

            // check if the player's bounding box overlaps with the tile's ellipse
            if (playerLeft < centerX + radiusX && playerRight > centerX - radiusX && playerTop < centerY + radiusY && playerBottom > centerY - radiusY) {
              this.layout[i][j].code="000";
              this.layout[i][j].image=this.images[15];
            }
          break;
    
          default:  break;
        }
      }
    }
  }

}
