import p5 from 'p5';
import Tile from './Tile';
export default class Level {
  rows: number;
  cols: number;
  tile_size: number;
  layout: Tile[][];
  p: p5;
  images: any[];
  levelWidth: number;
  levelHeight: number;

  constructor(parameters:{rows: number, cols: number, rawLayout: string[],tile_size: number, images: any[]}, p: p5) {
    this.rows = parameters.rows || 1;
    this.cols = parameters.cols || 1;
    this.tile_size = parameters.tile_size || 200;
    this.layout = []; 
    this.p = p;
    this.images = parameters.images || null;
    this.levelWidth = (this.cols) * this.tile_size;
    this.levelHeight = (this.rows) * this.tile_size;
    // create the layout
    this.layout=this.createLayout(parameters.rawLayout || ["000"]);
  }

  selectImage(code:string){
    switch(code){
      // level images order
      case("000"): return this.images[0];   // 0 - 000 - empty tile
      case("flo"): return this.images[1];   //1 - flo - floor tile
      case("fil"): return this.images[2];   //2 - fil - filler tile (goes under the floor tile)
      case("pla"): return this.images[3];   // 3 - pla - platform tile
      case("spi"): return this.images[4];   // 4 - spi - spike tile
      case("coi"): return this.images[5];   // 5 - coi - coin
      case("gem"): return this.images[6];   // 6 - gem - gem
      case("cll"): return this.images[7];   // 7 - cll - cloud left
      case("clr"): return this.images[8];   // 8 - clr - cloud right
      case("ds0"): return this.images[9];   // 9 - ds0 - decor small 0
      case("ds1"): return this.images[10];  // 10 - ds1 - decor small 1
      case("ds2"): return this.images[11];  // 11 - ds2 - decor small 2
      case("d00"): return this.images[12];  // 12 - d00 - decor big 0 down
      case("d01"): return this.images[13];  // 13 - d01 - decor big 0 up
      case("d10"): return this.images[14];  // 14 - d10 - decor big 1 down
      case("d11"): return this.images[15];  // 15 - d11 - decor big 1 up
      default: return this.images[16];      // 16 - error tile
    }
  }

  createLayout(rawLayout:string[]) {
    let matrix=[];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        // get the code for the current tile
        let code = rawLayout[i * this.cols + j];
        let image;
        // use the appropriate image for the tile based on its code
        if(this.images!=null){
          image=this.selectImage(code);
        }
        // create a new tile with the code and image
        let tile = new Tile(code, image, this.p);
        row.push(tile);
      }
      // add the row of tiles to the matrix
      matrix.push(row);
    }
    return matrix;
  }

  replaceLeftmostColumn(column:Tile[]){
    if(column!=undefined){
      for (let i = 0; i < this.rows; i++) {
        this.layout[i].shift(); // Remove the leftmost element from each row
        this.layout[i].push(column[i]); // insert a new element to the right of each row
      }
    }
  }

  drawBackground(xOffset: number, yOffset: number){
    this.p.push();
      this.p.noStroke();
      this.p.fill("lightskyblue");
      this.p.rect(xOffset,yOffset,this.levelWidth-this.tile_size,this.levelHeight);
    this.p.pop(); 
  }

  drawCorners(xOffset: number, yOffset: number){
    this.p.push();
      this.p.stroke("black");
      this.p.noFill();
      this.p.rect(xOffset,yOffset,this.levelWidth-this.tile_size,this.levelHeight);
    this.p.pop(); 
  }

  draw(xOffset: number, yOffset: number) {
    // draw each tile in the layout
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let x = xOffset + (j * this.tile_size);
        let y = yOffset + (i * this.tile_size);
        let tile = this.layout[i][j];
        tile.draw(x, y, this.tile_size);
      }
    }
  }

  grayScreen(xOffset: number, yOffset: number){
    this.p.push();
        this.p.fill(125,125);
        this.p.rect(xOffset,yOffset,this.levelWidth-this.tile_size,this.levelHeight);
    this.p.pop();
  }


}
