import Farm from '../farm'


// Arrange, Act, Assert
// Zero, One, Many, Boundaries, Exceptions, Interface Definitions, Simple Solutions and Scenarios

describe("Farm Town's Farm", () => {
  let farm;

  beforeEach(() => {
    farm = new Farm()
  })

  describe("Farm initialization", () => {
    it("initializes farm with correct initial data structures", () => {
      expect(farm.width).toEqual(5)
      expect(farm.height).toEqual(5)
      expect(farm.mipmap).toEqual([
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
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
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ])
    })
  })
})