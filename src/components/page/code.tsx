import React, { useState, useEffect } from 'react'
import Prism from 'prismjs'
import { TextObject } from './text'

import type {
  CodeBlockObjectResponse,
  RichTextItemResponse,
  TextRichTextItemResponse,
} from '../../types'

export type CodeProps = {
  language: string
}

export type CodeBlockProps = {
  block: CodeBlockObjectResponse
}

export const Code: React.FC<CodeProps> = ({ children, language = 'text' }) => {
  const cl = `language-${language.toLowerCase()}`

  const [show, setShow] = React.useState(false)
  const showLang = () => setShow(true)
  const hideLang = () => setShow(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="code" onMouseOver={showLang} onMouseOut={hideLang}>
      {show && <div className="code-lang">
        {language}
      </div>}
      <pre className={cl}>
        <code>
          {children}
        </code>
      </pre>
      <style jsx>{`
        .code {
          border-radius: 3px;
          padding: .6rem 1rem;
          background-color: #f5f2f0;
          margin: 1rem 0;
          font-size: .8rem;
          position: relative;
          top: 0;
          left: 0;
        }
        .code-lang {
          position: absolute;
          top: .5rem;
          left: .8rem;
          color: #999;
          font-size: .75rem;
          text-transform: capitalize;
          display: block;
        }
      `}</style>
    </div>
  )
}

const CodeBlock: React.FC<CodeBlockProps> = ({ block }) => {
  const els = block.code?.rich_text.map((textObject, i) => {
    const text = textObject as TextRichTextItemResponse
    return (
      <Code language={block.code?.language || ''} key={i}>
        {text.text.content}
      </Code>
    )
  })

  const captions = block.code?.caption.map((v, i) => {
    return TextObject({ textObject: v as RichTextItemResponse, key: `${i}` })
  })

  return (
    <>
      {els}
      <div className="code-caption">
        {captions}
      </div>
      <style jsx>{`
        .code-caption {
          margin: .3rem .3rem 0;
          text-align: left;
          color: #888;
          font-size: .95rem;
        }
      `}</style>
    </>
  )
}

export default CodeBlock
