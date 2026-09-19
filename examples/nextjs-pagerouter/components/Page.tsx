import Link from 'next/link'
import type { ListBlockChildrenResponseEx } from 'rotion'
import { type Link as NLink, Page as RotionPage } from 'rotion/ui'

export const Page = ({ blocks }: { blocks: ListBlockChildrenResponseEx }) => {
  return <RotionPage blocks={blocks} href="/[title]" link={Link as NLink} />
}
