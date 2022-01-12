import {
  validateBuildPlot,
} from './farm-validator'

const INITIAL_WIDTH = 5;
const INITIAL_HEIGHT = 5;

// will update as new buildings are added
export const BUILDING_CODES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  11, 12, 13,
  21, 22, 23, 24, 25,
  31, 32,
  41, 42, 43, 44, 45, 46, 47
]

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
    validateBuildPlot(position, value, {
      width: this.width,
      height: this.height,
      BUILDING_CODES
    })

    let row = this.mipmap[position.y]
    this.mipmap[position.y] = [
      ...row.slice(0, position.x),
      value,
      ...row.slice(position.x + 1, row.length)
    ]
  }

  clearPlot(position) {
    if(position.x < 0 || position.x >= this.width)
      throw new Error("")
    if(position.y < 0 || position.y >= this.height)
      throw new Error("")
    if(this.mipmap[position.y][position.x] === 0)
      throw new Error("Cannot clear plot that is already at value 0")
    
    this.mipmap[position.y][position.x] = 0
  }
}
