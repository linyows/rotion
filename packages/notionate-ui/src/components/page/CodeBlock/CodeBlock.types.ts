import type { CodeBlockObjectResponse } from 'notionate-pages'
import type { ExternalModules } from '../../types'

export interface CodeBlockProps {
  block: CodeBlockObjectResponse
  modules?: ExternalModules
}
