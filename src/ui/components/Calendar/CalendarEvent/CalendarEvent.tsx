import type { PageObjectResponseEx, RichTextItemResponse } from '../../../../exporter/index.js'
import { getLinkPathAndLinkKey, getSlug, richTextKey } from '../../lib.js'
import { RichText } from '../../RichText/index.js'
import type { Link } from '../../types.js'
import type { CalendarEventProps } from './CalendarEvent.types'
import './CalendarEvent.css'

function findTitlePropertyName(page: PageObjectResponseEx) {
  for (const key in page.properties) {
    const p = page.properties[key]
    if (p.type === 'title') {
      return key
    }
  }
}

function renderIcon(page: PageObjectResponseEx) {
  if (!page.icon) return null
  if (page.icon.type === 'emoji') {
    return <span className="rotion-calendar-event-emoji">{page.icon.emoji}</span>
  }
  if (page.icon.type === 'external' || page.icon.type === 'file') {
    return <img className="rotion-calendar-event-icon-img" src={page.icon.src} alt="" />
  }
  return null
}

function renderTitle(page: PageObjectResponseEx, key: string) {
  const property = page.properties[key]
  if (!property || property.type !== 'title') {
    return null
  }
  const text = property.title as unknown as RichTextItemResponse[]
  return (
    <span className="rotion-calendar-event-title">
      {text.map((t, i) => (
        <RichText key={richTextKey(t.plain_text, i)} textObject={t} />
      ))}
    </span>
  )
}

function renderProperty(page: PageObjectResponseEx, key: string) {
  const property = page.properties[key]
  if (!property) {
    return null
  }

  switch (property.type) {
    case 'select': {
      const select = property.select
      if (!select) return null
      return (
        <span className={`rotion-calendar-event-tag rotion-tag-${select.color}`}>{select.name}</span>
      )
    }
    case 'multi_select': {
      const items = property.multi_select
      if (!items?.length) return null
      return (
        <span className="rotion-calendar-event-tags">
          {items.map((s) => (
            <span key={s.id} className={`rotion-calendar-event-tag rotion-tag-${s.color}`}>
              {s.name}
            </span>
          ))}
        </span>
      )
    }
    case 'rich_text': {
      const text = property.rich_text as unknown as RichTextItemResponse[]
      if (!text?.length) return null
      return (
        <span className="rotion-calendar-event-text">
          {text.map((t, i) => (
            <RichText key={richTextKey(t.plain_text, i)} textObject={t} />
          ))}
        </span>
      )
    }
    default:
      return null
  }
}

const CalendarEvent = ({ page, keys, date, options, continuationLeft, continuationRight }: CalendarEventProps) => {
  const titleKey = findTitlePropertyName(page)
  const { href, link, query } = options || {}

  let pathname: string | undefined
  if (titleKey && href?.[titleKey]) {
    const [path, slugKey] = getLinkPathAndLinkKey(href[titleKey])
    pathname = slugKey === '' ? path : `${path}${getSlug(slugKey, page)}`
  }

  const className = [
    'rotion-calendar-event',
    pathname ? 'rotion-calendar-event-link' : '',
    continuationLeft ? 'rotion-calendar-event-cont-left' : '',
    continuationRight ? 'rotion-calendar-event-cont-right' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const renderedKeys: string[] = keys.includes(titleKey || '') || !titleKey ? keys : [titleKey, ...keys]

  const body = (
    <>
      {page.icon && <span className="rotion-calendar-event-icon">{renderIcon(page)}</span>}
      <span className="rotion-calendar-event-body">
        {renderedKeys.map((name) => {
          if (name === date) return null
          if (name === titleKey) {
            return <span key={name}>{renderTitle(page, name)}</span>
          }
          const rendered = renderProperty(page, name)
          if (!rendered) return null
          return <span key={name}>{rendered}</span>
        })}
      </span>
    </>
  )

  if (pathname && link && query) {
    const L = link as unknown as Link
    return (
      <L className={className} href={{ pathname, query }}>
        {body}
      </L>
    )
  }
  if (pathname && link) {
    const L = link
    return (
      <L className={className} href={pathname}>
        {body}
      </L>
    )
  }
  if (pathname) {
    return (
      <a className={className} href={pathname}>
        {body}
      </a>
    )
  }
  return <div className={className}>{body}</div>
}

export default CalendarEvent
