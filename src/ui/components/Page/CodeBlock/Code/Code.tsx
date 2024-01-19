import React, { useEffect, useState } from 'react'
import type { CodeProps } from './Code.types'

const Code = ({ children, language = 'text', modules }: CodeProps) => {
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

export default Code
