'use client'

import type { ListBlockChildrenResponseEx } from 'rotion'
import {
  Link as NLink,
  Page as RotionPage,
} from 'rotion/ui'
import { ClientLink } from './ClientLink'

export const Page = ({ blocks }: { blocks: ListBlockChildrenResponseEx }) => {
  return <RotionPage blocks={blocks} href="/[title]" link={ClientLink as NLink} />
}