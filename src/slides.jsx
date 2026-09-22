import lockup from './assets/flock-admiral-yellow-side.png'

/* Slide titles are statements, per the Flock Communication Playbook rule 04
   and tokens.json /voice/rules. Read the eight content titles alone and you
   get the whole argument (slide 1 is a holding card and says nothing). Speaker notes carry the run sheet — press S.

   LANGUAGE RULE: this is an AI-builder room, so AI vocabulary is fair game
   (prompt, agent, hallucinate, tokens). Software-engineering vocabulary is
   not — no breakpoints, font stacks, PRs, merges, Node versions or
   parallelising. If a word would stop a marketer, it is out.

   Every slide carries a grounding artefact. These are deck-native renderings
   of real content, deliberately NOT mock screenshots — the talk's credibility
   rests on these having actually happened. */

import { useEffect, useRef, useState } from 'react'

/* Three cold opens are built. One shows at a time, so the deck is always 9
   slides and the counter tells the truth.

   Switch between them WITHOUT EDITING ANYTHING:
     · press C while the deck has focus, to cycle card → belt → portrait
     · or open the deck with ?open=belt / ?open=portrait

   'targets'  — the default: the guesses are numbers somebody is carrying
   'guess'    — the same in words rather than figures
   'belt'     — the feature factory, which predates all of this
   'portrait' — the homepage that can describe everything about itself but why */
const COLD_OPENS = ['targets', 'guess', 'belt', 'portrait']

function useColdOpen() {
  const [which, setWhich] = useState(() => {
    const asked = new URLSearchParams(window.location.search).get('open')
    return COLD_OPENS.includes(asked) ? asked : COLD_OPENS[0]
  })

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'c' && e.key !== 'C') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      setWhich((cur) => COLD_OPENS[(COLD_OPENS.indexOf(cur) + 1) % COLD_OPENS.length])
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return which
}

/* Bump a key every time this slide becomes the visible one, so a CSS-driven
   build replays on re-entry instead of showing its finished state. */
function useReplayOnEnter() {
  const [run, setRun] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const section = ref.current?.closest('section')
    if (!section) return
    const onChange = (e) => {
      if (e.currentSlide === section) setRun((n) => n + 1)
    }
    document.addEventListener('slidechanged', onChange)
    return () => document.removeEventListener('slidechanged', onChange)
  }, [])
  return [run, ref]
}

/* Replay a staged animation every time its slide becomes the visible one, so
   stepping back to a slide shows the build again rather than the end state. */
function useSlideStages(count, gap) {
  const [stage, setStage] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current?.closest('section')
    if (!section) return
    let timers = []
    const run = () => {
      timers.forEach(clearTimeout)
      setStage(0)
      timers = Array.from({ length: count }, (_, i) =>
        setTimeout(() => setStage(i + 1), (i + 1) * gap)
      )
    }
    const onChange = (e) => {
      if (e.currentSlide === section) run()
    }
    document.addEventListener('slidechanged', onChange)
    if (section.classList.contains('present')) run()
    return () => {
      timers.forEach(clearTimeout)
      document.removeEventListener('slidechanged', onChange)
    }
  }, [count, gap])

  return [stage, ref]
}

/* ---------------------------------------------------------------- slide 1 */
/* The site sits there, perfectly well built, while a thought rises off it
   guessing at what it might be for. The guess pops. Another rises. Four of
   them, round and round.

   The loop is deliberate and it is the whole argument: the problem isn't that
   any one guess is wrong — every one of them is plausible — it's that the
   thing never arrives at an answer and never will, because nobody told it.

   Thought bubble, not speech: the trailing circles are what make that read,
   and it's why the outline is scalloped rather than a rounded rectangle.

   Each guess swells, holds, then drifts up and to the right, growing as it
   fades. A thought that floats off reads as unresolved; one that pops in place
   reads as answered and dismissed, which is the opposite of the point. */
/* Three of these are funnel stages — money in, users in, users kept. The
   third deliberately isn't: it's a cost reason, not a growth one. If all four
   agreed with each other the slide would just be showing a funnel; pulling in
   different directions is what makes the point that nobody has settled what
   the thing is for. Swap freely, but keep one that breaks the pattern, and
   keep them all under about 20 characters or they overflow the cloud. */
