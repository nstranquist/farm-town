import {
  expandLeft,
  expandRight,
  expandBottom,
  expandTop
} from '../farm/farm'

const farmSlice = (set, get) => ({
  // TODO: break apart state into slices like this, if it gets too unmaintainable
  height: 5,
  width: 5,
})


export default farmSlice;