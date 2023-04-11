import React, { useState, useEffect } from 'react'
import Prism from 'prismjs'
import mermaid from 'mermaid'
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
} from '../../server/types'

export type CodeProps = React.PropsWithChildren & {
  language: string
}

export type CodeBlockProps = {
  block: CodeBlockObjectResponse
}

export const Code: React.FC<CodeProps> = ({ children, language = 'text' }) => {
  const codeRef = React.createRef<HTMLPreElement>()
  const highlight = async (language: string) => {
    if (codeRef.current) {
      if (language === 'mermaid') {
        mermaid.init({}, codeRef.current as HTMLPreElement)
      } else {
        Prism.highlightElement(codeRef.current as Element)
      }
    }
  }
  const cl = `language-${language.toLowerCase()}`

  const [show, setShow] = useState(false)
  const showLang = () => setShow(true)
  const hideLang = () => setShow(false)

  useEffect(() => {
    highlight(language)
  }, [language, ''])

  return (
    <div className="notionate-blocks-code" onMouseOver={showLang} onMouseOut={hideLang}>
      {show && <div className="notionate-blocks-code-lang">
        {language}
      </div>}
      <pre className={cl}>
        <code ref={codeRef}>
          {children}
        </code>
      </pre>
    </div>
  )
}

const CodeBlock: React.FC<CodeBlockProps> = ({ block }) => {
  const els = block.code?.rich_text.map((textObject, i) => {
    const text = textObject as TextRichTextItemResponse
    return (
      <Code language={block.code?.language || ''} key={`${i}`}>
        {text.text.content}
      </Code>
    )
  })

  const captions = block.code?.caption.map((v, i) => {
    return (
      <TextObject textObject={v as RichTextItemResponse} key={`${i}`} />
    )
  })

  return (
    <>
      {els}
      <div className="notionate-blocks-code-caption">
        {captions}
      </div>
    </>
  )
}

export default CodeBlock
