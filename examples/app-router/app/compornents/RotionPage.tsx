'use client'

import { Page } from 'rotion/ui'
import { createClientLink } from 'rotion/ui'
import Link from 'next/link'
import {
  ListBlockChildrenResponseEx,
} from 'rotion'
import { Link as NLink } from 'rotion/ui'

export const ClientLink = createClientLink(Link)

export const RotionPage = ({ blocks }: { blocks: ListBlockChildrenResponseEx }) => {
  return <Page blocks={blocks} href="/[title]" link={createClientLink(Link) as NLink} />
}