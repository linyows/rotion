import React, { useEffect } from 'react'
import Prism from 'prismjs'
//import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-css'

export type CodeProps = {
  language: string
}

export const Code: React.FC<CodeProps> = ({ children, language = 'javascript' }) => {
  const cl = `language-${language.toLowerCase()}`
  //const text = children as string
  //const grammar = Prism.languages[language.toLowerCase()] || Prism.languages.javascript
  //const lang = language.toLowerCase() || Prism.languages.javascript
  //const html = Prism.highlight(text, grammar, lang)
  // <code className={cl} dangerouslySetInnerHTML={{ __html: html }} />
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <>
      <pre>
        <code className={cl}>{children}</code>
      </pre>
      <style jsx>{`
        pre {
          tab-size: 2;
        }
        code {
          overflow: auto;
          display: block;
          padding: 0.8rem;
          line-height: 1.5;
          background: #f5f5f5;
          font-size: 0.75rem;
          border-radius: var(--radius);
        }
      `}</style>
    </>
  )
}

export default Code
