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
  draw(x: number, y: number, tile_size: number) {
      if(this.image!=null && this.code!="111"){
        this.p.image(this.image, x, y, tile_size, tile_size); // Draw the tile image at the given position and size
      }
  }

}
