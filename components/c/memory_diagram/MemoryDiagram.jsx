'use client'

import React from 'react'
import styles from './MemoryDiagram.module.scss'

/**
 * @param {{ cells: string[], columns?: number }} props
 *  - cells:   array of cell contents
 *  - columns: how many columns to break into (default = cells.length)
 */
export default function MemoryDiagram({ cells, columns }) {
  // fallback to one row if columns isn't provided
  const cols = columns || cells.length

  // produce a list of <div> with an extra class on those at the right edge
  const divs = cells.map((label, i) => {
    // zero‐based index: column = (i % cols), so when that is cols−1 we’re at the right edge
    const isLastInRow = (i % cols) === cols - 1
    return (
      <div
        key={i}
        className={`${styles.cell} ${isLastInRow ? styles.noRightBorder : ''}`}
      >
        {label}
      </div>
    )
  })

  return (
    <div
      className={styles.diagram}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {divs}
    </div>
  )
}
