import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Farm.module.css'
import create from 'zustand'

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
  selectedTile: null
}

const useFarmStore = create(set => ({
  ...initialFarm,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  selectTile: (index) => set({ selectedTile: index })
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
        </section>
        <section className={styles.playContainer}>
          {/* <h1>Farm Here</h1> */}
          <div className={styles.farmContainer} style={{gridTemplateColumns: `repeat(${farm.width}, 1fr)`, gridTemplateRows: `repeat(${farm.height}, 1fr)`}}>
            {/* Render Farm by Height and Width */}
            {renderFarm().map((tile, index) => (
              <div className={`${styles.farmTile} ${farm.selectedTile === tile.index ? "selected" : ""}`} key={`${index}-${tile.type}`} onClick={() => handleSelectTile(tile)}>
                <span>{tile.type}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.controlsContainer}>
          <header className={styles.controlsHeader}>
            <h3>Controls</h3>
            <div className={styles.controlsSettings}>
              <span>Hey</span>
            </div>
          </header>

          {/* Controls List */}
          <ul className={styles.controlsList}>
            {Object.keys(farm).filter(key => key !== "mipmapExample").map((key, ind) => (
              <li key={`${ind}-${key}`} className={styles.controlsItem}>
                {key}: {farm[key] ? farm[key].toString() : "undef"}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
