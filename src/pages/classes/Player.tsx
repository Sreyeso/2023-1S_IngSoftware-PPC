import { type } from 'os';
import p5 from 'p5';

const gravity=0.15;
const jumpVelocity = -5;

export default class Player {
  // current position and size of the player
  x: number;
  y: number;
  vx:number=0;
  vy:number=0;
  width: number;
  height: number;
  isAlive:boolean=true;
  image:p5.Image;
  prevX: number;
  prevY: number;
  isJumping: boolean = false;
  jumps:number=2;
  // the p5 instance used for drawing
  p: p5;

  constructor(width: number, height: number, x: number, y: number,image:p5.Image, p: p5) {
    // initialize position and size
    this.width = width;
    this.height = height;
    this.x = this.prevX = x;
    this.y = this.prevY = y;
    this.image=image;
    // store the p5 instance
    this.p = p;
  }

  // move the player by dx and dy
  movePlayer(dx: number, dy: number) {
    // update the player's previous position
    this.prevX = this.x;
    this.prevY = this.y;
    // update the player's current position
    this.x += dx;
    this.y += dy;
  }

  // move the player by the means of gravity
  update() {
    // update the player's previous position
    this.prevX = this.x;
    this.prevY = this.y;
    this.vy += gravity;
    this.jump();
    // update the player's current position
    this.x += this.vx;
    this.y += this.vy;
  }

  jump(){
    if (this.isJumping && this.jumps!=0) {
      this.vy = jumpVelocity;
      this.jumps-=1;
      this.isJumping = false;
    }
  }

  // draw the player as a red rectangle (temporal)
  draw() {
    this.p.push();
      this.p.fill('red');
      this.p.rect(this.x, this.y, this.width, this.height);
      this.p.image(this.image,this.x, this.y, this.width, this.height);
    this.p.pop();
  }

  keyMovement(){
      if(this.p.keyIsDown(this.p.LEFT_ARROW)){
        this.movePlayer(-3,0);
      }
      if(this.p.keyIsDown(this.p.RIGHT_ARROW)){
        this.movePlayer(3,0);
      }
  }
}
