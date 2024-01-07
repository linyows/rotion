import React from 'react'
import type { TextLinkProps, LinkIfLinkedProps } from './LinkIfLinked.types'

export const TextLink = ({ textObject, children }: TextLinkProps) => {
  return (
    <a className="notionate-blocks-text-a" href={textObject.href as string} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}

// Conditional Wrapper
const LinkIfLinked = ({ condition, textObject, children }: LinkIfLinkedProps) => condition ? TextLink({ textObject, children }) : children

export default LinkIfLinked
