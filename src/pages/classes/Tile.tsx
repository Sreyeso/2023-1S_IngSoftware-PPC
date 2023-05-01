import p5 from 'p5';

// Define a class for each tile
export default class Tile {
  code: string;
  image: p5.Image;
  p: p5;

  // Constructor for the Tile class
  constructor(code: string, image: p5.Image, p5: p5) {
    this.code = code; // Each tile has a unique code to identify it
    this.image = image; // The image used to display the tile
    this.p = p5; // The p5 instance used to draw the tile
  }
  
  // Method to draw the tile at a given position and size
  draw(x: number, y: number, tile_size: number,debug:boolean) {
    this.p.image(this.image, x, y, tile_size, tile_size); // Draw the tile image at the given position and size


    // show hitboxes 
    if(debug){
      this.p.push();
      this.p.noStroke();
      this.p.fill(255,0,0,125);
      switch(this.code){
  
        case("gra"): 
        case("sto"):
          this.p.rect(x,y,tile_size,tile_size);  
        break;
  
        case("spi"):
          let ajustey=(tile_size*0.27);
          this.p.rect(x,y+ajustey,tile_size,tile_size-ajustey);  
        break;
  
        case("coi"):
        case("gem"):
          this.p.ellipseMode(this.p.CENTER);
          let middle=tile_size*0.5;
          this.p.ellipse(x+middle,y+middle,tile_size*0.8,tile_size*0.8);  
        break;
  
        default:  break;
      }
      this.p.pop();
    }
    
  }
}
