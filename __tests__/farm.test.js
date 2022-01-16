// code here
import {
  helloFarm
} from '../farm/farm'

// 1. Write Test
// 2. Make sure the test fails
// 3. Write the code to pass the test
// 4. Refactor

describe("helloFarm", () => {
  it("return the greeting message", () => {
    // Arrange
    const msg = helloFarm()

    // Act


    // Assert
    expect(msg).toEqual("hello farm")
  
  })
})