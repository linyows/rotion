import React from 'react'
import type { TextLinkProps, LinkIfLinkedProps } from './LinkIfLinked.types'
import Stylex from '@stylexjs/stylex'
import { tokens, link } from '../../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: tokens.fontFamily,
    textDecoration: link.textDecoration,
    borderBottom: {
      default: link.borderBottom,
      ':hover': link.borderBottomHover,
    },
    color: {
      default: link.color,
      ':hover': link.colorHover,
    },
  },
})

export const TextLink = ({ textObject, children }: TextLinkProps) => {
  return (
    <a className={`rotion-text-link ${Stylex(style.wrapper)}`} href={textObject.href as string} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}

// Conditional Wrapper
const LinkIfLinked = ({ condition, textObject, children }: LinkIfLinkedProps) => condition ? TextLink({ textObject, children }) : children

export default LinkIfLinked
