import React, { useEffect } from 'react'
import { RichText } from '../../RichText'
import type { EmbedBlockProps } from './EmbedBlock.types'

const Instagram = ({ block }: EmbedBlockProps) => {
  const htmlWithRemovedScript = block.embed.html.replace(/<script>.*/, '')
  const embedClass = 'rotion-embed-html'

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    document.getElementsByClassName(embedClass)[0].appendChild(script)
    // @ts-ignore
    if (window.instgrm) {
      // @ts-ignore
      window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <div className="rotion-embed">
      <div className="rotion-embed-instagram">
        <div className={embedClass} dangerouslySetInnerHTML={{ __html: htmlWithRemovedScript }} />
        <div className="rotion-embed-caption">
          {block.embed.caption.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

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
        <div className="rotion-embed-caption">
          {block.embed.caption.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Speakerdeck = ({ block }: EmbedBlockProps) => {
  return (
    <div className="rotion-embed">
      <div className="rotion-embed-speakerdeck">
        <div className="rotion-embed-html" dangerouslySetInnerHTML={{ __html: block.embed.html }} />
        <div className="rotion-embed-caption">
          {block.embed.caption.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Applemusic = ({ block }: EmbedBlockProps) => {
  return (
    <div className="rotion-embed">
      <div className="rotion-embed-applemusic">
        <div className="rotion-embed-html" dangerouslySetInnerHTML={{ __html: block.embed.html }} />
        <div className="rotion-embed-caption">
          {block.embed.caption.map((v, i) => (
            <RichText textObject={v} key={`richtext-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

const EmbedBlock = ({ block }: EmbedBlockProps) => {
  if (block.embed?.html === undefined) {
    console.log('The html property for this embed block was undefined:', block)
    return <></>
  }

  if (block.embed.html.includes('instagram')) {
    return <Instagram block={block} />
  }

  if (block.embed.html.includes('twitter')) {
    return <Twitter block={block} />
  }

  if (block.embed.html.includes('speakerdeck')) {
    return <Speakerdeck block={block} />
  }

  if (block.embed.html.includes('music.apple.com')) {
    return <Applemusic block={block} />
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
