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
  return tileArr
}