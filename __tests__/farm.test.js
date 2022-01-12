import Farm from '../farm'


// Arrange, Act, Assert
// Zero, One, Many, Boundaries, Exceptions, Interface Definitions, Simple Solutions and Scenarios

describe("Farm Town's Farm", () => {
  let farm;

  beforeEach(() => {
    farm = new Farm()
  })

  describe("Farm initialization", () => {
    it("initializes farm with correct height and width", () => {
      expect(farm.width).toEqual(5)
      expect(farm.height).toEqual(5)
    })
  })
})