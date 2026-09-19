'use client'

import NextLink from 'next/link'
import {
  Calendar,
  createClientLink,
  Gallery,
  List,
  Page,
  Table
} from 'rotion/ui'

// A function cannot be handed from a server component to a client one, so
// the link rotion renders its internal links with is made on this side.
const ClientLink = createClientLink(NextLink)

export const NotionBlocks = ({ blocks }) => (
  <Page blocks={blocks} link={ClientLink} />
)

const VIEWS = { calendar: Calendar, gallery: Gallery, list: List, table: Table }

// The sample rows link nowhere, so the views are given no link. Gallery could
// not take one anyway: it structuredClones its options, and a function does
// not clone.
export const NotionDatabase = ({ view, ...props }) => {
  const View = VIEWS[view]
  return <View {...props} />
}
