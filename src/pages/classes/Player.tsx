import p5 from 'p5';

export default class Player {
  // current position and size of the player
  x: number;
  y: number;
  width: number;
  height: number;
  
  // previous position of the player
  prevX: number;
  prevY: number;
  
  // the p5 instance used for drawing
  p: p5;

  constructor(width: number, height: number, x: number, y: number, p: p5) {
    // initialize position and size
    this.width = width;
    this.height = height;
    this.x = this.prevX = x;
    this.y = this.prevY = y;
    
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

  // draw the player as a red rectangle (temporal)
  draw() {
    this.p.push();
        this.p.fill('red');
        this.p.rect(this.x, this.y, this.width, this.height);
    this.p.pop();
  }
}
