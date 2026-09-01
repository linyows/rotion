import type { ParsedUrlQueryInput } from 'node:querystring'
import { useState } from 'react'
import type {
  FormulaPropertyValueResponse,
  GetPageResponse,
  ListBlockChildrenResponseEx,
  RichTextItemResponse,
} from '../../exporter/index.js'

export function queryToString(q: ParsedUrlQueryInput | undefined) {
  if (q === undefined) {
    return ''
  }

  const str = Object.entries(q)
    .map((e) => {
      return `${e[0]}=${encodeURIComponent(`${e[1]}`)}`
    })
    .join('&')

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

export function getSlug(key: string, page: GetPageResponse) {
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
  // @ts-expect-error: Notion rich_text property items have text.content but TypeScript types are incomplete
  return p.rich_text.map((v) => v.text.content).join(',')
}

export function usePagination<T>(
  pages: T[],
  perPage: number,
): {
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
  const richText = blocks.results.map((v) => ('type' in v && v.type === 'paragraph' ? v.paragraph.rich_text : []))
  return richText.flatMap((v) => v.map((vv) => vv.plain_text)).join('')
}

export function pathBasename(str: string) {
  const u = str.replace(/\/$/, '')
  const l = u.substring(u.lastIndexOf('/') + 1)
  return l.lastIndexOf('?') > 0 ? l.substring(0, l.lastIndexOf('?')) : l
}

export function getDatetimeFormat(lang?: string) {
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

export function richTextKey(plainText: string | undefined, index: number): string {
  return `${plainText || 'empty'}-${index}`
}

// A formula property holds a string, a date or a boolean as well as a number,
// and the formula fields only render a number.
export function formulaNumber(formula: FormulaPropertyValueResponse): number | null {
  return formula.type === 'number' ? formula.number : null
}

export function splitUrl(url: string) {
  const withoutScheme = url.replace(/https?:\/\//, '')
  const arrayPath = withoutScheme.split('/')
  const domain = `${arrayPath.shift()}`
  const path = arrayPath.join('/')
  return {
    domain,
    omittedPath: `/${path.length > 12 ? `${path.substring(0, 3)}...${path.substring(path.length - 6)}` : path}`,
  }
}

// Notion splits the content of a code block into multiple rich text items when
// a part of the code has its own annotations, such as a comment. Joining them
// keeps the whole code in a single code element.
export function joinRichTextContent(richText: RichTextItemResponse[]): string {
  return richText.map((v) => ('text' in v ? v.text.content : v.plain_text)).join('')
}

// KaTeX converts a `\\` line break to a MathML `<mspace linebreak="newline">`,
// which browsers ignore. Splitting an expression at its top level line breaks
// allows each line to be rendered as its own equation. Line breaks inside an
// environment such as `\begin{aligned}` or inside a group are kept as they are,
// because KaTeX turns them into a table.
export function splitEquationLines(expression: string): string[] {
  const lines: string[] = []
  let line = ''
  let envDepth = 0
  let groupDepth = 0
  let i = 0

  while (i < expression.length) {
    const rest = expression.slice(i)

    if (rest.startsWith('\\begin')) {
      envDepth++
      line += '\\begin'
      i += '\\begin'.length
      continue
    }

    if (rest.startsWith('\\end')) {
      envDepth--
      line += '\\end'
      i += '\\end'.length
      continue
    }

    const breakToken = rest.startsWith('\\\\') ? '\\\\' : rest.startsWith('\\newline') ? '\\newline' : ''
    if (breakToken !== '') {
      let end = i + breakToken.length
      // Skip the star and the optional spacing argument such as `\\*[1em]`
      if (expression[end] === '*') {
        end++
      }
      if (expression[end] === '[') {
        const bracket = expression.indexOf(']', end)
        if (bracket !== -1) {
          end = bracket + 1
        }
      }
      if (envDepth === 0 && groupDepth === 0) {
        lines.push(line)
        line = ''
      } else {
        line += expression.slice(i, end)
      }
      i = end
      continue
    }

    // Keep an escaped character as it is so that `\{` does not change the depth
    if (rest.startsWith('\\') && rest.length > 1) {
      line += expression.slice(i, i + 2)
      i += 2
      continue
    }

    if (rest.startsWith('{')) {
      groupDepth++
    } else if (rest.startsWith('}')) {
      groupDepth--
    }
    line += expression[i]
    i++
  }
  lines.push(line)

  const trimmed = lines.map((v) => v.trim()).filter((v) => v !== '')
  return trimmed.length === 0 ? [expression] : trimmed
}
