import React, { useMemo } from 'react'
import Katex from 'katex'
import type { EquationBlockProps } from './EquationBlock.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    width: '100%',
    textAlign: 'center',
  },
  html: {
    margin: '.5rem auto',
    fontSize: '1.7rem',
  },
})

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
    <div className={`rotion-equation ${Stylex(style.wrapper)}`}>
      <div className={`rotion-equation-html ${Stylex(style.html)}`} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default EquationBlock