const PURPOSES = [
  'Take money',
  'Sign up users',
  'Cut the calls',
  'Retain users',
]

/* The same guesses as actual targets — the version somebody in the building
   is genuinely carrying. A number needs a label to mean anything, so these
   render on two lines rather than one. Keep the figure to about 6 characters
   and the label under 20, or they crowd the cloud. */
const TARGETS = [
  { fig: '+20%', label: 'more sales' },
  { fig: '1,000', label: 'signups a day' },
  { fig: '\u2212100', label: 'support requests' },
  { fig: '+15%', label: 'weekly returns' },
]

/* Scalloped outline: thirteen arcs around an ellipse, each bump given a
   slightly different radius so the edge reads as drawn rather than generated.
   An even walk produces a rosette, which looks mechanical. A border-radius
   oval reads as a speech bubble, which is wrong in a different way.
   Proportioned to hug the text — an over-wide cloud reads as an empty
   balloon. */
const CLOUD =
  'M186.0 25.5 A50.5 50.5 0 0 1 260.3 33.5 A39.7 39.7 0 0 1 327.2 ' +
  '49.2 A19.0 19.0 0 0 1 342.8 77.2 A18.3 18.3 0 0 1 343.9 105.4 ' +
  'A37.1 37.1 0 0 1 295.3 128.1 A46.4 46.4 0 0 1 223.7 138.7 ' +
  'A48.0 48.0 0 0 1 145.8 142.3 A46.0 46.0 0 0 1 81.8 126.0 A31.5 ' +
  '31.5 0 0 1 30.4 105.1 A19.0 19.0 0 0 1 29.3 77.2 A22.0 22.0 0 ' +
  '0 1 55.7 51.9 A33.0 33.0 0 0 1 108.8 31.4 A44.7 44.7 0 0 1 ' +
  '186.0 25.5 Z'

