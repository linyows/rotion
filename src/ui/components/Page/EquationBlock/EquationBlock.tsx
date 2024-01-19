import React, { useMemo } from 'react'
import Katex from 'katex'
import type { EquationBlockProps } from './EquationBlock.types'

const EquationBlock = ({ block }: EquationBlockProps) => {
  const { equation } = block
  const formula = equation.expression

  const html = useMemo(() => {
    return Katex.renderToString(formula, {
      throwOnError: false,
      output: 'mathml',
    })
  }, [formula])

  return (
    <div className="notionate-blocks-equation" dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export default EquationBlock
