import type { EquationRichTextItemResponse } from 'notionate-pages'
import type { ReactNode } from 'react'

export interface EquationProps {
  textObject: EquationRichTextItemResponse
  children?: ReactNode
}
