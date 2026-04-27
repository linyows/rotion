'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CodeProps } from './Code.types'
import './Code.css'
import mermaid from 'mermaid'
import Prism from 'prismjs'
import 'prismjs/plugins/autoloader/prism-autoloader.js'
if (Prism.plugins.autoloader) {
  Prism.plugins.autoloader.languages_path = 'https://unpkg.com/prismjs@1.29.0/components/'
}

const isDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

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

const Code = ({ children, language = 'text' }: CodeProps) => {
  const preRef = useRef<HTMLPreElement>(null)
  const codeRef = useRef<HTMLElement>(null)

  const highlight = useCallback(
    async (language: string) => {
      if (language === 'mermaid') {
        if (!preRef.current) return
        mermaid.initialize({ theme: isDark() ? 'dark' : 'neutral' })
        try {
          await mermaid.run({ nodes: [preRef.current] })
        } catch (e) {
          console.error('mermaid render failed:', e)
        }
      } else {
        if (!codeRef.current) return
        setPrismCss()
        Prism.highlightElement(codeRef.current)
      }
    },
    [],
  )
  const cl = language === 'mermaid' ? 'mermaid' : `language-${language.toLowerCase()}`

  const [show, setShow] = useState(false)
  const showLang = () => setShow(true)
  const hideLang = () => setShow(false)

  useEffect(() => {
    highlight(language).catch((e) => console.error(e))
  }, [language, highlight])

  return (
    <div className="rotion-code-area" onMouseOver={showLang} onMouseOut={hideLang} onFocus={showLang} onBlur={hideLang}>
      {show && <div className="rotion-code-lang">{language}</div>}
      <pre ref={preRef} className={cl} suppressHydrationWarning>
        <code ref={codeRef} suppressHydrationWarning>
          {children}
        </code>
      </pre>
    </div>
  )
}

export default Code
