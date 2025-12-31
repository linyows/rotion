import type React from 'react'
import type { LinkIfLinkedProps, TextLinkProps } from './LinkIfLinked.types'
import '../../tokens.css'
import './LinkIfLinked.css'

export const TextLink = ({ textObject, children }: TextLinkProps) => {
  return (
    <a className="rotion-richtext-link" href={textObject.href as string} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}

const TextNoLink = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

// Conditional Wrapper
const LinkIfLinked = ({ condition, textObject, children }: LinkIfLinkedProps) =>
  condition ? TextLink({ textObject, children }) : TextNoLink({ children })

export default LinkIfLinked
