import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Farm.module.css'
import create from 'zustand'

const MAX_TILES = 15 // max tiles in any direction, so max grid is 15x15=225

const initialWidth = 5
const initialHeight = 5

const initialFarm = {
  width: initialWidth,
  height: initialHeight,
  mipmap: new Array(initialHeight * initialWidth).fill(0, 0, initialHeight * initialWidth),
  mipmapExample: [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
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

const useFarmStore = create(set => ({
  ...initialFarm,
  selectTile: (index) => set({ selectedTile: index }),
  addTileLeft: () => set(state => ({
    width: state.width + 1,
    // 0, 6, 11 elements should be replaced
    mipmap: [
      ...state.mipmap,
      ...new Array(state.height).fill(0)
      // ...
    ]
  })),
  addTileTop: () => set(state => ({
    height: state.height + 1,
    mipmap: [
      ...state.mipmap,
      ...new Array(state.width).fill(0)
    ]
  })),
  setIsEditing: (isEditing = false) => set({ isEditing }),
  setFarmState: (newState = "") => set({ state: newState }),
  
  reset: () => set(initialFarm)
}))

export default function Farm() {
  const farm = useFarmStore()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  const renderFarm = useCallback(() => {
    // return array of farm objects
    let farms = farm.mipmap.map((tileType, index) => {
      return {
        index,
        type: tileType,
        // ... other data
      }
    })

    return farms
  }, [farm.mipmap])

  useEffect(() => {
    // fetch data (or use getInitialProps)

  }, [])

  const handleSelectTile = tile => {
    farm.selectTile(tile.index)
  }

  const buyTile = direction => {
    if((direction === "left" || direction === "right") && farm.width + 1 >= MAX_TILES)
      return;
    if((direction === "top" || direction === "bottom") && farm.height + 1 >= MAX_TILES)
      return;

    switch(direction) {
      case "left":
        farm.addTileLeft()
        break;
      case "right":
        farm.addTileLeft()

        break;
      case "top":
        farm.addTileTop()

        break;
      case "bottom":
        farm.addTileTop()

        break;
      default:
        console.log('unkown option')
        break;
    }
  }

  const handleSellTile = () => {
    farm.selectTile(null)
    farm.setFarmState(farm.isEditing ? "" : "editing")
    farm.setIsEditing(!farm.isEditing)
  }

  const sellTile = () => {
    // reset the mipmap to 0
    // farm.setMi
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
              {renderFarm().map((tile, index) => (
                <div className={`${styles.farmTile} ${farm.selectedTile === tile.index ? "selected" : ""}`} key={`${index}-${tile.type}`} onClick={() => handleSelectTile(tile)}>
                  <span>{tile.type}</span>
                </div>
              ))}
            </div>
          </div>

          <ul className={styles.actionsContainer}>
            <li className={`${styles.actionsItem} ${styles.actionsItemMenu}`}>
              <span>I</span>
              <span>Buy Tile</span>
              <ul className={styles.menuDropdown}>
                <li className={styles.menuDropdownItem} onClick={() => buyTile("left")}>
                  Expand Left ($500)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => buyTile("right")}>
                  Expand Right ($500)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => buyTile("top")}>
                  Expand Up ($500)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => buyTile("bottom")}>
                  Expand Down ($500)
                </li>
              </ul>
            </li>
            <li className={`${styles.actionsItem} ${styles.actionsItemMenu}`}>
              <span>B</span>
              <span>Build</span>
              <ul className={styles.menuDropdown}>
                <li className={styles.menuDropdownItem}>
                  Housing
                </li>
                <li className={styles.menuDropdownItem}>
                  Landscape
                </li>
                <li className={styles.menuDropdownItem}>
                  Factory
                </li>
                <li className={styles.menuDropdownItem}>
                  Attraction
                </li>
              </ul>
            </li>
            <li className={`${styles.actionsItem}`} onClick={handleSellTile}>
              <span>S</span>
              <span>Sell</span>
            </li>
          </ul>

          {/* Selecting Menu */}
          {farm.isEditing && (
            <div className={styles.selectionMenuContainer}>
              <ul className={styles.selectionMenu}>
                {/* Depending on Active Action */}
                {farm.state === "selling" || farm.state === "editing" && (
                  <>
                    <li className={`${styles.selectionMenuItem} ${farm.selectedTile ? "" : styles.disabled}`} onClick={sellTile}>
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
            <div className={styles.controlsSettings} onClick={() => farm.reset()}>
              <span>Clear</span>
            </div>
          </header>

          {/* Controls List */}
          <ul className={styles.controlsList}>
            {Object.keys(farm).filter(key => key !== "mipmapExample").map((key, ind) => (
              <li key={`${ind}-${key}`} className={styles.controlsItem}>
                {key}: {farm[key] ? typeof farm[key] !== "function" ? farm[key].toString() : "() => ..." : "undef"}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
