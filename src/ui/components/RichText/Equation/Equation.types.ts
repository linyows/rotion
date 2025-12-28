import type { EquationRichTextItemResponse } from '../../../../exporter/index.js'
import type { ReactNode } from 'react'

export interface EquationProps {
  textObject: EquationRichTextItemResponse
  children?: ReactNode
}
