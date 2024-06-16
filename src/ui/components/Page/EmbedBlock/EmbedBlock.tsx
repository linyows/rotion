import React, { useEffect } from 'react'
import Caption from '../../RichText/Caption'
import type { EmbedBlockProps, EmbedProps, OembedProps } from './EmbedBlock.types'
import '../../tokens.css'
import './EmbedBlock.css'

const Instagram = ({ html, caption }: OembedProps) => {
  const htmlWithRemovedScript = html.replace(/<script>.*/, '')
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
        <Caption type="embed" caption={caption} />
      </div>
    </div>
  )
}

const Twitter = ({ html, caption }: OembedProps) => {
  const htmlWithRemovedScript = html.replace(/<script>.*/, '')
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
        <Caption type="embed" caption={caption} />
      </div>
    </div>
  )
}

const Tiktok = ({ html, caption }: OembedProps) => {
  const htmlWithRemovedScript = html.replace(/<script>.*/, '')
  const embedClass = 'rotion-embed-html'

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    document.getElementsByClassName(embedClass)[0].appendChild(script)
  }, [])

  return (
    <div className="rotion-embed">
      <div className="rotion-embed-tiktok">
        <div className={embedClass} dangerouslySetInnerHTML={{ __html: htmlWithRemovedScript }} />
        <Caption type="embed" caption={caption} />
      </div>
    </div>
  )
}

const Embed = ({ type, html, caption }: EmbedProps) => {
  return (
    <div className="rotion-embed">
      <div className={`rotion-embed-${type}`}>
        <div className="rotion-embed-html" dangerouslySetInnerHTML={{ __html: html }} />
        <Caption type="embed" caption={caption} />
      </div>
    </div>
  )
}

const EmbedBlock = ({ block }: EmbedBlockProps) => {
  const { embed: { html, caption } } = block
  if (html === undefined) {
    console.log('The html property for this embed block was undefined:', block)
    return <></>
  }

  if (html.includes('instagram')) {
    return <Instagram html={html} caption={caption} />
  }
  if (html.includes('twitter')) {
    return <Twitter html={html} caption={caption} />
  }
  if (html.includes('tiktok')) {
    return <Tiktok html={html} caption={caption} />
  }
  if (html.includes('speakerdeck')) {
    return <Embed type="speakerdeck" html={html} caption={caption} />
  }
  if (html.includes('music.apple.com')) {
    return <Embed type="applemusic" html={html} caption={caption} />
  }
  if (html.includes('google')) {
    return <Embed type="googlemap" html={html} caption={caption} />
  }

  return (
    <div className="rotion-embed">
      <div className="rotion-embed-html" dangerouslySetInnerHTML={{ __html: html }} />
      <Caption type="embed" caption={caption} />
    </div>
  )
}

export default EmbedBlock
