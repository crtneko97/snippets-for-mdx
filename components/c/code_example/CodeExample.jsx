'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import styles from './CodeExample.module.scss'

export default function CodeExample({ code, language = 'c' }) {
  return (
    <div className={styles.wrapper}>
      <SyntaxHighlighter language={language} style={tomorrow} showLineNumbers>
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
