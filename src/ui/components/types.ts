import type React from 'react'
import type { UrlObject } from 'node:url'

export interface Link extends React.FC<{
  children: string | React.ReactNode
  className?: string
  href: string | UrlObject
}> {}
