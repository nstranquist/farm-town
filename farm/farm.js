
const INITIAL_WIDTH = 5;
const INITIAL_HEIGHT = 5;

// temp
const MAX_CODE = 100

export class Farm {
  constructor() {
    this.width = INITIAL_WIDTH;
    this.height = INITIAL_HEIGHT;
    this.mipmap = new Array(INITIAL_HEIGHT).fill(
      new Array(INITIAL_WIDTH).fill(0)
    )
  }

  expandLeft() {
    this.mipmap = this.mipmap.map((row, i) => {
      return [0, ...row]
    })
      
    this.width += 1;
  }

  expandRight() {
    this.mipmap = this.mipmap.map((row, i) => {
      return [...row, 0]
    })

    this.width += 1
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

  buildPlot(position, value) {
    if(position.x < 0 || position.x > this.width)
      throw new Error("Farm position x is out of bounds")
    if(position.y < 0 || position.y > this.height)
      throw new Error("Farm position y is out of bounds")

    let row = this.mipmap[position.y]
    this.mipmap[position.y] = [
      ...row.slice(0, position.x),
      value,
      ...row.slice(position.x + 1, row.length)
    ]
  }
}
