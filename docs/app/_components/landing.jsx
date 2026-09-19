import { fetchBlocks, fetchSampleDatabase } from './notion.jsx'
import { NotionBlocks } from './notion-client.jsx'
import { HeroStage } from './hero-stage.jsx'
import './landing.css'

export const Landing = ({ children }) => <div className="lp">{children}</div>

// MDX wraps the lede's text in a paragraph of its own, so the wrapper cannot be
// one too: a <p> inside a <p> is invalid HTML, and fails hydration.
export const Lede = ({ children }) => <div className="lp-lede">{children}</div>

export const Actions = ({ children }) => <p className="lp-actions">{children}</p>

export const Action = ({ href, primary, children }) => (
  <a className={primary ? 'lp-action lp-action-primary' : 'lp-action'} href={href}>
    {children}
  </a>
)

// The page on the stage is put together from the showcase: a few blocks cut
// from each of these Notion pages, in this order, drawn as one page.
const PAGE_PARTS = [
  ['38d8251cd03a45bf91613e2ef8a82c48', 2, 3], // callout
  ['4d438f5ea4fa43f282153040fe7e1ff5', 1, 5], // to do
  ['038f54d55b684bb0b02f3765dec8f4a9', 0, 1], // toggle
  ['314fffb219c74ffab1e38b890a0de908', 1, 2], // quote
  ['72fb9fd9ff5247efbe6af4cf151562f5', 1, 3], // code
  ['a2af31d8e7254a17883fb6100d7d074a', 1, 3], // table
  ['1f8ab7d4c3474251b91f04ff70184a2d', 1, 2], // equation
  ['f882184561d44eed89769bbfb867a6c7', 1, 2] // image
]

const fetchSamplePage = async () => {
  const parts = []
  for (const [id] of PAGE_PARTS) {
    parts.push(await fetchBlocks(id))
  }
  const results = parts.flatMap((blocks, i) =>
    blocks.results.slice(PAGE_PARTS[i][1], PAGE_PARTS[i][2])
  )
  return { ...parts[0], results }
}

// The hero and the stage under it, which turn together. The sample page and
// the sample database are fetched at build time and handed to them; the
// hero's words, one for each view, are typed into its headline in turn.
export const Hero = async ({ lead, words, trail, line2, labels, children }) => {
  const [blocks, db] = await Promise.all([fetchSamplePage(), fetchSampleDatabase()])
  return (
    <HeroStage
      lead={lead}
      words={words}
      trail={trail}
      line2={line2}
      labels={labels}
      blocks={blocks}
      db={db}
    >
      {children}
    </HeroStage>
  )
}

export const Section = ({ title, lede, band, children }) => (
  <section className="lp-section" data-band={band}>
    <h2 className="lp-section-title">{title}</h2>
    {lede && <p className="lp-section-lede">{lede}</p>}
    {children}
  </section>
)

export const Wall = ({ children }) => <div className="lp-wall">{children}</div>

// A few blocks cut from one of the showcase pages, drawn as rotion draws them
// and captioned with the block's name, which leads to the whole page.
export const Tile = async ({ id, from = 0, to, name, href }) => {
  const blocks = await fetchBlocks(id)
  const excerpt = { ...blocks, results: blocks.results.slice(from, to) }
  return (
    <figure className="lp-tile">
      <div className="lp-tile-body">
        <NotionBlocks blocks={excerpt} />
      </div>
      <figcaption>
        <a href={href}>{name}</a>
      </figcaption>
    </figure>
  )
}

// The ways to change how the components look, each a short note and the code
// that does it.
export const Ways = ({ children }) => <div className="lp-ways">{children}</div>

export const Way = ({ title, children }) => (
  <div className="lp-way">
    <h3>{title}</h3>
    {children}
  </div>
)

