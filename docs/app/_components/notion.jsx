import { FetchBlocks, FetchDatabase, FetchPage } from 'rotion'
import { NotionBlocks, NotionDatabase } from './notion-client.jsx'

// The showcase is Notion itself: each of these pages is fetched from the
// Notion API when the site is built and drawn with rotion's own components,
// so what a reader sees is what rotion renders today.

const LABELS = {
  en: { rendered: 'Rendered from Notion by Rotion', source: 'Notion API reference' },
  ja: { rendered: 'Notion のページを Rotion で描画しています', source: 'Notion API リファレンス' }
}

const Frame = ({ lang = 'en', source, children }) => (
  <figure className="rotion-showcase">
    <figcaption className="rotion-showcase-caption">
      <span>{LABELS[lang].rendered}</span>
      {source && (
        <a href={source} target="_blank" rel="noreferrer">
          {LABELS[lang].source}
        </a>
      )}
    </figcaption>
    <div className="rotion-showcase-body">{children}</div>
  </figure>
)

export const fetchBlocks = async id => {
  const page = await FetchPage({ page_id: id, last_edited_time: 'force' })
  return FetchBlocks({ block_id: id, last_edited_time: page.last_edited_time })
}

export const NotionPage = async ({ id, lang, source }) => {
  const blocks = await fetchBlocks(id)
  return (
    <Frame lang={lang} source={source}>
      <NotionBlocks blocks={blocks} />
    </Frame>
  )
}

// The sample database behind every view: the published rows, newest first.
const SAMPLE_QUERY = {
  filter: { property: 'Published', checkbox: { equals: true } },
  sorts: [{ property: 'Date', direction: 'descending' }]
}

export const fetchSampleDatabase = () =>
  FetchDatabase({ database_id: process.env.NOTION_TESTDB_ID, ...SAMPLE_QUERY })

export const NotionView = async ({ page, view, lang, ...props }) => {
  const [blocks, db] = await Promise.all([
    fetchBlocks(process.env[page]),
    fetchSampleDatabase()
  ])
  return (
    <Frame lang={lang}>
      <NotionBlocks blocks={blocks} />
      <div className="rotion-showcase-db">
        <NotionDatabase view={view} db={db} {...props} />
      </div>
    </Frame>
  )
}
