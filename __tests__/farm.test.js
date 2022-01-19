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
      const mipmap = mipmapFixtures.expandRight.before

      const newMipmap = expandRight(mipmap)

      expect(newMipmap).toEqual(mipmapFixtures.expandRight.after)
    })

    it("expands the farm to the top", () => {
      const mipmap = mipmapFixtures.expandTop.before

      const newMipmap = expandTop(mipmap)

      expect(newMipmap).toEqual(mipmapFixtures.expandTop.after)
    })

    it("expands the farm to the bottom", () => {
      const mipmap = mipmapFixtures.expandBottom.before

      const newMipmap = expandBottom(mipmap)

      expect(newMipmap).toEqual(mipmapFixtures.expandBottom.after)
    })

    // TODO: Error cases for exceeding a defined max width / height
  })

  describe("Farm Plot Actions", () => {
    it("builds a value on a specified plot of land", () => {
      let mipmap = mipmapFixtures.buildPlot.before
      const position1 = { x: 2, y: 2 }
      const position2 = { x: 1, y: 0 }
      const position3 = { x: 4, y: 3 }

      mipmap = buildPlot(mipmap, 5, 5, position1, 1)
      mipmap = expandLeft(mipmap)
      mipmap = buildPlot(mipmap, 6, 5, position2, 2)
      mipmap = expandTop(mipmap)
      mipmap = buildPlot(mipmap, 6, 6, position3, 3)

      console.log(mipmap)

      expect(mipmap).toEqual(mipmapFixtures.buildPlot.after)
    })
  })
})