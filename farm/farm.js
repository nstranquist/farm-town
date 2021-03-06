import create from 'zustand'
import {
  validateBuildPlot,
  validateClearPlot,
} from './farm-validator'

// const MAX_TILES = 15 // max tiles in any direction, so max grid is 15x15=225

export const INITIAL_WIDTH = 5;
export const INITIAL_HEIGHT = 5;
export const INITIAL_MIPMAP = [...new Array(INITIAL_HEIGHT)].map((row) => {
  return [...new Array(INITIAL_WIDTH)].map(() => 0)
});

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
  mipmap: INITIAL_MIPMAP,

  // functions
  expandLeft: () => set(prev => ({ mipmap: expandLeft(prev.mipmap), width: prev.width + 1 })),
  expandRight: () => set(prev => ({ mipmap: expandRight(prev.mipmap), width: prev.width + 1})),
  expandTop: () => set(prev => ({ mipmap: expandTop(prev.mipmap), height: prev.height + 1})),
  expandBottom: () => set(prev => ({ mipmap: expandBottom(prev.mipmap), height: prev.height + 1})),
  buildPlot: (position, value) => set(prev => ({ mipmap: buildPlot(prev.mipmap, prev.width, prev.height, position, value) })),
  clearPlot: (position) => set(prev => ({ mipmap: clearPlot(prev.mipmap, prev.width, prev.height, position) })),
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

export const expandTop = (mipmap) => {
  const width = mipmap[0].length;
  return [
    [...new Array(width)].map(() => 0),
    ...mipmap
  ]
}

export const expandBottom = (mipmap) => {
  const width = mipmap[0].length;
  return [
    ...mipmap,
    [...new Array(width)].map(() => 0)
  ]
}

export const buildPlot = (mipmap, width, height, position, value) => {
  validateBuildPlot(position, value, {
    width: width,
    height: height,
    BUILDING_CODES
  })

  let newMipmap = JSON.parse(JSON.stringify(mipmap))

  newMipmap[position.y][position.x] = value

  return newMipmap
}

export const clearPlot = (mipmap, width, height, position) => {
  validateClearPlot(position, {
    width: width,
    height: height,
    value: mipmap[position.y][position.x]
  })
  
  let newMipmap = JSON.parse(JSON.stringify(mipmap))
  
  newMipmap[position.y][position.x] = 0

  return newMipmap
}

export default useStore
