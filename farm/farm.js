export const helloFarm = (name) => {
  if(name == "") {
    throw new Error("Can't pass empty message")
  }
  return "hello " + name
}

export const getEmptyTileArr = (width, height) => {
  let newArr = new Array(height).fill(
    new Array(width).fill(0)
  )
  console.log(newArr)
  return newArr;
}

export const initTileArr = (tileArray) => {
  let newArray = getEmptyTileArr(5, 5);
  for(let i = 1; i < 4; i++) {
    let height = getRandomNumber(5)
    let width = getRandomNumber(5)
    newArray = insertTileIntoArray(tileArray, {height, width}, i)
    // Prevent duplicate coords
    while(!newArray) {
      height = getRandomNumber(5)
      width = getRandomNumber(5)
      newArray = insertTileIntoArray(tileArray, {height, width}, i)
    }
  }
  return tileArray
}

export const insertTileIntoArray = (tileArray, position, value) => {
  const { width, height } = position;

  if(tileArray[height][width] !== 0)
    return null

  tileArray[height] = [
    ...tileArray[height].slice(0, width),
    value,
    ...tileArray[height].slice(width + 1)
  ]

  return tileArray
}

export const getRandomNumber = (num) => Math.floor(Math.random() * num)