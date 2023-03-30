class Level {

  constructor(rows, cols, rawlayout, size) {
    this.rows = rows;
    this.cols = cols;
    this.rawLayout = rawlayout; 
    this.size = size;
    this.layout = []; 
    this.createLayout();
  }

  createLayout() {
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        let temp = this.rawLayout[i * this.cols + j];
        let tile = new Tile(int(temp[0]), int(temp[1]), temp[2]);
        row.push(tile);
      }
      this.layout.push(row);
    }
  }

  draw() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let x = (1/3)*width + (j * this.size);
        let y = (1/3)*height+ (i * this.size);
        let tile = this.layout[i][j];
        push();
          noStroke();
          fill(tile.color);
          rect(x, y, this.size, this.size);
        pop();
      }
    }
  }

}
