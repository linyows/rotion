'use client'

/**
 * Rotion configuration for Next.js App Router
 *
 * This file creates a Client Component wrapper for Next.js Link
 * so it can be used with rotion's Client Components.
 */

import { createClientLink } from 'rotion/ui'
import NextLink from 'next/link'

export const ClientLink = createClientLink(NextLink)
