// code here
import {
  helloFarm,
  initTileArr
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
  it("returns tile array", () => {
    const tileArr = initTileArr()

    expect(tileArr).toEqual(
      [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ]
    )
  })

  it("contains random three starter tiles", () => {
    const tileArr = initTileArr()

    let tileCounter = 0
    let newArr = tileArr
    for(let i=0; i<5; i++) {
      for(let j=0; j<5; j++) {
        if(newArr[i][j] != 0) {
          tileCounter++
        }
      }
    }
    
    expect(tileCounter).toEqual(3)

  })
})