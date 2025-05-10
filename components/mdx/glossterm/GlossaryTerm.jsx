// front-end/src/components/c/GlossaryTerm.jsx
'use client'

import { useState } from 'react'
import styles from './GlossaryTerm.module.scss'

export default function GlossaryTerm({ children, definition }) {
  const [show, setShow] = useState(false)
  return (
    <span 
      className={styles.glossaryTerm} 
      onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className={styles.tooltip}>
          {definition}
        </span>
      )}
    </span>
  )
}
