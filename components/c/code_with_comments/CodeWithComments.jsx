'use client'
import styles from './CodeWithComments.module.scss'
import React from 'react'


/**
 * items: Array<{ line: string, comment: string }>
 */
export default function CodeWithComments({ items, language = 'c' }) {
  return (
    <div className={styles.grid}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <pre className={styles.codeCell} data-language={language}>
            {item.line}
          </pre>
          <div className={styles.commentCell}>
            {item.comment}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
