// front-end/src/components/mdx/MDXClientRenderer.jsx
'use client'

import { useState, useEffect } from 'react'
import { serialize }            from 'next-mdx-remote/serialize'
import { MDXRemote }            from 'next-mdx-remote'

import CodeExample      from '../c/code_example/CodeExample'
import CodeWithComments from '../c/code_with_comments/CodeWithComments'
import GlossaryTerm     from './glossterm/GlossaryTerm'
import TableDiagram     from '../c/table_diagram/TableDiagram'
import remarkGlossary   from '../../lib/remark-glossary'
import MemoryDiagram from '../c/memory_diagram/MemoryDiagram'
import BitwiseOperators from '../c/bitwise_operators/BitwiseOperators'

export default function MDXClientRenderer({ content }) {
  const [mdxSource, setMdxSource] = useState(null)

  useEffect(() => {
    serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGlossary],
        rehypePlugins: [],
        format: 'mdx'               // ← critical to enable MDX JSX parsing
      },
      parseFrontmatter: false
    }).then(src => setMdxSource(src))
  }, [content])

  if (!mdxSource) return <p>Loading…</p>

  return (
    <MDXRemote
      {...mdxSource}
      components={{
        GlossaryTerm,
        CodeExample,
        CodeWithComments,
        TableDiagram,
        MemoryDiagram,
        BitwiseOperators
      }}
    />
  )
}