function ThinkingSite({ metric = false }) {
  const items = metric ? TARGETS : PURPOSES
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 2800)
    return () => clearInterval(id)
  }, [items.length])

  const item = items[i]

  return (
    <div className="thinksite">
      {/* keys remount these each cycle so the swell / hold / pop replays */}
      <span className="trail t2" key={`b-${i}`} />
      <span className="trail t1" key={`a-${i}`} />
      <div className="thought" key={i}>
        <svg
          viewBox="0 0 372 168"
          role="img"
          aria-label={metric ? `${item.fig} ${item.label}` : item}
        >
          <path d={CLOUD} />
          {metric ? (
            <>
              <text className="fig" x="186" y="86" textAnchor="middle">{item.fig}</text>
              <text className="lbl" x="186" y="114" textAnchor="middle">{item.label}</text>
            </>
          ) : (
            <text x="186" y="93" textAnchor="middle">{item}</text>
          )}
        </svg>
      </div>

      <div className="site">
        <div className="chrome">
          <i /><i /><i />
          <p className="url">flockcover.com</p>
        </div>
        <div className="body">
          <div className="nav">
            <p className="brand">FLOCK</p>
            <i /><i /><i />
          </div>
          <span className="ln" style={{ width: '86%' }} />
          <span className="ln" style={{ width: '62%' }} />
          <span className="cta" />
          <div className="cards">
            <i /><i /><i />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- slide 2 */
/* The whole diagram is present from the moment the slide arrives. It used to
   build box by box; that was cut — there's nothing to discover in the order,
   and the build made the room wait to see a picture they could have read at
   once. The only motion left is the dashes travelling round, which is the one
   thing that says "this keeps going". */
function LoopDiagram() {
  return (
    <svg
      className="loop-svg"
      viewBox="0 0 760 210"
      role="img"
      aria-label="Customers act, it notices, work with purpose, it ships, and it watches what changed"
    >
      <g>
        <rect x="4" y="52" width="150" height="58" rx="3" />
        <text x="79" y="86" textAnchor="middle">Customers act</text>
      </g>

      <g>
        <line className="flow" x1="160" y1="81" x2="208" y2="81" />
        <path d="M200 75 L210 81 L200 87 Z" fill="#3b484c" stroke="none" />
        <rect x="214" y="52" width="130" height="58" rx="3" />
        <text x="279" y="86" textAnchor="middle">It notices</text>
      </g>

      <g>
        <line className="flow" x1="350" y1="81" x2="398" y2="81" />
        <path d="M390 75 L400 81 L390 87 Z" fill="#3b484c" stroke="none" />
        <rect className="hl" x="404" y="42" width="180" height="78" rx="3" />
        <text className="hl" x="494" y="86" textAnchor="middle">Work with purpose</text>
      </g>

      <g>
        <line className="flow" x1="590" y1="81" x2="638" y2="81" />
        <path d="M630 75 L640 81 L630 87 Z" fill="#3b484c" stroke="none" />
        <rect x="644" y="52" width="110" height="58" rx="3" />
        <text x="699" y="86" textAnchor="middle">It ships</text>
        <path
          className="back flow"
          d="M699 118 L699 172 Q699 182 689 182 L89 182 Q79 182 79 172 L79 118"
        />
        <path d="M73 128 L79 116 L85 128 Z" fill="#f6f404" stroke="none" />
        <text className="hl" x="389" y="204" textAnchor="middle">
          It watches what changed
        </text>
      </g>
    </svg>
  )
}

/* ---------------------------------------------------------------- slide 2 */
/* The first half is the loss, the second is what replaced it. Both are on
   screen together — the delayed reveal was tried and cut. Say the first half,
   pause, then say the second: the beat belongs to you, not the slide.

   "The what" rather than "what we build": the latter reads as not caring
   whether the thing is any good, which is the opposite of the argument and
   exactly the fear this room already has. "The what" reads as the category of
   decision, which is what actually moved. */
function WhatThenWhy() {
  const [run, ref] = useReplayOnEnter()
  return (
    <div ref={ref} key={run} style={{ width: '100%' }}>
      <h2>
        We stopped caring about the what.{' '}
        <span className="second">We care about the why.</span>
      </h2>
    </div>
  )
}

/* ---------------------------------------------------------------- slide 3 */
function SloppyVerdict() {
  const [run, ref] = useReplayOnEnter()
  return (
    <div ref={ref} key={run} style={{ width: '100%' }}>
      <h2>
        &ldquo;The agent did it&rdquo; is not a reason.{' '}
        <span className="second">It&rsquo;s just sloppy.</span>
      </h2>
    </div>
  )
}

/* ---------------------------------------------------------------- slide 6 */
/* The same loop twice. On the left the person is a station on it — every
   revolution has to pass through them, and it runs slower for exactly that
   reason. On the right the person is outside it, and the loop never settles on
   a shape: it swells, flattens and stretches while staying one closed circuit.
   That is the argument in motion — a loop doesn't have to be a circle to be a
   loop.

   EVERYTHING ON THE RIGHT COMES OFF ONE CLOCK, computed here in JS. Earlier
   versions drove the ellipse from a CSS keyframe and the arms from SMIL, and
   then both from SMIL; both times the two ran on separate timebases and the
   arms drifted out of alignment with the edge they are supposed to be attached
   to — by as much as 32px, and in one version the arms sat still for a whole
   cycle before starting. Deriving the arm endpoints from the same rx that
   draws the ellipse makes drift impossible. Don't split them again. */

const MORPH = {
  period: 7000,
  stops: [0, 0.3, 0.55, 0.8, 1],
  rx: [56, 88, 46, 78, 56],
  ry: [56, 32, 64, 40, 56],
}

/* The left-hand loop runs freely until a person appears on it, grinds to a
   stop while they're there, and picks up again once they're gone. That cycle
   is the argument: the loop isn't slow because it's badly built, it's slow
   because someone is standing in it. */
const STALL = {
  period: 6000,
  runTo: 0.35, // free-running
  stopBy: 0.5, // decelerating
  holdTo: 0.8, // stalled, person present
  goBy: 0.95, // accelerating again
}

const smooth = (u) => u * u * (3 - 2 * u)

/* It labours while the person is on it — it does not halt. A dead stop reads as
   broken; a crawl reads as a queue, which is the actual claim. */
const CRAWL = 0.12

function stallAt(p) {
  const { runTo, stopBy, holdTo, goBy } = STALL
  if (p < runTo) return { speed: 1, person: 0 }
  if (p < stopBy) {
    const u = smooth((p - runTo) / (stopBy - runTo))
    return { speed: 1 - u * (1 - CRAWL), person: u }
  }
  if (p < holdTo) return { speed: CRAWL, person: 1 }
  if (p < goBy) {
    const u = smooth((p - holdTo) / (goBy - holdTo))
    return { speed: CRAWL + u * (1 - CRAWL), person: 1 - u }
  }
  return { speed: 1, person: 0 }
}

function morphAt(t) {
  const { stops, rx, ry } = MORPH
  let i = 0
  while (i < stops.length - 2 && t > stops[i + 1]) i++
  const span = stops[i + 1] - stops[i]
  const u = span === 0 ? 0 : (t - stops[i]) / span
  const e = u * u * (3 - 2 * u) // ease in-out
  return {
    rx: rx[i] + (rx[i + 1] - rx[i]) * e,
    ry: ry[i] + (ry[i + 1] - ry[i]) * e,
  }
}

function InOrAbove() {
  const [shape, setShape] = useState(() => morphAt(0))
  const [left, setLeft] = useState({ offset: 0, person: 0 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const start = performance.now()
    let last = start
    let offset = 0
    const tick = (now) => {
      const dt = Math.min(now - last, 64)
      last = now
      const elapsed = now - start
      setShape(morphAt((elapsed % MORPH.period) / MORPH.period))

      // dash offset is accumulated, not derived, because the speed varies —
      // deriving it from elapsed time would make it jump when the rate changes
      const { speed, person } = stallAt((elapsed % STALL.period) / STALL.period)
      offset -= (dt / 1000) * 46 * speed
      setLeft({ offset, person })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const cx = 452
  const cy = 116
  const { rx, ry } = shape
  const leftX = cx - rx
  const rightX = cx + rx

  return (
    <svg
      className="schematic"
      viewBox="0 0 620 200"
      role="img"
      aria-label="Left: a person standing on the loop, so every revolution passes through them. Right: the loop runs closed and keeps changing shape while the person outside it stays attached to its edges."
    >
      {/* ---- in it ---- */}
      <text x="18" y="16">In it</text>
      <circle
        className="ring ring-left"
        cx="130"
        cy="108"
        r="56"
        style={{ strokeDashoffset: left.offset }}
      />
      <circle className="you" cx="130" cy="52" r="10" opacity={left.person} />
      <text className="tiny" x="142" y="190" textAnchor="middle">
        every pass comes through you
      </text>

      {/* ---- above it: shape and arms from the same numbers ---- */}
      <text x="338" y="16">Above it</text>
      <ellipse className="ring flow" cx={cx} cy={cy} rx={rx} ry={ry} />
      <circle className="you" cx={cx} cy="30" r="10" />
      <path
        className="pull"
        d={`M${cx - 14} 38 Q${(cx - 14 + leftX) / 2 - 6} 62 ${leftX} ${cy}`}
      />
      <path
        className="pull"
        d={`M${cx + 14} 38 Q${(cx + 14 + rightX) / 2 + 6} 62 ${rightX} ${cy}`}
      />
      <text className="tiny" x={cx} y="190" textAnchor="middle">
        you change its shape
      </text>
    </svg>
  )
}

export default function Slides() {
  const COLD_OPEN = useColdOpen()

  return (
    <>
      {/* 0 ────────────────────────────────────── holding slide */}
      {/* Up before you are. This is what the room looks at while you walk on,
          so it carries identity and nothing else — no argument, no question,
          nothing to read ahead. The talk starts on the next slide.

          No event name: that was tried and cut. The room knows where it is. */}
      <section className="titlecard">
        <div className="identity">
          <img src={lockup} alt="Flock by Admiral" />
          <p className="who">
            <b>Tom Harvey</b> &middot; Head of AI
          </p>
        </div>
        <aside className="notes">
          1 OPEN{'\n\n'}
          vans · your parcel · all need insuring{'\n'}
          that's Flock. data = secret sauce{'\n'}
          crash less · safer · MORE MONEY{'\n'}
          head of AI = the whole company{'\n'}
          data + AI = why Admiral paid £110m{'\n\n'}
          → prod+eng story — but everyone wants AI doing more of their job{'\n\n'}
          Say the bridge. Advance. THEN pause while they read.
        </aside>
      </section>

      {/* 1 ────────────────────────────────────── 0:00–1:30 */}
      {/* Three candidate cold opens. Exactly one renders, chosen by COLD_OPEN
          at the top of this file, so the deck is always 9 slides and the slide
          counter tells the truth. (They were briefly stacked as vertical
          slides; that inflated the count to 11 and made it look like slides 2
          and 3 had gone missing.) */}
      <section>
        {COLD_OPEN === 'guess' && (
          <>
            <h1 className="tight">Does your software know its purpose?</h1>
            <ThinkingSite />
            <aside className="notes">
              2 WHY{'\n\n'}
              we always cared. now the SOFTWARE has to.{'\n'}
              does the landing page know it's there for 1,000 signups?{'\n\n'}
              Don't read the targets — they're illustration, not a list.{'\n\n'}
              → so we stopped caring what. we tell it why.
            </aside>
          </>
        )}
        {COLD_OPEN === 'targets' && (
          <>
            <h1 className="tight">Does your software know its purpose?</h1>
            <ThinkingSite metric />
            <aside className="notes">
              2 WHY{'\n\n'}
              we always cared. now the SOFTWARE has to.{'\n'}
              does the landing page know it's there for 1,000 signups?{'\n\n'}
              Don't read the targets — they're illustration, not a list.{'\n\n'}
              → so we stopped caring what. we tell it why.
            </aside>
          </>
        )}
        {COLD_OPEN === 'belt' && (
          <>
            <div className="beltbox">
              <div className="rail" />
              <div className="crate">Dark mode</div>
              <div className="crate">CSV export</div>
              <div className="crate">Notifications</div>
              <div className="crate">New onboarding</div>
              <div className="crate">Search filters</div>
              <div className="fog" />
              <p className="stamp">Feature factory &middot; est. long before any of this</p>
            </div>
            <h1 className="tight">Does your software know its purpose?</h1>
            <aside className="notes">
              2 WHY{'\n\n'}
              we always cared. now the SOFTWARE has to.{'\n'}
              does the landing page know it's there for 1,000 signups?{'\n\n'}
              Don't read the targets — they're illustration, not a list.{'\n\n'}
              → so we stopped caring what. we tell it why.
            </aside>
          </>
        )}
        {COLD_OPEN === 'portrait' && (
          <>
            <svg className="portrait-svg" viewBox="0 -18 400 228" role="img"
                 aria-label="A wireframe of a homepage labelling everything it knows about itself, and one label — why does this exist — attached to nothing.">
              <rect className="frame" x="40" y="26" width="250" height="160" rx="3" />
              <line className="frame" x1="40" y1="42" x2="290" y2="42" />
              <circle className="fill" cx="50" cy="34" r="2.6" />
              <circle className="fill" cx="59" cy="34" r="2.6" />
              <circle className="fill" cx="68" cy="34" r="2.6" />
              <text x="80" y="37">flockcover.com</text>

              <rect className="fill" x="52" y="54" width="34" height="7" rx="1.5" />
              <rect className="fill" x="212" y="54" width="20" height="7" rx="1.5" />
              <rect className="fill" x="238" y="54" width="20" height="7" rx="1.5" />
              <rect className="cta" x="262" y="52" width="18" height="11" rx="2" />

              <rect className="fill" x="52" y="82" width="150" height="13" rx="2" />
              <rect className="fill" x="52" y="100" width="112" height="13" rx="2" />
              <rect className="cta" x="52" y="124" width="46" height="14" rx="2" />

              <rect className="frame" x="52" y="152" width="68" height="24" rx="2" />
              <rect className="frame" x="128" y="152" width="68" height="24" rx="2" />
              <rect className="frame" x="204" y="152" width="68" height="24" rx="2" />

              <line className="frame" x1="290" y1="57" x2="316" y2="57" />
              <text x="320" y="60">#F6F404</text>
              <line className="frame" x1="290" y1="89" x2="316" y2="89" />
              <text x="320" y="92">1240 &times; 820</text>
              <line className="frame" x1="290" y1="131" x2="316" y2="131" />
              <text x="320" y="134">16 / 24 / 48px</text>

              <path className="lead" d="M150 18 L150 6" />
              <text className="q" x="150" y="0" textAnchor="middle">what is this for?</text>
            </svg>
            <h1 className="tight">Does your software know its purpose?</h1>
            <aside className="notes">
              2 WHY{'\n\n'}
              we always cared. now the SOFTWARE has to.{'\n'}
              does the landing page know it's there for 1,000 signups?{'\n\n'}
              Don't read the targets — they're illustration, not a list.{'\n\n'}
              → so we stopped caring what. we tell it why.
            </aside>
          </>
        )}
      </section>

      {/* 2 ────────────────────────────────────── 1:30–2:45 */}
      <section>
        <p className="kicker muted">The loop</p>
        <WhatThenWhy />
        <LoopDiagram />
        <aside className="notes">
          3 LOOP{'\n\n'}
          reads sessions, logs, errors{'\n'}
          FINDS AND FIXES — never "tells me"{'\n\n'}
          → none of it works without trust. four things built that trust
        </aside>
      </section>

      {/* 3 ────────────────────────────────────── 2:40–3:40 */}
      {/* Step one. You cannot audit against a goal you never set, and you cannot
   judge whether history is progress without one either — so this has to come
   first. The numbers here are the inarguable ones.

   The step says GOAL, not purpose, and the difference is the point: purpose
   is the question slide 1 asks, a goal is the answerable form you can hand to
   a machine and measure.

   Both halves are imperatives, deliberately — "give it", "make it" — so the
   slide reads as two things you do rather than one thing you do and one thing
   that then becomes possible. "Itself" stays: "make it improve" on its own
   reads as you doing the improving, which is the distinction this slide exists
   to draw.

   The second half is the payoff, not the mechanism: a goal plus a way to
   measure against it is the only thing that makes self-improvement possible at
   all. Both halves of that — validating itself, then correcting itself — have
   to happen inside the loop. The moment the person is the one checking, the
   person is back in the loop, which is what step four argues against. If the human is the one checking, the human is back in the loop,
   which is the thing step four spends its whole slide arguing against. */}
      <section>
        <p className="step"><span className="n">1</span> <span className="of">of four</span> &middot; Feedback loop</p>
        <h2>
          Give it a goal.{' '}
          <span className="second">Make it improve itself.</span>
        </h2>
        <div className="goal">
          <p className="lbl">The goal we gave it</p>
          <p className="words">
            &ldquo;Customers should use this at least once a week.&rdquo;
          </p>
        </div>
        <div className="ratio">
          <div>
            <div className="fig mine">20%</div>
            <p className="who">The target</p>
          </div>
          <div>
            <div className="fig">59%</div>
            <p className="who">Where it got to</p>
          </div>
        </div>
        <aside className="notes">
          4 GOAL{'\n\n'}
          it's aware of it · it measures itself{'\n'}
          20% → 59% OF THOSE WHO USE IT{'\n'}
          in two months{'\n\n'}
          Never "of our customers". 208 of 352 activated.{'\n\n'}
          → but it does things I didn't want
        </aside>
      </section>

      {/* 4 ────────────────────────────────────── 3:40–4:40 */}
      <section>
        <p className="step"><span className="n">2</span> <span className="of">of four</span> &middot; Make it auditable</p>
        <SloppyVerdict />
        <div className="exchange">
          <div className="ask">Why is this top of the list?</div>
          <p className="pair-label">What you get today</p>
          <div className="reply shrug">Dunno &mdash; the agent did it.</div>
          <p className="pair-label good">What you should be able to get</p>
          <div className="reply">
            Three customers asked last week. One said they&rsquo;d leave without it.
          </div>
        </div>
        <aside className="notes">
          5 AUDIT{'\n\n'}
          I MADE A CONTROVERSIAL CALL:{'\n'}
          why it did it > whether it was right{'\n'}
          "that number's wrong" / "the agents did it"{'\n'}
          every line traces back to a user{'\n\n'}
          → applies to everyone — knowing why doesn't stop it
        </aside>
      </section>

      {/* 6 ────────────────────────────────────── guardrails */}
      {/* Step four. The one everybody nods along to and almost nobody builds,
          because asking politely feels like it should be enough. It isn't, and
          in a regulated business that gap is the whole risk.

          The distinction is where the limit lives: in the instruction, where it
          can be argued with, or in the tooling, where there is nothing to argue
          with. Content from the Jay build — compliance documentation inside the
          loop, and hard edges on the tools so a breach is detectable rather
          than merely discouraged. */}
      <section>
        <p className="step"><span className="n">3</span> <span className="of">of four</span> &middot; Guardrails</p>
        <h2>
          It will hit the goal.{' '}
          <span className="second">That&rsquo;s the bit to worry about.</span>
        </h2>

        {/* The callback is the whole slide: this is the SAME sentence from step
            one, now read as a threat rather than a promise. Keep the wording
            byte-identical to the .goal block on slide 3 or the callback dies. */}
        <div className="cheap">
          <p className="lbl">What we asked for</p>
          <p className="words">
            &ldquo;Customers should use this at least once a week.&rdquo;
          </p>
          <p className="lbl got">Cheapest way there</p>
          <p className="words got">Email all of them every Monday.</p>
        </div>

        <div className="rungs">
          <div className="rung">
            <p className="move">Tell it not to</p>
            <p className="real">It probably won&rsquo;t. You asked nicely.</p>
          </div>
          <div className="rung">
            <p className="move">Test that it didn&rsquo;t</p>
            <p className="real">Now you find out. Afterwards, but you find out.</p>
          </div>
          <div className="rung top">
            <p className="move">Don&rsquo;t give it the tool</p>
            <p className="real">It can&rsquo;t. There&rsquo;s nothing to argue with.</p>
          </div>
        </div>

        <aside className="notes">
          6 GUARD{'\n\n'}
          £10 every Monday · ON GOAL, still wrong{'\n'}
          NOT AI'S JOB TO EARN YOUR TRUST{'\n'}
          plead → evals → no email tool at all{'\n\n'}
          → now I can trust it. so why am I still sat in the middle of it?
        </aside>
      </section>

      {/* 6 ────────────────────────────────────── 5:40–7:00 */}
      <section className="invert" data-background-color="#f6f404">
        <p className="step"><span className="n">4</span> <span className="of">of four</span> &middot; Make it scale</p>
        <h2>A loop with you in it runs at your speed</h2>
        <InOrAbove />
        <p className="punch">
          A human in the loop sounds responsible. It just makes babysitters and
          bottlenecks.
        </p>
        <aside className="notes">
          7 SCALE{'\n\n'}
          100 to review. no fun. no speed-up{'\n'}
          BABYSITTER OR BOTTLENECK{'\n'}
          audit log → new goal / tighter guardrail{'\n'}
          SHAPE the loop, don't sit in it{'\n\n'}
          → sounds like I automated my job
        </aside>
      </section>

      {/* 7 ────────────────────────────────────── 6:30–7:50 */}
      {/* The bridge. Slide 6 argues capacity; slide 8 argues purpose; nothing
          connects them on its own. This is the connection: from above the loop
          a "what" instruction is no longer available to you, so a "why" is the
          only kind left. The why isn't something you graduate to once you have
          spare time — it's forced on you. */}
      <section>
        <p className="kicker muted">Your job now</p>
        <h2>
          You don&rsquo;t build the thing any more.{' '}
          <span className="second">You build what builds it.</span>
        </h2>
        <p className="punch">
          So the only thing left to care about is why.{' '}
          <span className="counter">That is not a smaller job.</span>
        </p>
        <aside className="notes">
          8 JOB{'\n\n'}
          missing colon, session replays — GLAD to hand those over{'\n'}
          one Notion page → WAR AND PEACE{'\n'}
          the thing only one person knows{'\n'}
          NOT a smaller job{'\n\n'}
          → which made the why matter MORE
        </aside>
      </section>

      {/* 9 ────────────────────────────────────── 9:15–9:45 */}
      <section className="invert" data-background-color="#f6f404">
        <p className="close-q">Does your software know its purpose?</p>
        <p className="close-q second">Do you?</p>
        <p className="closing-note">
          Go and build your own way of trusting it. It doesn&rsquo;t have to work
          for everyone &mdash; it has to work for you.
        </p>
        <p className="hiring">
          Flock is hiring &middot; <b>flockcover.com/careers</b>
        </p>
        <aside className="notes">
          9 CLOSE{'\n\n'}
          does your software know its purpose?{'\n'}
          DO YOU?    [ S I L E N C E ]{'\n\n'}
          those are the people we're hiring
        </aside>
      </section>
    </>
  )
}
