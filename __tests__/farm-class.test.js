import Farm from '../farm-class'
import { BUILDING_CODES } from '../farm-class/farm'


// Arrange, Act, Assert
// Zero, One, Many, Boundaries, Exceptions, Interface Definitions, Simple Solutions and Scenarios

describe("Farm Town's Farm", () => {
  let farm;

  beforeEach(() => farm = new Farm())

  describe("Farm initialization", () => {
    it("initializes farm with correct initial data structures", () => {
      expect(farm.width).toEqual(5)
      expect(farm.height).toEqual(5)
      expect(farm.mipmap).toEqual([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ])
    })
  })

  describe("Farm expansion", () => {
    beforeEach(() => farm = new Farm())

    it("expands 1 dimension to the left", () => {
      let prevWidth = farm.width;
      farm.expandLeft()

      expect(farm.width).toEqual(prevWidth + 1)

      expect(farm.mipmap).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ])
    })

    it("expands 1 dimension to the right", () => {
      let prevWidth = farm.width;
      farm.expandRight()

      expect(farm.width).toEqual(prevWidth + 1)

      // NOTE: hard to tell if adding new values correctly since all are 0's
      expect(farm.mipmap).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ])
    })

    it("expands 1 dimension to the top", () => {
      let prevHeight = farm.height;
      farm.expandTop()

      expect(farm.height).toEqual(prevHeight + 1)

      expect(farm.mipmap).toEqual([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ])
    })

    it("expands 1 dimension to the bottom", () => {
      let prevHeight = farm.height;
      farm.expandBottom()

      expect(farm.height).toEqual(prevHeight + 1)

      expect(farm.mipmap).toEqual([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ])
    })
  })

  describe("Farm Buy/Sell plots", () => {
    beforeEach(() => farm = new Farm())

    it("assigns a mipmap value to the farm at the provided index", () => {
      const buildingValue = 1; // "home"
      const plotPosition = {
        x: 1,
        y: 4
      }

      farm.buildPlot(plotPosition, buildingValue)
      expect(farm.mipmap).toEqual([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
      ])

      farm.buildPlot({x: 0, y: 1}, 2)
      expect(farm.mipmap).toEqual([
        [0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
      ])

      farm.buildPlot({x: 4, y: 4}, 5)
      expect(farm.mipmap).toEqual([
        [0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 5],
      ])
    })

    it("throws an appropriate error when position is out of bounds", () => {
      expect(() => farm.buildPlot({x: -1, y: 0}, 1)).toThrow()
      expect(() => farm.buildPlot({x: 6, y: 0}, 1)).toThrow()
      expect(() => farm.buildPlot({x: 0, y: 5}, 1)).toThrow()
      expect(() => farm.buildPlot({x: 0, y: -1}, 1)).toThrow()
    })

    it("throws an appropriate error when the building value is invalid", () => {
      expect(() => farm.buildPlot({x: 0, y: 0}, -1)).toThrow()
      expect(() => farm.buildPlot({x: 0, y: 0}, 0)).toThrow()
      expect(() => farm.buildPlot({x: 0, y: 0}, 101)).toThrow()
    })

    it("resets a specified plot of farm land to its initial state, 0", () => {
      farm.buildPlot({x: 0, y: 0}, 1)
      
      farm.clearPlot({x: 0, y: 0})

      expect(farm.mipmap[0][0]).toEqual(0)
    })

    it("throws an error when clearing an invalid plot position or value", () => {
      expect(() => farm.clearPlot({x: -1, y: 0})).toThrow()
      expect(() => farm.clearPlot({x: 5, y: 0})).toThrow()
      expect(() => farm.clearPlot({x: 0, y: -1})).toThrow()
      expect(() => farm.clearPlot({x: 0, y: 5})).toThrow()
      // should throw because cannot clear plot with value '0'
      expect(() => farm.clearPlot({x: 0, y: 0})).toThrow()
    })
  })
})