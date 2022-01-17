import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import homeStyles from '../styles/Home.module.css'
import { Farm as FarmUI } from '../components/Farm'
import * as farm from "../farm-functional/farm.js"


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
  const [width, setWidth] = useState(farm.INITIAL_HEIGHT)
  const [height, setHeight] = useState(farm.INITIAL_WIDTH)
  const [mipmap, setMipmap] = useState(farm.INITIAL_MIPMAP)

  const [selectedTile, setSelectedTile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [farmActionState, setFarmActionState] = useState("")

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  console.log('selected tile:', selectedTile)

  const resetFarm = () => {
    setWidth(farm.INITIAL_HEIGHT)
    setHeight(farm.INITIAL_HEIGHT)
    setMipmap(farm.INITIAL_MIPMAP)
  }

  const renderFarm = useCallback(() => {
    // return array of farm objects
    let farms = mipmap.map((row, rowIndex) => {
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
  }, [mipmap, width, height])

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

    farm.buildPlot(mipmap, width, height, selectedTile.position, selectedTile.value)
  }

  const sellTile = () => {
    if(!selectedTile || !selectedTile.position)
      return

    farm.clearPlot(mipmap, width, height, selectedTile.position)
  }

  const expand = (direction) => {
    switch(direction) {
      case "left":
        farm.expandLeft(mipmap)
        setWidth(prev => prev + 1)
        break;
      case "right":
        farm.expandRight(mipmap)
        setWidth(prev => prev + 1)
        break;
      case "up":
        farm.expandUp(mipmap, width)
        setHeight(prev => prev + 1)
        break;
      case "bottom":
        farm.expandBottom(mipmap, width);
        setHeight(prev => prev + 1)
        break;
      default:
        return;
    }
  }

  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Farm Town</title>
        <meta name="description" content="Create a farm to play with" />
        <link rel="icon" href="/farm.svg" />
      </Head>

      <style jsx>{`.selected {background: rgba(152,251,152, 1);border-color: rgba(0,0,0,.1);}`}</style>

      <FarmUI
        width={width}
        height={height}
        selectedTile={selectedTile}
        isEditing={isEditing}
        expand={expand}
        buildTile={buildTile}
        sellTile={sellTile}
        handleSelectTile={handleSelectTile}
        handleSellTile={handleSellTile}
        renderFarm={renderFarm}
        resetFarm={resetFarm}
      />
    </div>
  )
}
