import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js'

import 'reveal.js/dist/reveal.css'
import './flock-theme.css'

import Slides from './slides.jsx'

// Where the step eyebrow sits, in canvas coordinates (the deck is 1280x720 and
// reveal scales the whole thing). 40 is set by the tallest step slide: the
// memory slide's content runs from canvas y78 to y623, so the header has to
// clear 78. Canvas coordinates are scale-invariant, so this holds on any
// projector. Raise it and the memory slide collides.
const HEADER_Y = 40

/* Pin the "N of five" eyebrow to the same line on every step slide.
 *
 * It can't be done in CSS. reveal centres each slide by setting `top` on the
 * <section>, and it transforms sections during transitions — which makes the
 * section the containing block for BOTH absolute and fixed descendants. So a
 * header positioned inside the section inherits that slide's centring offset
 * and lands somewhere different each time; measured, it swung 124px.
 *
 * So subtract the offset: place the eyebrow at HEADER_Y minus whatever reveal
 * gave this section. Runs on every slide change and on resize, because reveal
 * recomputes centring on layout. */
function pinStepHeaders(deck) {
  deck.getSlides().forEach((section) => {
    const step = section.querySelector('.step')
    if (!step) return
    const offset = parseFloat(getComputedStyle(section).top) || 0
    step.style.top = `${HEADER_Y - offset}px`
  })
}

export default function Deck() {
  const deckDivRef = useRef(null)
  const deckRef = useRef(null)

  useEffect(() => {
    if (deckRef.current) return

    deckRef.current = new Reveal(deckDivRef.current, {
      plugins: [RevealNotes],
      hash: true,
      transition: 'fade',
      transitionSpeed: 'fast',
      controls: true,
      center: true,
      progress: true,
      slideNumber: 'c/t',
      // 10-minute slot. Speaker view (press S) paces against this.
      totalTime: 600,
      // Fixed canvas — reveal scales it to any projector.
      width: 1280,
      height: 720,
      margin: 0.08,
      minScale: 0.2,
      maxScale: 2.0,
    })

    deckRef.current.initialize().then(() => {
      const deck = deckRef.current
      if (!deck) return
      const pin = () => pinStepHeaders(deck)
      pin()
      deck.on('slidechanged', pin)
      deck.on('resize', pin)
    })

    return () => {
      try {
        deckRef.current?.destroy()
        deckRef.current = null
      } catch {
        // reveal throws if the DOM is already gone; nothing to clean up then
      }
    }
  }, [])

  return (
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        <Slides />
      </div>
    </div>
  )
}
