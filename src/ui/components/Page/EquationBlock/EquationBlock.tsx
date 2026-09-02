import Katex from 'katex'
import { useMemo } from 'react'
import { richTextKey, splitEquationLines } from '../../lib.js'
import type { EquationBlockProps } from './EquationBlock.types'
import '../../tokens.css'
import './EquationBlock.css'

const EquationBlock = ({ block }: EquationBlockProps) => {
  const { equation } = block
  const formula = equation.expression

  const lines = useMemo(() => {
    return splitEquationLines(formula).map((line, i) => ({
      key: richTextKey(line, i),
      html: Katex.renderToString(line, {
        throwOnError: false,
        output: 'mathml',
        displayMode: true,
      }),
    }))
  }, [formula])

  return (
    <div className="rotion-equation">
      {lines.map((line) => (
        <div key={line.key} className="rotion-equation-html" dangerouslySetInnerHTML={{ __html: line.html }} />
      ))}
    </div>
  )
}

export default EquationBlock
