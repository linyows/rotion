'use client'

import React, { useEffect, useState } from 'react'
import type { CodeProps } from './Code.types'
import './Code.css'
import mermaid from 'mermaid'
import Prism from 'prismjs'
import 'prismjs/plugins/autoloader/prism-autoloader'
if (Prism.plugins.autoloader) {
  Prism.plugins.autoloader.languages_path = 'https://unpkg.com/prismjs@1.29.0/components/'
}

const Code = ({ children, language = 'text' }: CodeProps) => {
  const isDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches
  const codeRef = React.createRef<HTMLPreElement>()

  const setPrismCss = () => {
    const id = 'prism-theme'
    const link = window.document.getElementById(id)
    if (link && 'href' in link) {
      link.href = `https://unpkg.com/prismjs@1.29.0/themes/${isDark() ? 'prism-tomorrow.min.css' : 'prism.min.css'}`
    } else {
      const newlink = window.document.createElement('link')
      newlink.rel = 'stylesheet'
      newlink.id = id
      newlink.href = `https://unpkg.com/prismjs@1.29.0/themes/${isDark() ? 'prism-tomorrow.min.css' : 'prism.min.css'}`
      window.document.head.appendChild(newlink)
    }
  }

  const highlight = async (language: string) => {
    if (codeRef.current) {
      if (language === 'mermaid') {
        mermaid.initialize({ theme: isDark() ? 'dark' : 'neutral' })
        mermaid.init(undefined, codeRef.current as HTMLPreElement)
      } else {
        setPrismCss()
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
    <div className="rotion-code-area" onMouseOver={showLang} onMouseOut={hideLang}>
      {show && <div className="rotion-code-lang">
        {language}
      </div>}
      <pre className={cl} suppressHydrationWarning>
        <code ref={codeRef} suppressHydrationWarning>
          {children}
        </code>
      </pre>
    </div>
  )
}

export default Code
