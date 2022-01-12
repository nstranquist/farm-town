
const INITIAL_WIDTH = 5;
const INITIAL_HEIGHT = 5;

export class Farm {
  constructor() {
    this.width = INITIAL_WIDTH;
    this.height = INITIAL_HEIGHT;
    this.mipmap = new Array(INITIAL_HEIGHT).fill(
      new Array(INITIAL_WIDTH).fill(0)
    )
  }

  // Add a column to the left/right of the mipmap
  // Width increments
  expandHorizontally(direction) {
    if(direction !== "left" && direction !== "right")
      throw new Error("Farm can only expand left/right horizontally")
    
    if(direction === "left") {
      this.mipmap = this.mipmap.map((row, i) => {
        return [0, ...row]
      })
    }
    if(direction === "right") {
      this.mipmap = this.mipmap.map((row, i) => {
        return [...row, 0]
      })
    }
      
    this.width += 1;
  }

  expandTop() {
    this.mipmap = [
      new Array(this.width).fill(0),
      ...this.mipmap
    ]
    
    this.height += 1;
  }

  expandBottom() {
    this.mipmap = [
      ...this.mipmap,
      new Array(this.width).fill(0)
    ]

    this.height += 1
  }
}
