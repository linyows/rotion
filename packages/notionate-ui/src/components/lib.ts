import { useState } from 'react'
import type { ParsedUrlQueryInput } from 'node:querystring'
import { ListBlockChildrenResponseEx } from 'notionate-pages'

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
    console.log('link format is wrong, example: /path/to/[slug]')
    return ['', '']
  }
  return [linkArray[0], linkArray[1].split(']')[0]]
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
export function BuildPlainTextByPage(blocks: ListBlockChildrenResponseEx) {
  const richText = blocks.results.map(v => 'type' in v && v.type === 'paragraph' ? v.paragraph.rich_text : [] )
  return richText.map(v => v.map(vv => vv.plain_text)).flat().join('')
}

export function pathBasename(str: string) {
  const u = str.replace(/\/$/, '')
  const l = u.substring(u.lastIndexOf('/') + 1)
  return l.lastIndexOf('?') > 0 ? l.substring(0, l.lastIndexOf('?')) : l
}
