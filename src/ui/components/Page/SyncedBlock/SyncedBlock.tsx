import React from 'react'
import type { BlockObjectResponse } from '../../../../exporter/index.js'
import type { SyncedBlockProps } from './SyncedBlock.types'
import PageHandler from '../PageHandler.js'
import '../../tokens.css'
import './SyncedBlock.css'

const SyncedBlock = ({ block }: SyncedBlockProps) => {
  if (!block.has_children || block.children === undefined) {
    return <></>
  }

  return (
    <div className="rotion-syncedblock">
      {block.children.results.map((b: BlockObjectResponse) => (
        <PageHandler block={b} key={`block-${b.id}`} />
      ))}
    </div>
  )
}

export default SyncedBlock
