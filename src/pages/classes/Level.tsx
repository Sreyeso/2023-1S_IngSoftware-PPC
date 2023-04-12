import p5 from 'p5';
import Tile from './Tile';

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

  draw(xOffset: number, yOffset: number) {
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
        tile.draw(x, y, this.tile_size);
      }
    }
  }
}
