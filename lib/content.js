// front-end/lib/content.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ← point into src/content now
const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'c-prog')

export function getAllChapters() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(fn => fn.endsWith('.mdx'))
    .map((filename, idx) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      const slug  = data.slug  || filename.replace(/\.mdx$/, '')
      const title = data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      const order = data.order != null ? data.order : idx + 1
      return { slug, title, order }
    })
    .sort((a, b) => a.order - b.order)
}

export function getChapterBySlug(slug) {
  const fullPath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data: frontMatter, content } = matter(raw)
  return { frontMatter, content }
}
