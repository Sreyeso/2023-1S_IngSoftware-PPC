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
      case("gra"): return this.images[0];
      case("dir"): return this.images[1];
      case("coi"): return this.images[2];
      case("gem"): return this.images[3];
      case("cll"): return this.images[4];
      case("clr"): return this.images[5];
      case("flo"): return this.images[6];
      case("psm"): return this.images[7];
      case("pbd"): return this.images[8];
      case("pbu"): return this.images[9];
      case("tsm"): return this.images[10];
      case("tbd"): return this.images[11];
      case("tbu"): return this.images[12];
      case("sto"): return this.images[13];
      case("spi"): return this.images[14];
      case("000"): return this.images[15];
      default: return this.images[16];
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

  death(xOffset: number, yOffset: number){
    this.p.push();
        this.p.fill(125,125);
        this.p.rect(xOffset,yOffset,this.levelWidth-this.tile_size,this.levelHeight);
    this.p.pop();
  }


}
