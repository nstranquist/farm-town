import {
  INITIAL_MIPMAP,
  expandLeft,
  expandRight,
  expandTop,
  expandBottom,
  buildPlot,
  clearPlot
} from '../farm/farm'
import { mipmapFixtures } from '../farm/fixtures'

describe("Farm Town's Farm", () => {
  describe("Farm Initialization", () => {
    it("generates the farm mipmap", () => {
      const mipmap = INITIAL_MIPMAP();

      expect(mipmap).toEqual(mipmapFixtures.initial)
    })
  })

  describe("Farm Expansion", () => {
    it("expands the farm to the left", () => {
      const mipmap = mipmapFixtures.expandLeft.before

      const newMipmap = expandLeft(mipmap)

      expect(newMipmap).toEqual(mipmapFixtures.expandLeft.after)
    })

    it("expands the farm to the right", () => {
      const mipmap = [
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
      ]

      const newMipmap = expandRight(mipmap)

      expect(newMipmap).toEqual([
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
      ])
    })
  })
})