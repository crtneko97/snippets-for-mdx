// src/app/[slug]/page.jsx
import { getAllChapters, getChapterBySlug } from '../../../lib/content'
import MDXClientRenderer from '../../../components/mdx/MDXClientRenderer'

export async function generateStaticParams() {
  const chapters = await getAllChapters()
  return chapters.map(ch => ({ slug: ch.slug }))
}

export default async function ChapterPage({ params }) {
  const { slug } = params
  const { frontMatter, content } = await getChapterBySlug(slug)

  return (
    <article style={{ padding: '2rem' }}>
      <h1>{frontMatter.title}</h1>
      <MDXClientRenderer content={content} />
    </article>
  )
}