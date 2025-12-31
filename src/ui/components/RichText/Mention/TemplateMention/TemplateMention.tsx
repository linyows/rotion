import type { TemplateMentionProps } from './TemplateMention.types'

const TemplateMention = ({ text, children }: TemplateMentionProps) => {
  return (
    <span className="rotion-mention-template">
      {text}
      {children}
    </span>
  )
}

export default TemplateMention
