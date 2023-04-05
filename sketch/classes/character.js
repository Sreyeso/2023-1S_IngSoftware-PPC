class Character{

    constructor(x,y){
    this.x=x;
    this.y=y;
    this.height=//height varia segun el tama;o;
    this.width=//width;
    this.img = rect(this.x, this.y, 55, 55);
    this.speed = 0.1/0.0016;
    this.estado="idle";
    }

    refreshSprite(){
     this.img = rect(this.x, this.y, 55, 55);  
    }

    moveChar(){
      this.x+=(1*this.speed);
      this.y+=(1*this.speed);
      this.refreshSprite();
    }
}