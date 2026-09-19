'use client'

import { useEffect, useRef, useState } from 'react'
import { StageWindow, VIEWS } from './view-stage.jsx'

// How long a word and its view stay before the caret erases it, and how fast
// it erases and types.
const HOLD = 3000
const ERASE = 45
const TYPE = 95

// The hero's headline names what the window under it is showing, and the two
// turn together: the caret erases the word, types the next one, and the
// window switches to that view as the last letter lands. The caret stays in
// the headline throughout, so the comma after the word never jumps. A reader
// who picks a tab has chosen what to look at, so the turning stops there;
// while the pointer or focus is in the window it waits.
export const HeroStage = ({ lead, words, trail, line2, labels, blocks, db, children }) => {
  const [current, setCurrent] = useState(0)
  const [text, setText] = useState(words[0])
  const [phase, setPhase] = useState('hold')
  const [auto, setAuto] = useState(true)
  const [reading, setReading] = useState(false)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(false)
  }, [])

  // The navbar wears the band's lemon while the band is under it, and goes
  // back to the page's own ground once the band has scrolled out from under
  // it. The state is kept on <body>, where the navbar's styles can see it;
  // not on <html>, whose attributes the Mermaid chart watches for a change of
  // theme and redraws itself on.
  const band = useRef(null)
  useEffect(() => {
    const root = document.body
    const navbar = document.querySelector('.nextra-navbar')
    const height = navbar ? navbar.getBoundingClientRect().height : 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delete root.dataset.lpPastBand
        else root.dataset.lpPastBand = ''
      },
      { rootMargin: `-${Math.round(height)}px 0px 0px 0px` }
    )
    observer.observe(band.current)
    return () => {
      observer.disconnect()
      delete root.dataset.lpPastBand
    }
  }, [])

  useEffect(() => {
    if (!auto) return
    const next = (current + 1) % VIEWS.length
    let step
    if (phase === 'hold') {
      if (reading) return
      step = [HOLD, () => setPhase('erase')]
    } else if (phase === 'erase') {
      step = text
        ? [ERASE, () => setText(text.slice(0, -1))]
        : [TYPE, () => setPhase('type')]
    } else if (phase === 'type') {
      const word = words[next]
      step =
        text.length < word.length
          ? [TYPE, () => setText(word.slice(0, text.length + 1))]
          : [
              0,
              () => {
                setCurrent(next)
                setPhase('hold')
              }
            ]
    }
    const timer = setTimeout(step[1], step[0])
    return () => clearTimeout(timer)
  }, [auto, reading, phase, text, current, words])

  const select = i => {
    setAuto(false)
    setCurrent(i)
    setText(words[i])
    setPhase('hold')
  }

  return (
    <div className="lp-band" ref={band}>
      <header className="lp-hero">
        <h1 className="lp-title" aria-label={`${lead}${words[current]}${trail}${line2}`}>
          <span aria-hidden="true" className="lp-title-line">
            {lead}
          </span>
          <span aria-hidden="true" className="lp-title-line">
            <span className="lp-word">{text}</span>
            <span className="lp-caret" data-typing={phase !== 'hold' || undefined} />
            {trail}
          </span>
          <span aria-hidden="true" className="lp-title-line">
            {line2}
          </span>
        </h1>
        {children}
      </header>
      <section className="lp-stage" aria-label={labels.region}>
        <StageWindow
          current={current}
          onSelect={select}
          blocks={blocks}
          db={db}
          labels={labels}
          onMouseEnter={() => setReading(true)}
          onMouseLeave={() => setReading(false)}
          onFocus={() => setReading(true)}
          onBlur={() => setReading(false)}
        />
      </section>
    </div>
  )
}
