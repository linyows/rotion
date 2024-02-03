import React from 'react'
import type { RichTextProps } from '../RichText.types'
import Stylex from '@stylexjs/stylex'

const style = Stylex.create({
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
  underline: {
    textDecoration: 'underline',
  },
  code: {
    color: '#EB5757',
    fontFamily: '"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
    background: 'rgba(135, 131, 120, 0.15)',
    borderRadius: '3px',
    fontSize: '.8rem',
    padding: '.1rem .2rem',
  },
  default: {
    color: 'inherit',
  },
  gray: {
    color: 'rgba(120, 119, 116, 1)',
  },
  brown: {
    color: 'rgba(159, 107, 83, 1)',
  },
  orange: {
    color: 'rgba(217, 115, 13, 1)',
  },
  yellow: {
    color: 'rgba(203, 145, 47, 1)',
  },
  green: {
    color: 'rgba(68, 131, 97, 1)',
  },
  blue: {
    color: 'rgba(51, 126, 169, 1)',
  },
  purple: {
    color: 'rgba(144, 101, 176, 1)',
  },
  pink: {
    color: 'rgba(193, 76, 138, 1)',
  },
  red: {
    color: 'rgba(212, 76, 71, 1)',
  },
  defaultbackground: {
    background: 'inherit',
  },
  graybackground: {
    background: 'rgba(241, 241, 239, 1)',
  },
  brownbackground: {
    background: 'rgba(244, 238, 238, 1)',
  },
  orangebackground: {
    background: 'rgba(251, 236, 221, 1)',
  },
  yellowbackground: {
    background: 'rgba(251, 243, 219, 1)',
  },
  greenbackground: {
    background: 'rgba(237, 243, 236, 1)',
  },
  bluebackground: {
    background: 'rgba(231, 243, 248, 1)',
  },
  purplebackground: {
    background: 'rgba(244, 240, 247, 0.8)',
  },
  pinkbackground: {
    background: 'rgba(249, 238, 243, 0.8)',
  },
  redbackground: {
    background: 'rgba(253, 235, 236, 1)',
  },
})

const Annotation = ({ textObject, children }: RichTextProps) => {
  if (!textObject) {
    return <></>
  }
  const { annotations } = textObject
  const { color } = annotations
  const css = ['rotion-text-annotation']
  const coloring = color.replace('_', '')
  // @ts-ignore
  css.push(`rotion-text-${coloring} ${Stylex(style[coloring])}`)
  if (annotations.bold) css.push(`rotion-text-bold ${Stylex(style.bold)}`)
  if (annotations.italic) css.push(`rotion-text-italic ${Stylex(style.italic)}`)
  if (annotations.strikethrough) css.push(`rotion-text-strikethrough ${Stylex(style.strikethrough)}`)
  if (annotations.underline) css.push(`rotion-text-underline ${Stylex(style.underline)}`)
  if (annotations.code) css.push(`rotion-text-code ${Stylex(style.code)}`)

  return (
    <span className={css.join(' ')}>
      {children}
    </span>
  )
}

export default Annotation
