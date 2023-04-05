class Tile {
  constructor(type) {
    this.type=type;
    this.color;
    this.image;
    this.isgif;
    this.initialize(type);
  }

  initialize(type) {
    if      (type==0) {this.color = "firebrick";this.image=img1;}
    else if (type==1) {this.color = "darkkhaki";this.image=img0;}
    else if (type==2) { this.color = "white";}
    else if (type==3) { this.color = "chartreuse";this.image=gif0;}
    else if (type==4) { this.color = "aquamarine";this.image=gif1;}
    else if (type==5) {this.color = "lightskyblue";}
    else if (type==6) { this.color = "lightsteelblue";}
    else              {this.color = "purple";}
  }

}
