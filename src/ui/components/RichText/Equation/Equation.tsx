import Katex from 'katex'
import { useMemo } from 'react'
import type { EquationProps } from './Equation.types'
import '../../tokens.css'
import './Equation.css'

const Equation = ({ textObject }: EquationProps) => {
  const { equation } = textObject
  const formula = equation.expression

  const html = useMemo(() => {
    return Katex.renderToString(formula, {
      throwOnError: false,
      output: 'mathml',
    })
  }, [formula])

  return <span className="rotion-richtext-equation" dangerouslySetInnerHTML={{ __html: html }} />
}

export default Equation
