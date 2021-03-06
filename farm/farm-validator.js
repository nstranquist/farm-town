export const validateBuildPlot = (position, value, params) => {
  if(position.x < 0 || position.x >= params.width)
    throw new Error("Farm position x is out of bounds")
  if(position.y < 0 || position.y >= params.height)
    throw new Error("Farm position y is out of bounds")

  if(value < 0 || !params.BUILDING_CODES.includes(value))
    throw new Error("Building value is out of bounds")
  if(value === 0)
    throw new Error("Cannot build a building with existing value of 0")
}

export const validateClearPlot = (position, params) => {
  if(position.x < 0 || position.x >= params.width)
    throw new Error("")
  if(position.y < 0 || position.y >= params.height)
    throw new Error("")
  if(params.value === 0)
    throw new Error("Cannot clear plot that is already at value 0")
}