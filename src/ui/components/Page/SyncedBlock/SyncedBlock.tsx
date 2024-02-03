import React from 'react'
import type { BlockObjectResponse } from '../../../../exporter'
import type { SyncedBlockProps } from './SyncedBlock.types'
import PageHandler from '../PageHandler'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    padding: '.5rem 0',
  },
})

const SyncedBlock = ({ block }: SyncedBlockProps) => {
  if (!block.has_children || block.children === undefined) {
    return <></>
  }
  return (
    <div className={`rotion-syncedblock ${Stylex(style.wrapper)}`}>
      {block.children.results.map((b: BlockObjectResponse) => (
        <PageHandler block={b} key={`block-${b.id}`} />
      ))}
    </div>
  )
}

export default SyncedBlock
