import p5 from 'p5';
import Tile from './Tile';

export default class Level {
  rows: number;
  cols: number;
  rawLayout: number[];
  size: number;
  layout: Tile[][];
  p: p5;
  images:any[];

  constructor(rows: number, cols: number, rawlayout: number[], size: number, p: p5,images: any[]) {
    this.rows = rows;
    this.cols = cols;
    this.rawLayout = rawlayout; 
    this.size = size;
    this.layout = []; 
    this.p = p;
    this.images=images;
    this.createLayout();
  }

  createLayout() {
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        let temp = this.rawLayout[i * this.cols + j];
        let tile = new Tile(this.p.int(temp));
        row.push(tile);
      }
      this.layout.push(row);
    }
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let x = (1/3)*this.p.width + (j * this.size);
        let y = (1/3)*this.p.height+ (i * this.size);
        let tile = this.layout[i][j];
        this.p.push();
          this.p.noStroke();
          this.p.fill("lightskyblue");
          this.p.rect(x, y, this.size, this.size);
          if      (tile.type==0)  {this.p.image(this.images[0], x, y,this.size,this.size);}   //grass
          else if (tile.type==1)  {this.p.image(this.images[1], x, y,this.size,this.size);}   //dirt
          else if (tile.type==2)  {this.p.image(this.images[2], x, y,this.size,this.size);}   //coin
          else if (tile.type==3)  {this.p.image(this.images[3], x, y,this.size,this.size);}   //gem
          else if (tile.type==4)  {this.p.image(this.images[4], x, y,this.size,this.size);}   //cloud_l
          else if (tile.type==5)  {this.p.image(this.images[5], x, y,this.size,this.size);}   //cloud_r
          else if (tile.type==6)  {this.p.image(this.images[6], x, y,this.size,this.size);}   //flowers
          else if (tile.type==7)  {this.p.image(this.images[7], x, y,this.size,this.size);}   //pine_small
          else if (tile.type==8)  {this.p.image(this.images[8], x, y,this.size,this.size);}   //pine_big_down
          else if (tile.type==9)  {this.p.image(this.images[9], x, y,this.size,this.size);}   //pine_big_up
          else if (tile.type==10) {this.p.image(this.images[10], x, y,this.size,this.size);}  //tree_small
          else if (tile.type==11) {this.p.image(this.images[11], x, y,this.size,this.size);}  //tree_big_down
          else if (tile.type==12) {this.p.image(this.images[12], x, y,this.size,this.size);}  //tree_big_up
          else if (tile.type==13) {this.p.image(this.images[13], x, y,this.size,this.size);}  //stone
          else if (tile.type==14) {this.p.image(this.images[14], x, y,this.size,this.size);}  //spikes
          else if (tile.type==-1) {}//
          else                    {this.p.image(this.images[15], x, y,this.size,this.size);}  //error
        this.p.pop();
      }
    }
  }
}
