import {
  expandLeft,
  expandRight,
  expandTop,
  expandBottom,
  buildPlot,
  clearPlot,
  INITIAL_MIPMAP
} from '../farm/farm'
import { mipmapFixtures } from '../farm/fixtures'

describe("Farm Town's Farm", () => {
  const WIDTH = 5
  const HEIGHT = 5

  describe("Farm Initialization", () => {
    it("generates the farm mipmap", () => {
      const mipmap = INITIAL_MIPMAP;

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

      mipmap = buildPlot(mipmap, WIDTH, HEIGHT, position1, 1)
      mipmap = expandLeft(mipmap)
      mipmap = buildPlot(mipmap, 6, HEIGHT, position2, 2)
      mipmap = expandTop(mipmap)
      mipmap = buildPlot(mipmap, 6, 6, position3, 3)

      expect(mipmap).toEqual(mipmapFixtures.buildPlot.after)
    })
  })

  it("throws an appropriate error when position is out of bounds", () => {
    const mipmap = mipmapFixtures.initial

    expect(() => buildPlot(mipmap, WIDTH, HEIGHT, {x: -1, y: 0}, 1)).toThrow()
    expect(() => buildPlot(mipmap, WIDTH, HEIGHT, {x: 6, y: 0}, 1)).toThrow()
    expect(() => buildPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: 5}, 1)).toThrow()
    expect(() => buildPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: -1}, 1)).toThrow()
  })

  it("throws an appropriate error when the building value is invalid", () => {
    const mipmap = mipmapFixtures.initial

    expect(() => buildPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: 0}, -1)).toThrow()
    expect(() => buildPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: 0}, 0)).toThrow()
    expect(() => buildPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: 0}, 101)).toThrow()
  })

  it("resets a specified plot of farm land to its initial state, 0", () => {
    let mipmap = mipmapFixtures.initial

    mipmap = buildPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: 0}, 1)

    expect(mipmap).not.toEqual(mipmapFixtures.initial)

    mipmap = clearPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: 0})

    expect(mipmap).toEqual(mipmapFixtures.initial)
  })

  it("throws an error when clearing an invalid plot position or value", () => {
    const mipmap = mipmapFixtures.initial;

    expect(() => clearPlot(mipmap, WIDTH, HEIGHT, {x: -1, y: 0})).toThrow()
    expect(() => clearPlot(mipmap, WIDTH, HEIGHT, {x: 5, y: 0})).toThrow()
    expect(() => clearPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: -1})).toThrow()
    expect(() => clearPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: 5})).toThrow()
    // should throw because cannot clear plot with value '0'
    expect(() => clearPlot(mipmap, WIDTH, HEIGHT, {x: 0, y: 0})).toThrow()
  })
})