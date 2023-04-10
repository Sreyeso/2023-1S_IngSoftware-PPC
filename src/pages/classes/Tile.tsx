import p5 from 'p5';

export default class Tile {
  type: number;
  color: string;
  image: p5.Image | null;

  constructor(type: number) {
    this.type = type;
    this.color = "";
    this.image = null;
    this.initialize(type);
  }

  initialize(type: number) {
    if      (type===0) {this.color = "firebrick";}
    else if (type===1) {this.color = "darkkhaki";}
    else if (type===2) {this.color = "white";}
    else if (type===3) {this.color = "chartreuse";}
    else if (type===4) {this.color = "aquamarine";}
    else if (type===-1) {this.color = "lightskyblue";}
    else if (type===6) {this.color = "lightsteelblue";}
    else              {this.color = "purple";}
  }
}
