import React, { useEffect, useState } from 'react'
import type { CodeProps } from './Code.types'
import Stylex from '@stylexjs/stylex'
import mermaid from 'mermaid'
import Prism from 'prismjs'

const style = Stylex.create({
  wrapper: {
    borderRadius: '4px',
    padding: '.6rem 1rem',
    backgroundColor: '#f5f2f0',
    margin: '1rem 0',
    fontSize: '.8rem',
    position: 'relative',
    top: 0,
    left: 0,
  },
  lang: {
    position: 'absolute',
    top: '.5rem',
    left: '.8rem',
    color: '#999',
    fontSize: '.75rem',
    textTransform: 'capitalize',
    display: 'block',
  },
})

const Code = ({ children, language = 'text' }: CodeProps) => {
  const codeRef = React.createRef<HTMLPreElement>()
  const highlight = async (language: string) => {
    if (codeRef.current) {
      if (language === 'mermaid') {
        mermaid.init(undefined, codeRef.current as HTMLPreElement)
      } else {
        Prism.highlightElement(codeRef.current as Element)
      }
    }
  }
  const cl = language === 'mermaid' ? 'mermaid' : `language-${language.toLowerCase()}`

  const [show, setShow] = useState(false)
  const showLang = () => setShow(true)
  const hideLang = () => setShow(false)

  useEffect(() => {
    highlight(language)
  }, [language, ''])

  return (
    <div className={`rotion-code-text ${Stylex(style.wrapper)}`} onMouseOver={showLang} onMouseOut={hideLang}>
      {show && <div className={`rotion-code-lang ${Stylex(style.lang)}`}>
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
