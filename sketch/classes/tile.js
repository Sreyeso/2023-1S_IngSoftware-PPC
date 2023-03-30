class Tile {

  constructor(type) {
    this.color;
    this.initialize(type);
  }

  initialize(type) {
    if      (type==0) {this.color = "lightsteelblue";}
    else if (type==1) {this.color = "white";}
    else if (type==2) {this.color = "darkkhaki";}
    else if (type==3) {this.color = "chartreuse";}
    else if (type==4) {this.color = "aquamarine";}
    else if (type==5) {this.color = "lightskyblue";}
    else if (type==6) {this.color = "firebrick";}
    else              {this.color = "purple";}
  }

}
