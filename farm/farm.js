export const helloFarm = (name) => {
  if(name == "") {
    throw new Error("Can't pass empty message")
  }
  return "hello " + name
}