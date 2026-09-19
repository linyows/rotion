// The site used to put every showcase page at the top level (/callout,
// /table-view). Those addresses are linked from elsewhere, so each one is
// written back into the export as a page that forwards to where it lives now.
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../out')

const BLOCKS = [
  'bookmarks', 'breadcrumb', 'bulleted-list-item', 'button', 'callout',
  'child-database', 'child-page', 'code', 'column', 'divider', 'embed',
  'equation', 'file', 'headings', 'image', 'link-preview', 'mention',
  'numbered-list-item', 'paragraph', 'pdf', 'quote', 'rich-text',
  'synced-block', 'table', 'table-of-contents', 'to-do', 'toggle', 'video'
]

const REDIRECTS = {
  ...Object.fromEntries(BLOCKS.map(slug => [slug, `/blocks/${slug}`])),
  'table-view': '/views/table',
  'list-view': '/views/list',
  'gallery-view': '/views/gallery',
  'calendar-view': '/views/calendar',
  'timeline-view': '/views'
}

const page = to => `<!doctype html>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<a href="${to}">${to}</a>
`

for (const [from, to] of Object.entries(REDIRECTS)) {
  const file = path.join(OUT, `${from}.html`)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, page(to), { flag: 'wx' }).catch(err => {
    if (err.code !== 'EEXIST') throw err
    console.warn(`redirects: ${from}.html already exists, left as it is`)
  })
}

console.log(`redirects: wrote ${Object.keys(REDIRECTS).length} pages`)
