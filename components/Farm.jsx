import styles from '../styles/Farm.module.css'
import homeStyles from '../styles/Home.module.css'

export const Farm = ({
  width,
  height,
  selectedTile,
  isEditing,
  expand,
  buildTile,
  sellTile,
  handleSelectTile,
  handleSellTile,
  renderFarm,
  resetFarm,
}) => {

  return (
    <main className={homeStyles.main}>
      <section className={styles.menuBar}>
        <h1>Farm Town</h1>
        {/* Profile Name, Level, Gold, Premo Currency, Links */}
        <h4>Profile</h4>
      </section>
      <section className={styles.playContainer}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div className={styles.farmContainer} style={{gridTemplateColumns: `repeat(${width}, 1fr)`, gridTemplateRows: `repeat(${height}, 1fr)`}}>
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
              <li className={styles.menuDropdownItem} onClick={() => expand("left")}>
                Expand Left ($500)
              </li>
              <li className={styles.menuDropdownItem} onClick={() => expand("right")}>
                Expand Right ($500)
              </li>
              <li className={styles.menuDropdownItem} onClick={() => expand("up")}>
                Expand Up ($500)
              </li>
              <li className={styles.menuDropdownItem} onClick={() => expand("bottom")}>
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
  )
}