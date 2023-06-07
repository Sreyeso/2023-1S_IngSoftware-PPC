import p5 from 'p5';
import Tile from './Tile';
export default class Level {
  rows: number;
  cols: number;
  tile_size: number;
  layout: Tile[][];
  bg: any[] = [];
  p: p5;
  levelWidth: number;
  levelHeight: number;

  constructor(parameters:any|{rows: number, cols: number, initialLayout: string[],tile_size: number,initialImages:any}, p: p5) {
    this.rows = parameters.rows || 1;
    this.cols = parameters.cols || 1;
    this.tile_size = parameters.tile_size || 200;
    this.p = p;
    this.levelWidth = (this.cols) * this.tile_size;
    this.levelHeight = (this.rows) * this.tile_size;
    // create the  initial layout
    this.layout=this.createLayout(parameters.initialLayout,parameters.initialImages);
    for (let i=0;i<this.cols;i++){
      this.bg.push(parameters.initialImages[21]);
    }
  }

  selectImage(code:string){
    switch(code){
      case("000"): return 0;   //000 - empty tile
      case("flo"): return 1;   //flo - floor tile
      case("fil"): return 2;   //fil - filler tile (goes under the floor tile)
      case("pla"): return 3;   //pla - platform tile
      case("spb"): return 4;   //spb - spike tile bottom
      case("spl"): return 5;   //spl - spike tile left
      case("spr"): return 6;   //spr - spike tile right
      case("spt"): return 7;   //spt - spike tile top
      case("coi"): return 8;   //coi - coin
      case("gem"): return 9;   //gem - gem
      case("cll"): return 10;  //cll - cloud left
      case("clr"): return 11;  //clr - cloud right
      case("ds0"): return 12;  //ds0 - decor small 0
      case("ds1"): return 13;  //ds1 - decor small 1
      case("ds2"): return 14;  //ds2 - decor small 2
      case("d00"): return 15;  //d00 - decor big 0 down
      case("d01"): return 16;  //d01 - decor big 0 up
      case("d10"): return 17;  //d10 - decor big 1 down
      case("d11"): return 18;  //d11 - decor big 1 up
      case("sus"): return 19;  //sus - special filler tile (sus)
      default: return 20;      //error tile
    }
  }

  createLayout(rawLayout:string[],images:any) {
    let matrix=[];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        // get the code for the current tile
        let code = rawLayout[i * this.cols + j];
        // create a new tile with the code and image
        let tile = new Tile(code, images[this.selectImage(code)],this.p);
        row.push(tile);
      }
      // add the row of tiles to the matrix
      matrix.push(row);
    }
    return matrix;
  }

  drawCorners(xOffset: number, yOffset: number){
    this.p.push();
      this.p.stroke("black");
      this.p.noFill();
      this.p.rect(xOffset,yOffset,this.levelWidth-this.tile_size,this.levelHeight);
    this.p.pop(); 
  }

  draw(xOffset: number, yOffset: number) {  
    // // draw the background of the level
    for (let i = 0; i < this.cols; i++) {
      let x = xOffset + (i * this.tile_size);
      this.p.image(this.bg[i],x,yOffset,this.tile_size,this.levelHeight);
    }

    // draw each tile in the layout
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let x = xOffset + (j * this.tile_size);
        let y = yOffset + (i * this.tile_size);
        this.layout[i][j].draw(x, y, this.tile_size);
      }
    }
  }

  tintScreen(xOffset: number, yOffset: number,color:string){
    this.p.push();
        let tint = this.p.color(color);
        tint.setAlpha(175);
        this.p.fill(tint);
        this.p.rect(xOffset,yOffset,this.levelWidth-this.tile_size,this.levelHeight);
    this.p.pop();
  }


}
