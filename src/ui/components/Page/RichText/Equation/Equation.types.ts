import type { EquationRichTextItemResponse } from '../../../../../exporter'
import type { ReactNode } from 'react'

export interface EquationProps {
  textObject: EquationRichTextItemResponse
  children?: ReactNode
}
