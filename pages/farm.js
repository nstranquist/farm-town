import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Farm.module.css'
import useStore from '../farm/farm'


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

// - get flattened mipmap

export default function FarmPage() {
  const farm = useStore()

  const [selectedTile, setSelectedTile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [farmActionState, setFarmActionState] = useState("")

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  console.log('selected tile:', selectedTile)

  const resetFarm = () => {
    farm.reset()
    setSelectedTile(null)
    setFarmActionState("")
    setLoading(false)
    setErrors(null)
  }

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
  }, [farm.mipmap, farm.width, farm.height])

  useEffect(() => {
    // fetch data (or use getInitialProps)

  }, [])

  const handleSelectTile = tile => {
    if(selectedTile?.position?.x === tile.position?.x && selectedTile?.position?.y === tile.position?.y) {
      setSelectedTile(null)
      return;
    }

    setSelectedTile(tile)
  }

  const handleSellTile = () => {
    setSelectedTile(null)
    setFarmActionState(isEditing ? "" : "editing")
    setIsEditing(!isEditing)
  }

  const buildTile = (value) => {
    if(farmActionState === "selling" || farmActionState === "editing") {
      alert("you cannot buy while selling")
      return;
    }
    if(!selectedTile || !selectedTile.position)
      return;
    if(selectedTile.value !== 0) {
      alert("cannot build on an existing tile. must destroy it first")
      return;
    }

    console.log("buildTile value:", value)
    farm.buildPlot(selectedTile.position, value)
    setSelectedTile(null)
  }

  const sellTile = () => {
    if(!selectedTile || !selectedTile.position)
      return

    farm.clearPlot(selectedTile.position)
    setSelectedTile(null)
  }

  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Farm Town</title>
        <meta name="description" content="Create a farm to play with" />
        <link rel="icon" href="/farm.svg" />
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
            {/* Can Make pop-up appear to select, or create another nested menu with the full options */}
            <li className={`${styles.actionsItem} ${styles.actionsItemMenu}`}>
              <span>B</span>
              <span>Build</span>
              <ul className={styles.menuDropdown}>
                <li className={styles.menuDropdownItem} onClick={() => buildTile(1)}>
                  Housing (1)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => buildTile(2)}>
                  Landscape (2)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => buildTile(3)}>
                  Factory (3)
                </li>
                <li className={styles.menuDropdownItem} onClick={() => buildTile(4)}>
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
                    <li className={`${styles.selectionMenuItem} ${selectedTile ? "" : styles.disabled}`} onClick={() => sellTile()}>
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
