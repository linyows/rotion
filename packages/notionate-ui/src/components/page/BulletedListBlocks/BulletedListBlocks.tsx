import React from 'react'
import type { BlockObjectResponse } from 'notionate-pages'
import type { BulletedListBlocksProps } from './BulletedListBlocks.types'
import TextBlock from '../TextBlock'
import PageHandler, { blockType } from '../PageHandler'

const BulletedListBlocks = ({ block, href, link, query }: BulletedListBlocksProps) => {
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

export default BulletedListBlocks
