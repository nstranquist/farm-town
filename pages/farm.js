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
  ]
}

const useFarmStore = create(set => ({
  ...initialFarm,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

export default function Farm() {
  const farm = useFarmStore()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  const renderFarm = useCallback(() => {
    // return array of farm objects
    let farms = farm.mipmap.map(tileType => {
      return {
        type: tileType,
        // ... other data
      }
    })

    return farms
  }, [farm.mipmap])

  useEffect(() => {
    // fetch data (or use getInitialProps)

  }, [])

  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Farm Town</title>
        <meta name="description" content="Create a farm to play with" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
              <div className={styles.farmTile} key={`${index}-${tile.type}`}>
                <span>{tile.type}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
