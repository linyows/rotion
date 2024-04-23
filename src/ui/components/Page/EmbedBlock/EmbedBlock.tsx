import React, { useEffect } from 'react'
import { RichText } from '../RichText'
import type { EmbedBlockProps } from './EmbedBlock.types'

const Twitter = ({ block }: EmbedBlockProps) => {
  const htmlWithRemovedScript = block.embed.html.replace(/<script>.*/, '')
  const embedClass = 'rotion-embed-html'

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    document.getElementsByClassName(embedClass)[0].appendChild(script)
  }, [])

  return (
    <div className="rotion-embed">
      <div className="rotion-embed-twitter">
        <div className={embedClass} dangerouslySetInnerHTML={{ __html: htmlWithRemovedScript }} />
      </div>
      <div className="rotion-embed-caption">
        {block.embed.caption.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

const Speakerdeck = ({ block }: EmbedBlockProps) => {
  return (
    <div className="rotion-embed">
      <div className="rotion-embed-speakerdeck">
        <div className="rotion-embed-html" dangerouslySetInnerHTML={{ __html: block.embed.html }} />
      </div>
      <div className="rotion-embed-caption">
        {block.embed.caption.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

const EmbedBlock = ({ block }: EmbedBlockProps) => {
  if (block.embed?.html === undefined) {
    console.log('The html property for this embed block was undefined:', block)
    return <></>
  }

  if (block.embed.html.includes('twitter')) {
    return <Twitter block={block} />
  }

  if (block.embed.html.includes('speakerdeck')) {
    return <Speakerdeck block={block} />
  }

  return (
    <div className="rotion-embed">
      <div className="rotion-embed-html" dangerouslySetInnerHTML={{ __html: block.embed.html }} />
      <div className="rotion-embed-caption">
        {block.embed.caption.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default EmbedBlock
