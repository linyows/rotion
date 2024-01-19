import type { CodeBlockObjectResponse } from '../../../../exporter'
import type { ExternalModules } from '../../types'

export interface CodeBlockProps {
  block: CodeBlockObjectResponse
  modules?: ExternalModules
}
