import React, { useEffect } from 'react'
import TextBlock from '../TextBlock/TextBlock'
import type { EmbedBlockProps } from './EmbedBlock.types'

const TwitterBlock = ({ block }: EmbedBlockProps) => {
  const htmlWithRemovedScript = block.embed.html.replace(/<script>.*/, '')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    document.getElementsByClassName('notionate-blocks-embed-inner')[0].appendChild(script)
  }, [])

  return (
    <div className="notionate-blocks-embed notionate-blocks-embed-twitter">
      <div className="notionate-blocks-embed-inner" dangerouslySetInnerHTML={{ __html: htmlWithRemovedScript }} />
      <div className="notionate-blocks-embed-caption">
        <TextBlock tag="span" block={block.embed.caption} />
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
    return (
      <TwitterBlock block={block} />
    )
  }

  const providerClass = block.embed.html.includes('speakerdeck') ? ' notionate-blocks-embed-speakerdeck' : ''

  return (
    <div className="notionate-blocks-embed">
      <div className={`notionate-blocks-embed-inner${providerClass}`} dangerouslySetInnerHTML={{ __html: block.embed.html }} />
      <div className="notionate-blocks-embed-caption">
        <TextBlock tag="span" block={block.embed.caption} />
      </div>
    </div>
  )
}

export default EmbedBlock
