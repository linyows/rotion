import type { ReactNode } from 'react'
import type { ExternalModules } from '../../../types'

export interface CodeProps {
  language: string
  modules?: ExternalModules
  children?: ReactNode
}
