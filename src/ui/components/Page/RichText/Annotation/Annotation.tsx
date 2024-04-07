import React from 'react'
import type { RichTextProps } from '../RichText.types'
import Stylex from '@stylexjs/stylex'
import { tokens, colors } from '../../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
  },
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
    fontFamily: '"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
    background: 'rgba(135, 131, 120, 0.15)',
    borderRadius: tokens.borderRadius,
    fontSize: '.85rem',
    padding: '.1rem .2rem',
  },
  codeDefault: {
    color: '#EB5757',
  },
  default: {
    color: 'inherit',
  },
  gray: {
    color: colors.gray,
  },
  brown: {
    color: colors.brown,
  },
  orange: {
    color: colors.orange,
  },
  yellow: {
    color: colors.yellow,
  },
  green: {
    color: colors.green,
  },
  blue: {
    color: colors.blue,
  },
  purple: {
    color: colors.purple,
  },
  pink: {
    color: colors.pink,
  },
  red: {
    color: colors.red,
  },
  default_background: {
    color: colors.default,
  },
  gray_background: {
    backgroundColor: colors.bgGray,
  },
  brown_background: {
    backgroundColor: colors.bgBrown,
  },
  orange_background: {
    backgroundColor: colors.bgOrange,
  },
  yellow_background: {
    backgroundColor: colors.bgYellow,
  },
  green_background: {
    backgroundColor: colors.bgGreen,
  },
  blue_background: {
    backgroundColor: colors.bgBlue,
  },
  purple_background: {
    backgroundColor: colors.bgPurple,
  },
  pink_background: {
    backgroundColor: colors.bgPink,
  },
  red_background: {
    backgroundColor: colors.bgRed,
  },
  nocode_background: {
    color: colors.default,
  },
})

const Annotation = ({ textObject, children }: RichTextProps) => {
  if (!textObject) {
    return <></>
  }
  const { annotations } = textObject
  const { color } = annotations
  const css = ['rotion-text-annotation']
  css.push(Stylex(style.wrapper))
  // @ts-ignore
  css.push(`rotion-text-${color} ${annotations.code && color === 'default' ? '' : Stylex(style[color])}`)
  if (annotations.bold) css.push(`rotion-text-bold ${Stylex(style.bold)}`)
  if (annotations.italic) css.push(`rotion-text-italic ${Stylex(style.italic)}`)
  if (annotations.strikethrough) css.push(`rotion-text-strikethrough ${Stylex(style.strikethrough)}`)
  if (annotations.underline) css.push(`rotion-text-underline ${Stylex(style.underline)}`)
  if (annotations.code) css.push(`rotion-text-code ${Stylex(style.code)} ${color === 'default' || color.includes('background') ? Stylex(style.codeDefault) : ''}`)
  if (!annotations.code && color.includes('background')) css.push(Stylex(style.nocode_background))

  if (children) {
    return (
      <span className={css.join(' ')}>
        {children}
      </span>
    )
  }

  const html = textObject.plain_text.replace(/\n/g, '<br />')
  return <span className={css.join(' ')} dangerouslySetInnerHTML={{ __html: html }} />
}

export default Annotation
