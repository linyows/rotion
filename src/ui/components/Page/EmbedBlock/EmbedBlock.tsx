import React, { useEffect } from 'react'
import { RichText } from '../RichText'
import type { EmbedBlockProps } from './EmbedBlock.types'
import Stylex from '@stylexjs/stylex'
import { fontFamily } from '../../tokens.stylex'

const style = Stylex.create({
  wrapper: {
    fontFamily: fontFamily.sansserif,
    width: '100%',
    textAlign: 'center',
  },
  html: {
    width: '100%',
    textAlign: 'center',
  },
  caption: {
    margin: '.3rem .3rem 0',
    textAlign: 'left',
    color: '#888',
    fontSize: '.95rem',
  },
  twitter: {
    maxWidth: '550px',
    margin: '0 auto',
  },
  speakerdeck: {
    maxWidth: '710px',
    margin: '0 auto',
    paddingBottom: '56.25%', /* 16:9 */
    position: 'relative',
    height: 0,
  },
})

const Twitter = ({ block }: EmbedBlockProps) => {
  const htmlWithRemovedScript = block.embed.html.replace(/<script>.*/, '')
  const embedClass = 'rotion-embed-html'

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    document.getElementsByClassName(embedClass)[0].appendChild(script)
  }, [])

  return (
    <div className={`rotion-embed ${Stylex(style.wrapper)}`}>
      <div className={`rotion-embed-twitter ${Stylex(style.twitter)}`}>
        <div className={`${embedClass} ${Stylex(style.html)}`} dangerouslySetInnerHTML={{ __html: htmlWithRemovedScript }} />
        <div className={`rotion-embed-caption ${Stylex(style.caption)}`}>
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
    <div className={`rotion-embed ${Stylex(style.wrapper)}`}>
      <div className={`rotion-embed-speakerdeck ${Stylex(style.speakerdeck)}`}>
        <div className={`rotion-embed-html ${Stylex(style.html)}`} dangerouslySetInnerHTML={{ __html: block.embed.html }} />
        <div className={`rotion-embed-caption ${Stylex(style.caption)}`}>
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

  if (block.embed.html.includes('twitter')) {
    return <Twitter block={block} />
  }

  if (block.embed.html.includes('speakerdeck')) {
    return <Speakerdeck block={block} />
  }

  return (
    <div className={`rotion-embed ${Stylex(style.wrapper)}`}>
      <div className={'rotion-embed-html'} dangerouslySetInnerHTML={{ __html: block.embed.html }} />
      <div className="rotion-embed-caption">
        {block.embed.caption.map((v, i) => (
          <RichText textObject={v} key={`richtext-${i}`} />
        ))}
      </div>
    </div>
  )
}

export default EmbedBlock
