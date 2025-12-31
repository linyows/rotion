import type React from 'react'
import type { ListBlockChildrenResponseEx } from '../../../exporter/index.js'
import type { TableOfContentsProps } from './TableOfContents.types'
import '../tokens.css'
import './TableOfContents.css'

export function GenHtmlId(uuidv8Id: string): string {
  return uuidv8Id.slice(-8)
}

type TocItem = {
  level: number
  text: string
  id: string
}

const buildTocItems = (blocks: ListBlockChildrenResponseEx): TocItem[] => {
  const { results } = blocks
  return results
    .map((bl) => {
      if (!('type' in bl)) {
        return null
      }

      switch (bl.type) {
        case 'heading_1':
          return {
            level: 1,
            text: bl.heading_1.rich_text.map((t) => t.plain_text).join('') || '',
            id: GenHtmlId(bl.id),
          }
        case 'heading_2':
          return {
            level: 2,
            text: bl.heading_2.rich_text.map((t) => t.plain_text).join('') || '',
            id: GenHtmlId(bl.id),
          }
        case 'heading_3':
          return {
            level: 3,
            text: bl.heading_3.rich_text.map((t) => t.plain_text).join('') || '',
            id: GenHtmlId(bl.id),
          }
      }

      return null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
}

type ListRecursiveProps = {
  items: TocItem[]
}

const ListRecursive = ({ items }: ListRecursiveProps) => {
  const result: React.ReactElement[] = []
  let currentIndex = 0

  while (currentIndex < items.length) {
    const currentItem = items[currentIndex]

    // Check if there are nested items (next item has deeper level)
    const nestedItems: TocItem[] = []
    let nestedIndex = currentIndex + 1

    // Collect all nested items
    while (nestedIndex < items.length && items[nestedIndex].level > currentItem.level) {
      nestedItems.push(items[nestedIndex])
      nestedIndex++
    }

    // Create the current item
    const currentElement = (
      <li key={currentIndex} className={`level-${currentItem.level}`}>
        <a className="rotion-toc-link" href={`#${currentItem.id}`}>
          {currentItem.text}
        </a>
        {nestedItems.length > 0 && (
          <ul>
            <ListRecursive items={nestedItems} />
          </ul>
        )}
      </li>
    )

    result.push(currentElement)
    currentIndex = nestedIndex
  }

  return result
}

/**
 * Important:
 *
 * Unlike TableOfContentsBlock which is a Page block, this component is a
 * Table of Contents generated from the page's blocks and extracts headings
 * to create a navigation structure.
 */
const TableOfContents = ({ blocks }: TableOfContentsProps) => {
  return (
    <ul className="rotion-toc">
      <ListRecursive items={buildTocItems(blocks)} />
    </ul>
  )
}

export default TableOfContents
