'use client'

import React, { ComponentType, ComponentProps } from 'react'

/**
 * Creates a Client Component wrapper for a Link component to use with rotion in Next.js App Router
 *
 * In Next.js App Router, you cannot pass Server Components (like next/link) directly to
 * Client Components. This helper creates a Client Component wrapper that can be safely passed.
 *
 * @example Next.js App Router
 * ```tsx
 * // app/lib/rotion.ts
 * import { createClientLink } from 'rotion/helpers'
 * import NextLink from 'next/link'
 *
 * export const ClientLink = createClientLink(NextLink)
 * ```
 *
 * ```tsx
 * // app/page.tsx
 * import { Page } from 'rotion/ui'
 * import { ClientLink } from './lib/rotion'
 *
 * export default async function MyPage() {
 *   const blocks = await FetchBlocks(...)
 *   return <Page blocks={blocks} link={ClientLink} />
 * }
 * ```
 *
 * @param LinkComponent - The Link component from your framework (e.g., next/link)
 * @returns A Client Component wrapper that can be used with rotion
 */
export function createClientLink<T extends ComponentType<any>>(
  LinkComponent: T
): ComponentType<ComponentProps<T>> {
  const ClientLink = (props: ComponentProps<T>) => {
    return <LinkComponent {...props} />
  }

  ClientLink.displayName = `ClientLink(${LinkComponent.displayName || LinkComponent.name || 'Link'})`

  return ClientLink
}
