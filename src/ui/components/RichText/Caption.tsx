import RichText from './RichText.js'
import type { CaptionProps } from './RichText.types'

const Caption = ({ type, caption }: CaptionProps) => {
  return (
    <div className={`rotion-${type}-caption`}>
      {caption.map((v, i) => (
        <RichText textObject={v} key={`${v.plain_text || 'empty'}-${i}`} />
      ))}
    </div>
  )
}

export default Caption
