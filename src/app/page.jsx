// src/app/c-prog/page.jsx
import Link from 'next/link'
import { getAllChapters } from '../../lib/content'

export default function CProgIndex() {
  const chapters = getAllChapters()
  return (
    <section style={{ padding: '2rem' }}>
      <h1>C Programming Concepts with Interactive Components</h1>
      <p>This demo shows how we can explain complex programming concepts using custom MDX components:</p>
      
      <ul>
        {chapters.map(ch => (
          <li key={ch.slug}>
            <Link href={`/${ch.slug}`}>
              {ch.order}. {ch.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}