import { type } from 'os';
import p5 from 'p5';

export default class Player {
  // current position and size of the player
  x: number;
  y: number;
  vleft:number=0;
  vright:number=0;
  vy:number=0;
  width: number;
  height: number;
  isAlive:boolean=true;
  image:p5.Image;
  prevX: number;
  prevY: number;
  isJumping: boolean = false;
  gravity:number;
  jumpVelocity:number;
  defaultJumps:number;
  jumps:number;
  speed:number;
  rightCollisionFlag:boolean=false;

  coins:number;
  gems:number;

  // the p5 instance used for drawing
  p: p5;
//
  constructor(parameters:{width:number,height:number,gravity:number,jumpVelocity:number,jumps:number,speed:number,initialX:number,initialY:number,image:any,coins:number,gems:number}, p: p5) {
    // initialize position and size
    this.width = parameters.width || 20;
    this.height = parameters.height || 20;

    //Initialize player variables
    this.gravity=parameters.gravity || 0.15;
    this.jumpVelocity=parameters.jumpVelocity || -5;
    this.defaultJumps=parameters.jumps || 1;
    this.speed=parameters.speed || this.gravity*7;
    this.jumps=0;
    this.vleft=-this.speed;
    this.vright=this.speed;

    this.x = this.prevX = parameters.initialX || 0;
    this.y = this.prevY = parameters.initialY || 0;
    this.image=parameters.image || null;

    this.coins=parameters.coins || 0;
    this.gems=parameters.gems || 0;
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
    this.vy += this.gravity;
    this.jump();
    // update the player's current position
    this.y += this.vy;
  }

  jump(){
    if (this.isJumping && this.jumps!=0) {
      this.vy = this.jumpVelocity;
      this.jumps-=1;
      this.isJumping = false;
    }
  }

  // draw the player as a red rectangle (temporal)
  draw() {
    this.p.push();
      this.p.fill('red');
      this.p.rect(this.x, this.y, this.width, this.height);
      if(this.image && this.isAlive){
        this.p.image(this.image,this.x, this.y, this.width, this.height);
      }
    this.p.pop();
  }

  keyMovement(){
      if(this.p.keyIsDown(this.p.LEFT_ARROW)){
        this.movePlayer(this.vleft,0);
      }
      if(this.p.keyIsDown(this.p.RIGHT_ARROW)){
        this.movePlayer(this.vright,0);
      }
      // if(this.p.keyIsDown(this.p.UP_ARROW)){
      //   this.movePlayer(0,-3);
      // }
      // if(this.p.keyIsDown(this.p.DOWN_ARROW)){
      //   this.movePlayer(0,3);
      // }

      
  }
}
