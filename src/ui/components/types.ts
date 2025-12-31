import type { UrlObject } from 'node:url'
import type React from 'react'

export interface Link
  extends React.FC<{
    children: string | React.ReactNode
    className?: string
    href: string | UrlObject
  }> {}
