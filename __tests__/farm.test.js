import {
  INITIAL_MIPMAP,
  expandLeft,
  expandRight,
  expandTop,
  expandBottom,
  buildPlot,
  clearPlot
} from '../farm/farm'

describe("Farm Town's Farm", () => {
  describe("Farm Initialization", () => {
    it("generates the farm mipmap", () => {
      const mipmap = INITIAL_MIPMAP();

      console.log(mipmap)

      expect(mipmap).toEqual([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ])
    })
  })

  describe("Farm Expansion", () => {
    it("expands the farm to the left", () => {
      const mipmap = [
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
      ]

      const newMipmap = expandLeft(mipmap)

      expect(newMipmap).toEqual([
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
      ])
    })

    
  })
})