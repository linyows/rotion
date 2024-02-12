import React, { useMemo } from 'react'
import Katex from 'katex'
import type { EquationProps } from './Equation.types'
import Stylex from '@stylexjs/stylex'

const style = Stylex.create({
  wrapper: {
    display: 'block',
  }
})

const Equation = ({ textObject }: EquationProps) => {
  const { equation } = textObject
  const formula = equation.expression

  const html = useMemo(() => {
    return Katex.renderToString(formula, {
      throwOnError: false,
      output: 'mathml',
    })
  }, [formula])

  return <span className={`rotion-equation-html ${Stylex(style.wrapper)}`} dangerouslySetInnerHTML={{ __html: html }} />
}

export default Equation
