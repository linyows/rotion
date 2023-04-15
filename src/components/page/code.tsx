import React, { useState, useEffect } from 'react'
import { TextObject } from './text'
import type { ExternalModules } from './handler'

import type {
  CodeBlockObjectResponse,
  RichTextItemResponse,
  TextRichTextItemResponse,
} from '../../server/types'

export type CodeProps = React.PropsWithChildren & {
  language: string
  modules?: ExternalModules
}

export type CodeBlockProps = {
  block: CodeBlockObjectResponse
  modules?: ExternalModules
}

export const Code: React.FC<CodeProps> = ({ children, language = 'text', modules }) => {
  const codeRef = React.createRef<HTMLPreElement>()
  const highlight = async (language: string) => {
    if (codeRef.current) {
      if (language === 'mermaid' && modules?.mermaid) {
        modules.mermaid.init(undefined, codeRef.current as HTMLPreElement)
      } else if (modules?.prism) {
        modules.prism.highlightElement(codeRef.current as Element)
      } else {
        console.log('block component require prismjs or mermaidjs modules argument')
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

const CodeBlock: React.FC<CodeBlockProps> = ({ block, modules }) => {
  const els = block.code?.rich_text.map((textObject, i) => {
    const text = textObject as TextRichTextItemResponse
    return (
      <Code language={block.code?.language || ''} key={`${i}`} modules={modules}>
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
