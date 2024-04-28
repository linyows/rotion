import React from 'react'
import type { TextLinkProps, LinkIfLinkedProps } from './LinkIfLinked.types'

export const TextLink = ({ textObject, children }: TextLinkProps) => {
  return (
    <a className="rotion-richtext-link" href={textObject.href as string} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}

const TextNoLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="rotion-richtext-nolink">
      {children}
    </span>
  )
}

// Conditional Wrapper
const LinkIfLinked = ({ condition, textObject, children }: LinkIfLinkedProps) => condition ? TextLink({ textObject, children }) : TextNoLink({ children })

export default LinkIfLinked
