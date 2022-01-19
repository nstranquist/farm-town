import create from 'zustand'
import {
  validateBuildPlot,
  validateClearPlot,
} from './farm-validator'

// const MAX_TILES = 15 // max tiles in any direction, so max grid is 15x15=225

export const INITIAL_WIDTH = 5;
export const INITIAL_HEIGHT = 5;
export const INITIAL_MIPMAP = () => (
  new Array(INITIAL_HEIGHT).fill(
    new Array(INITIAL_WIDTH).fill(0)
  )
)

// will update as new buildings are added
export const BUILDING_CODES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  11, 12, 13,
  21, 22, 23, 24, 25,
  31, 32,
  41, 42, 43, 44, 45, 46, 47
]

const useStore = create((set, get) => ({
  // data structures
  width: INITIAL_WIDTH,
  height: INITIAL_HEIGHT,
  mipmap: INITIAL_MIPMAP(),

  // functions
  expandLeft: () => set(prev => ({ mipmap: expandLeft(prev.mipmap), width: prev.width + 1 })),
  expandRight: () => set(prev => expandRight(prev.mipmap)),
  expandTop: () => set(prev => expandTop(prev.mipmap, prev.width)),
  expandBottom: () => set(prev => expandBottom(prev.mipmap, prev.width)),
  buildPlot: (position, value) => set(prev => buildPlot(prev.mipmap, prev.width, prev.height, position, value)),
  clearPlot: (position) => set(prev => clearPlot(prev.mipmap, prev.width, prev.height, position)),
}))


export const expandLeft = (mipmap) => {
  return mipmap.map((row, i) => {
    return [0, ...row]
  })
}

export const expandRight = (mipmap) => {
  return mipmap.map((row, i) => {
    return [...row, 0]
  })
}

export const expandTop = (mipmap, width) => {
  return [
    new Array(width).fill(0),
    ...mipmap
  ]
}

export const expandBottom = (mipmap, width) => {
  return [
    ...mipmap,
    new Array(width).fill(0)
  ]
}

export const buildPlot = (mipmap, width, height, position, value) => {
  validateBuildPlot(position, value, {
    width: width,
    height: height,
    BUILDING_CODES
  })

  let row = mipmap[position.y]

  mipmap[position.y] = [
    ...row.slice(0, position.x),
    value,
    ...row.slice(position.x + 1)
  ]

  return mipmap
}

export const clearPlot = (mipmap, width, height, position) => {
  validateClearPlot(position, {
    width: width,
    height: height,
    value: mipmap[position.y][position.x]
  })
  
  let row = mipmap[position.y]

  mipmap[position.y] = [
    ...row.slice(0, position.x),
    0,
    ...row.slice(position.x + 1)
  ]

  return mipmap
}

export default useStore