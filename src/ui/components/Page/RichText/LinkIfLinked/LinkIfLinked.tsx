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
  },
  nolink: {
    fontFamily: tokens.fontFamily,
  },
})

export const TextLink = ({ textObject, children }: TextLinkProps) => {
  return (
    <a className={`rotion-text-link ${Stylex(style.wrapper)}`} href={textObject.href as string} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}

const TextNoLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className={Stylex(style.nolink)}>
      {children}
    </span>
  )
}

// Conditional Wrapper
const LinkIfLinked = ({ condition, textObject, children }: LinkIfLinkedProps) => condition ? TextLink({ textObject, children }) : TextNoLink({ children })

export default LinkIfLinked
