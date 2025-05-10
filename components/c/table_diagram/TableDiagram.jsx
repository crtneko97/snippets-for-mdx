// front-end/src/components/c/table_diagram/TableDiagram.jsx
import React from 'react'
import styles from './TableDiagram.module.scss'

/**
 * @param {{ headers: string[], rows: Array<string[]> }} props
 *   - headers: an array of column‑header labels
 *   - rows:   an array of rows, each row is an array of cell strings
 */
export default function TableDiagram({ headers, rows }) {
  return (
    <div className={styles.diagram}>
      {/* render headers */}
      {headers.map((h, i) => (
        <div key={`h${i}`} className={`${styles.cell} ${styles.header}`}>
          {h}
        </div>
      ))}

      {/* render each row */}
      {rows.map((row, ri) =>
        row.map((cell, ci) => (
          <div key={`${ri}-${ci}`} className={styles.cell}>
            {cell}
          </div>
        ))
      )}
    </div>
  )
}
