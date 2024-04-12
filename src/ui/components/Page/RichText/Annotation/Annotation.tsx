import React from 'react'
import type { RichTextProps } from '../RichText.types'
import Stylex from '@stylexjs/stylex'
import { tokens, callout } from '../../../tokens.stylex'

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
    color: callout.gray,
  },
  brown: {
    color: callout.brown,
  },
  orange: {
    color: callout.orange,
  },
  yellow: {
    color: callout.yellow,
  },
  green: {
    color: callout.green,
  },
  blue: {
    color: callout.blue,
  },
  purple: {
    color: callout.purple,
  },
  pink: {
    color: callout.pink,
  },
  red: {
    color: callout.red,
  },
  default_background: {
    color: callout.default,
  },
  gray_background: {
    backgroundColor: callout.bgGray,
  },
  brown_background: {
    backgroundColor: callout.bgBrown,
  },
  orange_background: {
    backgroundColor: callout.bgOrange,
  },
  yellow_background: {
    backgroundColor: callout.bgYellow,
  },
  green_background: {
    backgroundColor: callout.bgGreen,
  },
  blue_background: {
    backgroundColor: callout.bgBlue,
  },
  purple_background: {
    backgroundColor: callout.bgPurple,
  },
  pink_background: {
    backgroundColor: callout.bgPink,
  },
  red_background: {
    backgroundColor: callout.bgRed,
  },
  nocode_background: {
    color: callout.default,
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
