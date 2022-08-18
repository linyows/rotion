import React, { useState, useEffect } from 'react'
import Prism from 'prismjs'
import { TextObject } from './text'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-hcl'
import 'prismjs/components/prism-ignore'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-makefile'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-perl'
import 'prismjs/components/prism-puppet'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-vim'
import 'prismjs/components/prism-yaml'

import type {
  CodeBlockObjectResponse,
  RichTextItemResponse,
  TextRichTextItemResponse,
} from '../../types'

export type CodeProps = React.PropsWithChildren & {
  language: string
}

export type CodeBlockProps = {
  block: CodeBlockObjectResponse
}

export const Code: React.FC<CodeProps> = ({ children, language = 'text' }) => {
  const cl = `language-${language.toLowerCase()}`

  const [show, setShow] = useState(false)
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
      <style jsx global>{`
        code[class*="language-"],
        pre[class*="language-"] {
          color: black;
          background: none;
          text-shadow: 0 1px white;
          font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          font-size: 1em;
          text-align: left;
          white-space: pre;
          word-spacing: normal;
          word-break: normal;
          word-wrap: normal;
          line-height: 1.5;
          -moz-tab-size: 4;
          -o-tab-size: 4;
          tab-size: 4;
          -webkit-hyphens: none;
          -moz-hyphens: none;
          -ms-hyphens: none;
          hyphens: none;
        }

        pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
        code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
          text-shadow: none;
          background: #b3d4fc;
        }

        pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
        code[class*="language-"]::selection, code[class*="language-"] ::selection {
          text-shadow: none;
          background: #b3d4fc;
        }

        @media print {
          code[class*="language-"],
          pre[class*="language-"] {
            text-shadow: none;
          }
        }

        /* Code blocks */
        pre[class*="language-"] {
          padding: 1em;
          margin: .5em 0;
          overflow: auto;
        }

        :not(pre) > code[class*="language-"],
        pre[class*="language-"] {
          background: #f5f2f0;
        }

        /* Inline code */
        :not(pre) > code[class*="language-"] {
          padding: .1em;
          border-radius: .3em;
          white-space: normal;
        }

        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: slategray;
        }

        .token.punctuation {
          color: #999;
        }

        .token.namespace {
          opacity: .7;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #905;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #690;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #9a6e3a;
          /* This background color was intended by the author of this theme. */
          background: hsla(0, 0%, 100%, .5);
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: #07a;
        }

        .token.function,
        .token.class-name {
          color: #DD4A68;
        }

        .token.regex,
        .token.important,
        .token.variable {
          color: #e90;
        }

        .token.important,
        .token.bold {
          font-weight: bold;
        }
        .token.italic {
          font-style: italic;
        }

        .token.entity {
          cursor: help;
        }
      `}</style>
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
