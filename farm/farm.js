
const INITIAL_WIDTH = 5;
const INITIAL_HEIGHT = 5;

export class Farm {
  constructor() {
    this.width = INITIAL_WIDTH;
    this.height = INITIAL_HEIGHT;
    this.mipmap = new Array(INITIAL_WIDTH * INITIAL_HEIGHT).fill(0)
  }

  // Add a column to the left of the mipmap
  // Width increases, every item on the row gets shifted
  expandLeft() {
    const expansion = new Array(this.height).fill(0)
    this.mipmap = [...this.mipmap, ...expansion]
    
    this.width += 1;
  }
}
