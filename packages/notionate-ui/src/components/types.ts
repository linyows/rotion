import React from 'react'

export type Link = React.FC<{
  children: string | React.ReactElement<'a', string | React.JSXElementConstructor<any>>
  className?: string
  href: string | UrlObject
}>
