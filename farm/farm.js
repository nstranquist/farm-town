export const helloFarm = (name) => {
  if(name == "") {
    throw new Error("Can't pass empty message")
  }
  return "hello " + name
}

export const initTileArr = () => {
  let tileArr = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ]
  for(let i = 1; i < 4; i++) {
    let height = 0, width = 0
    // Prevent duplicate coords
    while(true) {
      height = Math.floor(Math.random()*5)
      width = Math.floor(Math.random()*5)
      if(tileArr[height][width] == 0) {
        tileArr[height][width] = i
        break
      }
    }
  }
  return tileArr
}
