
const emptyFarm = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]
const testExpandInitial = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
]

export const mipmapFixtures = {
  initial: emptyFarm,
  expandLeft: {
    before: testExpandInitial,
    after: [
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
    ],
  },
  expandRight: {
    before: testExpandInitial,
    after: [
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
    ],
  },
  expandTop: {
    before: testExpandInitial,
    after: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
    ],
  },
  expandBottom: {
    before: testExpandInitial,
    after: [
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  },
  
  // plot
  buildPlot: {
    before: emptyFarm,
    after: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 3, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]
  }
}
