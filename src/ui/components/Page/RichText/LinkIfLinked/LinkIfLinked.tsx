import React from 'react'
import type { TextLinkProps, LinkIfLinkedProps } from './LinkIfLinked.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    textDecoration: 'none',
    borderBottom: {
      default: '1px solid #999',
      ':hover': '1px solid #ddd',
    },
    color: {
      default: '#666',
      ':hover': '#ddd',
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
