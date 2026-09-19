import type { ListBlockChildrenResponseEx } from 'rotion'
import { Page } from 'rotion/ui'

interface NotionPageProps {
  blocks: ListBlockChildrenResponseEx
}

export default function NotionPage({ blocks }: NotionPageProps) {
  return <Page blocks={blocks} />
}
