import React from 'react'
import type { UrlObject } from 'node:url'

export type Link = React.FC<{
  children: string | React.ReactElement<'a', string | React.JSXElementConstructor<any>>
  className?: string
  href: string | UrlObject
}>
