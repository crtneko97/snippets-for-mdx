// front-end/lib/remark-glossary.js
import { visit }     from 'unist-util-visit'
import { glossary }  from '../src/glossary.js'

export default function remarkGlossary() {
  const terms = Object.keys(glossary).sort((a, b) => b.length - a.length)

  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const text = node.value
      const matches = []

      // collect matches
      for (const term of terms) {
        const esc = term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
        const re  = new RegExp(`\\b${esc}\\b`, 'gi')
        let m
        while ((m = re.exec(text)) !== null) {
          matches.push({
            start: m.index,
            end:   m.index + m[0].length,
            match: m[0],
            key:   term
          })
        }
      }
      if (!matches.length) return

      // sort & dedupe
      matches.sort((a, b) => a.start - b.start || b.end - a.end)
      const final = []
      let cursor = 0
      for (const m of matches) {
        if (m.start >= cursor) {
          final.push(m)
          cursor = m.end
        }
      }

      // rebuild children, producing inline MDX JSX nodes
      const newChildren = []
      cursor = 0
      for (const { start, end, match, key } of final) {
        // text before
        if (start > cursor) {
          newChildren.push({
            type: 'text',
            value: text.slice(cursor, start)
          })
        }

        // inline MDX JSX element
        newChildren.push({
          type: 'mdxJsxTextElement',
          name: 'GlossaryTerm',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'definition',
              value: glossary[key]
            }
          ],
          children: [
            { type: 'text', value: match }
          ]
        })

        cursor = end
      }

      // trailing text
      if (cursor < text.length) {
        newChildren.push({
          type: 'text',
          value: text.slice(cursor)
        })
      }

      // splice in place
      parent.children.splice(index, 1, ...newChildren)
    })
  }
}
