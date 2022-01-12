
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

  // Add a column to the left of the mipmap
  // Width increases, every item on the row gets shifted
  expandLeft() {
    // Add 0 to beginning of each subarray in farm mipmap
    const newMipMap = this.mipmap.map((row, i) => {
      return [0, ...row]
    })

    this.mipmap = newMipMap
    this.width += 1;
  }

  expandRight() {
    const newMipMap = this.mipmap.map((row, i) => {
      return [...row, 0]
    })

    this.mipmap = newMipMap
    this.width += 1;
  }
}
