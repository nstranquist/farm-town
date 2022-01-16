// code here
import {
  getEmptyTileArr,
  helloFarm,
  initTileArr,
  insertTileIntoArray
} from '../farm/farm'

// 1. Write Test
// 2. Make sure the test fails
// 3. Write the code to pass the test
// 4. Refactor

describe("helloFarm", () => {
  it("return the greeting message", () => {
    let name = "cone-r"
    const msg = helloFarm(name)

    expect(msg).toEqual("hello cone-r")
  })

  it("return player name", () => {
    let name = "Eric"
    const msg = helloFarm(name)

    expect(msg).toEqual("hello Eric")
  })

  it("throws error if empty string", () => {
    expect(() => helloFarm("")).toThrow("Can't pass empty message")
  })
})

describe("initialize farm", () => {
  let tileArray;

  beforeEach(() => {
    tileArray = getEmptyTileArr(5, 5)
  })


  it("contains random three starter tiles", () => {
    // Arrange
    const positionMockOne = {
      height: 4,
      width: 4
    }
    const positionMockTwo = {
      height: 2,
      width: 3
    }
    const positionMockThree = {
      height: 0,
      width: 0
    }

    // Act
    tileArray = insertTileIntoArray(tileArray, positionMockOne, 1)
    tileArray = insertTileIntoArray(tileArray, positionMockTwo, 2)
    tileArray = insertTileIntoArray(tileArray, positionMockThree, 3)
    console.log(tileArray)
    expect(tileArray).toEqual([
      [3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
    ])
  })

  // Check for errors
  it("throws error or resolves error if putting in a value to an existing tile", () => {
    // Arrange
    // Create 2 mocks
    const positionMockOne = {
      height: 4,
      width: 4
    }
    const positionMockTwo = {
      height: 4,
      width: 4
    }

    // Act
    // Insert mock 1,
    insertTileIntoArray(tileArray, positionMockOne, 1)
    insertTileIntoArray(tileArray, positionMockTwo, 2)

    // Assert
    // expect(() => insertTileIntoArray(tileArray, positionMockTwo, 2)).toThrow("tile is already populated")
    expect(tileArray[4][4]).toEqual(1)
  })

  it("throws out of bounds exception", () => {
    const mock = {
      height: 6,
      width: 20
    }

    expect(() => insertTileIntoArray(tileArray, mock, 1)).toThrow("out of bounds")
  })
})