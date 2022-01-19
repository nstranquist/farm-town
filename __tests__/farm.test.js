import {
  INITIAL_MIPMAP
} from '../farm/farm'

describe("Farm Town's Farm", () => {
  describe("Farm Initialization", () => {
    it("generates the farm mipmap correctly", () => {
      let mipmap = INITIAL_MIPMAP();

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
})