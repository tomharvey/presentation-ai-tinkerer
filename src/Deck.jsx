import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js'

import 'reveal.js/dist/reveal.css'
import './flock-theme.css'

import Slides from './slides.jsx'

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

    deckRef.current.initialize()

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
