import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Farm.module.css'
import create from 'zustand'
import Farm from '../farm'
import { BUILDING_CODES } from '../farm/farm'

const MAX_TILES = 15 // max tiles in any direction, so max grid is 15x15=225

const initialFarm = {
  selectedTile: null,
  isEditing: false,
  state: ""
}

const farmStates = [
  "",
  "editing",
  "selecting",
  "buying",
  "selling",
]

const actions = [
  // Expand Tiles
  "buy-tile-left",
  "buy-tile-right",
  "buy-tile-top",
  "buy-tile-bottom",

]

// const useFarmStore = create(set => ({
//   ...initialFarm,
//   selectTile: (index) => set({ selectedTile: index }),
//   addTileLeft: () => set(state => ({
//     width: state.width + 1,
//     // 0, 6, 11 elements should be replaced
//     mipmap: [
//       ...state.mipmap,
//       ...new Array(state.height).fill(0)
//       // ...
//     ]
//   })),
//   addTileTop: () => set(state => ({
//     height: state.height + 1,
//     mipmap: [
//       ...state.mipmap,
//       ...new Array(state.width).fill(0)
//     ]
//   })),
//   setIsEditing: (isEditing = false) => set({ isEditing }),
//   setFarmState: (newState = "") => set({ state: newState }),
  
//   reset: () => set(initialFarm)
// }))

// - get flattened mipmap

export default function FarmPage() {
  const [farm, setFarm] = useState(() => new Farm())

  const [selectedTile, setSelectedTile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [farmActionState, setFarmActionState] = useState("")

  // const farm = useFarmStore()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  const resetFarm = () => setFarm(() => new Farm())

  const renderFarm = useCallback(() => {
    // return array of farm objects
    let farms = farm.mipmap.map((row, rowIndex) => {
      let newRow = row.map((tile, tileIndex) => {
        return {
          position: {
            x: tileIndex,
            y: rowIndex
          },
          value: tile,
          // ... other data
        }
      })
      return newRow
    })

    return farms
  }, [farm.mipmap, farm, farm.width, farm.height])

  useEffect(() => {
    // fetch data (or use getInitialProps)

  }, [])

  const handleSelectTile = tile => {
    setSelectedTile(tile)
  }

  const handleSellTile = () => {
    setSelectedTile(null)
    setFarmActionState(isEditing ? "" : "editing")
    setIsEditing(!isEditing)
  }

  const buildTile = () => {
    if(!selectedTile || !selectedTile.position || !selectedTile.value)
      return;

    farm.buildPlot(selectedTile.position, selectedTile.value)
  }

  const sellTile = () => {
    if(!selectedTile || !selectedTile.position)
      return

    farm.clearPlot(selectedTile.position)
  }

  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Farm Town</title>
        <meta name="description" content="Create a farm to play with" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx>{`.selected {background: rgba(152,251,152, 1);border-color: rgba(0,0,0,.1);}`}</style>

      <main className={homeStyles.main}>
        <section className={styles.menuBar}>
          <h1>Farm Town</h1>
          {/* Profile Name, Level, Gold, Premo Currency, Links */}
          <h4>Profile</h4>
        </section>
        <section className={styles.playContainer}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className={styles.farmContainer} style={{gridTemplateColumns: `repeat(${farm.width}, 1fr)`, gridTemplateRows: `repeat(${farm.height}, 1fr)`}}>
              {/* Render Farm by Height and Width */}
              {renderFarm().map((row, rowIndex) => {
                return row.map((tile, tileIndex) => (
                  <div className={`${styles.farmTile} ${(selectedTile?.position.x === tile.position.x && selectedTile?.position.y === tile.position.y) ? "selected" : ""}`} key={`${rowIndex}-${tileIndex}-${tile.value}`} onClick={() => handleSelectTile(tile)}>
                    <span>{tile.value}</span>
                  </div>
                ))
              })}
            </div>
          </div>

          <ul className={styles.actionsContainer}>
            <li className={`${styles.actionsItem} ${styles.actionsItemMenu}`}>
              <span>I</span>
              <span>Buy Tile</span>
              <ul className={styles.menuDropdown}>
                <li className={styles.menuDropdownItem} onClick={() => farm.expandLeft()}>
                  Expand Left ($500)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => farm.expandRight()}>
                  Expand Right ($500)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => farm.expandTop()}>
                  Expand Up ($500)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => farm.expandBottom()}>
                  Expand Down ($500)
                </li>
              </ul>
            </li>
            <li className={`${styles.actionsItem} ${styles.actionsItemMenu}`}>
              <span>B</span>
              <span>Build</span>
              <ul className={styles.menuDropdown}>
                <li className={styles.menuDropdownItem} onClick={() => buildTile()}>
                  Housing (1)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => buildTile()}>
                  Landscape (2)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => buildTile()}>
                  Factory (3)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => buildTile()}>
                  Attraction (4)
                </li>
              </ul>
            </li>
            <li className={`${styles.actionsItem}`} onClick={handleSellTile}>
              <span>S</span>
              <span>Sell</span>
            </li>
          </ul>

          {/* Selecting Menu */}
          {isEditing && (
            <div className={styles.selectionMenuContainer}>
              <ul className={styles.selectionMenu}>
                {/* Depending on Active Action */}
                {farmActionState === "selling" || farmActionState === "editing" && (
                  <>
                    <li className={`${styles.selectionMenuItem} ${farm.selectedTile ? "" : styles.disabled}`} onClick={() => sellTile()}>
                      <span>S</span>
                      <span>Sell</span>
                    </li>
                    <li className={styles.selectionMenuItem} onClick={handleSellTile}>
                      <span>X</span>
                      <span>Cancel</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </section>

        <section className={styles.controlsContainer}>
          <header className={styles.controlsHeader}>
            <h3>Controls</h3>
            <div className={styles.controlsSettings} onClick={() => resetFarm()}>
              <span>Clear (dev)</span>
            </div>
          </header>

          {/* Controls List */}
          <ul className={styles.controlsList}>
            {/* {Object.keys(farm).filter(key => key !== "mipmapExample").map((key, ind) => (
              <li key={`${ind}-${key}`} className={styles.controlsItem}>
                {key}: {farm[key] ? typeof farm[key] !== "function" ? farm[key].toString() : "() => ..." : "undef"}
              </li>
            ))} */}
          </ul>
        </section>
      </main>
    </div>
  )
}
