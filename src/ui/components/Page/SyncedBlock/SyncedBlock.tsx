import React from 'react'
import type { SyncedBlockProps } from './SyncedBlock.types'

// TODO: Iimplement and design
const SyncedBlock = ({ block }: SyncedBlockProps) => {
  const { synced_block } = block
  return (
    <div className="notionate-blocks-syncedblock">
      {synced_block.synced_from?.block_id}
    </div>
  )
}

export default SyncedBlock
