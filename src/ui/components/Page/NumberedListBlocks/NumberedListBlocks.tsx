import React from 'react'
import type { BlockObjectResponse } from '../../../../exporter'
import type { NumberedListBlocksProps } from './NumberedListBlocks.types'
import TextBlock from '../TextBlock/TextBlock'
import PageHandler, { blockType } from '../PageHandler'

const NumberedListBlocks = ({ block, href, link, query }: NumberedListBlocksProps) => {
  const tag = blockType[block.type] as keyof JSX.IntrinsicElements
  // @ts-ignore
  const text = block[block.type]?.rich_text
  if (block.has_children && block.children !== undefined) {
    return (
      <div key={block.id}>
        <TextBlock tag={tag} block={text} key={`text-${block.id}`} />
        {block.children.results.map((bb) => (
          PageHandler({ block: (bb as BlockObjectResponse), href, link, query })
        ))}
      </div>
    )
  }
  return <TextBlock tag={tag} block={text} key={block.id} />
}

export default NumberedListBlocks