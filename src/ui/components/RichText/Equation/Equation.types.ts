import type { ReactNode } from 'react'
import type { EquationRichTextItemResponse } from '../../../../exporter/index.js'

export interface EquationProps {
  textObject: EquationRichTextItemResponse
  children?: ReactNode
}
