import Katex from 'katex'
import { useMemo } from 'react'
import { richTextKey, splitEquationLines } from '../../lib.js'
import type { EquationProps } from './Equation.types'
import '../../tokens.css'
import './Equation.css'

const Equation = ({ textObject }: EquationProps) => {
  const { equation } = textObject
  const formula = equation.expression

  const lines = useMemo(() => {
    return splitEquationLines(formula).map((line, i) => ({
      key: richTextKey(line, i),
      html: Katex.renderToString(line, {
        throwOnError: false,
        output: 'mathml',
      }),
    }))
  }, [formula])

  return (
    <span className="rotion-richtext-equation">
      {lines.map((line) => (
        <span
          key={line.key}
          className="rotion-richtext-equation-line"
          dangerouslySetInnerHTML={{ __html: line.html }}
        />
      ))}
    </span>
  )
}

export default Equation
