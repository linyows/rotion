import { useState } from 'react'
import type { ParsedUrlQueryInput } from 'node:querystring'
import type { ListBlockChildrenResponseEx, GetPageResponse } from '../../exporter/index.js'

export function queryToString (q: ParsedUrlQueryInput | undefined) {
  if (q === undefined) {
    return ''
  }

  const str = Object.entries(q).map((e) => {
    return `${e[0]}=${encodeURIComponent(`${e[1]}`)}`
  }).join('&')

  return `?${str}`
}

export const getLinkPathAndLinkKey = (link: string): [string, string] => {
  const linkArray = link.split('[')
  if (link === '') {
    return ['/', '']
  } else if (linkArray.length < 2) {
    return [link, '']
  }
  return [linkArray[0], linkArray[1].split(']')[0]]
}

export function getSlug (key: string, page: GetPageResponse) {
  if (!('properties' in page)) {
    return 'not-found-properties'
  }
  if (key === 'id') {
    return page.id
  }
  if (!(key in page.properties)) {
    return 'not-found-key-in-page-properties'
  }
  const p = page.properties[key]
  if (!('rich_text' in p)) {
    return 'not-found-richtext-in-key'
  }
  // @ts-expect-error
  return p.rich_text.map(v => v.text.content).join(',')
}

export function UsePagination<T> (pages: T[], perPage: number): {
  currentData(): T[]
  next(): void
  currentPage: number
  maxPage: number
} {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(pages.length / perPage)

  const currentData = () => {
    const begin = (currentPage - 1) * perPage
    const end = begin + perPage
    return pages.slice(undefined, end)
  }

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  }

  return { next, currentData, currentPage, maxPage }
}

// BuildPlainTextByPage builds plain text from a apge as FetchBlocks returns
export function BuildPlainTextByPage (blocks: ListBlockChildrenResponseEx) {
  const richText = blocks.results.map(v => 'type' in v && v.type === 'paragraph' ? v.paragraph.rich_text : [])
  return richText.flatMap(v => v.map(vv => vv.plain_text)).join('')
}

export function pathBasename (str: string) {
  const u = str.replace(/\/$/, '')
  const l = u.substring(u.lastIndexOf('/') + 1)
  return l.lastIndexOf('?') > 0 ? l.substring(0, l.lastIndexOf('?')) : l
}

export function getDatetimeFormat (lang?: string) {
  let dateF = 'MMMM D, YYYY'
  let timeF = 'h:mm A'
  if (!lang) {
    return { dateF, timeF }
  }

  if (lang.includes('ja')) {
    dateF = 'YYYY年M月D日'
    timeF = 'H:mm'
  }
  return { dateF, timeF }
}

export function splitUrl (url: string) {
  const withoutScheme = url.replace(/https?:\/\//, '')
  const arrayPath = withoutScheme.split('/')
  const domain = `${arrayPath.shift()}`
  const path = arrayPath.join('/')
  return {
    domain,
    omittedPath: `/${path.length > 12 ? `${path.substring(0, 3)}...${path.substring(path.length - 6)}` : path}`
  }
}
