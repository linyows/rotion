import React from 'react'
import type { UrlObject } from 'node:url'

export interface Link extends React.FC<{
  children: string | React.ReactNode
  className?: string
  href: string | UrlObject
}> {}

export interface ExternalModules {
  mermaid?: {
    init: (config?: {}, nodes?: string | HTMLElement, callback?: ((id: string) => unknown) | undefined) => Promise<void>
  }
  prism?: {
    highlightElement: (element: Element, async?: boolean | undefined, callback?: (element: Element) => void | undefined) => void
  }
}
