/* Slide titles are statements, per the Flock Communication Playbook rule 04
   and tokens.json /voice/rules. Read the nine titles alone and you get the
   whole argument. Speaker notes carry the run sheet — press S.

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

   'guess'    — the room can guess its purpose; the software itself cannot
   'belt'     — the feature factory, which predates all of this
   'portrait' — the homepage that can describe everything about itself but why */
const COLD_OPENS = ['guess', 'belt', 'portrait']

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
/* The room can guess what a page is for — four guesses land, fast, and every
   one is plausible. Then the page's own bubble arrives and it is empty, still
   thinking. The guesses are the audience's competence; the empty bubble is the
   gap.

   This replaced a list of things the software could answer about itself, which
   read as dull on a trial run. Note the wording throughout is PURPOSE, not
   "why it exists" — the latter tested as too existential and made the software
   sound sentient, which is the wrong argument entirely. */
function PurposeGuess() {
  const [run, ref] = useReplayOnEnter()
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <div className="guessbox" key={run}>
        <span className="guess">Sign people up</span>
        <span className="guess">Sell shoes</span>
        <span className="guess">Get them to come back</span>
        <span className="guess">Take their money</span>
        <div className="tail" />
        <div className="itsown">
          <div className="dots"><span /><span /><span /></div>
        </div>
        <div className="page">
          <i className="w1" />
          <i className="w2" />
          <i className="cta" />
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- slide 2 */
function LoopDiagram() {
  const [lit, ref] = useSlideStages(4, 620)

  return (
    <svg
      ref={ref}
      className={`loop-svg lit-${lit}`}
      viewBox="0 0 760 210"
      role="img"
      aria-label="What customers do, to an agent, to work carrying its reason, to shipped, and back again"
    >
      <g className="stage s1">
        <rect x="4" y="52" width="150" height="58" rx="3" />
        <text x="79" y="76" textAnchor="middle">What customers</text>
        <text x="79" y="94" textAnchor="middle">actually do</text>
      </g>

      <g className="stage s2">
        <line className="flow" x1="160" y1="81" x2="208" y2="81" />
        <path d="M200 75 L210 81 L200 87 Z" fill="#3b484c" stroke="none" />
        <rect x="214" y="52" width="130" height="58" rx="3" />
        <text x="279" y="76" textAnchor="middle">Something</text>
        <text x="279" y="94" textAnchor="middle">reads it</text>
      </g>

      <g className="stage s3">
        <line className="flow" x1="350" y1="81" x2="398" y2="81" />
        <path d="M390 75 L400 81 L390 87 Z" fill="#3b484c" stroke="none" />
        <rect className="hl" x="404" y="42" width="180" height="78" rx="3" />
        <text className="hl" x="494" y="70" textAnchor="middle">Work — carrying</text>
        <text className="hl" x="494" y="88" textAnchor="middle">the reason</text>
        <text className="hl" x="494" y="106" textAnchor="middle">it exists</text>
      </g>

      <g className="stage s4">
        <line className="flow" x1="590" y1="81" x2="638" y2="81" />
        <path d="M630 75 L640 81 L630 87 Z" fill="#3b484c" stroke="none" />
        <rect x="644" y="52" width="110" height="58" rx="3" />
        <text x="699" y="76" textAnchor="middle">Out in</text>
        <text x="699" y="94" textAnchor="middle">the world</text>
        <path
          className="back flow"
          d="M699 118 L699 172 Q699 182 689 182 L89 182 Q79 182 79 172 L79 118"
        />
        <path d="M73 128 L79 116 L85 128 Z" fill="#f6f404" stroke="none" />
        <text className="hl" x="389" y="204" textAnchor="middle">
          and it watches what happened
        </text>
      </g>
    </svg>
  )
}

/* ---------------------------------------------------------------- slide 3 */
/* Four cards arrive, hold, then collapse into one signal that is simply
   stronger — because that is what they always were. The repetition wasn't the
   system being forgetful; it was the same finding confirmed four times with no
   way to add it up.

   A tracker column rather than a list of sentences, so it reads as tickets at
   a glance. The build replays on slide entry (a plain CSS animation fires once
   at page load and is over long before anyone gets here). */
function TicketBoard() {
  const [run, ref] = useReplayOnEnter()
  const rows = [
    ['Add CSV export to the table', '#1042', false],
    ['Let people download the data', '#1071', true],
    ['Export button on the table', '#1090', true],
    ['Add CSV export to the table', '#1118', true],
  ]
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <div className="board" key={run}>
        <p className="col-head">
          <span>Backlog</span>
          <span className="count">4 new</span>
          <span className="rule" />
        </p>
        <div className="board-stack">
          <div className="cards">
            {rows.map(([title, ref_, dupe]) => (
              <div className={dupe ? 'tk dupe' : 'tk'} key={ref_}>
                <div className="title">
                  <span className="pri" />
                  <span>{title}</span>
                </div>
                <div className="foot">
                  <span className="type">Feature</span>
                  <span className="who">Opened by the loop</span>
                  <span className="ref">{ref_}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="compounded">
            <div className="title">
              <span className="pri" />
              <span>People can&rsquo;t get their own data out</span>
            </div>
            <div className="foot">
              <span className="strength">Signal &times;4</span>
              <span>and still climbing</span>
            </div>
          </div>
        </div>
      </div>
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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      setShape(morphAt(((now - start) % MORPH.period) / MORPH.period))
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
      <circle className="ring flow ring-left" cx="130" cy="108" r="56" />
      <path className="head" d="M181 104 L191 104 L186 116 Z" />
      <circle className="you" cx="130" cy="52" r="10" />
      <text className="tiny" x="130" y="190" textAnchor="middle">
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
      {/* 1 ────────────────────────────────────── 0:00–1:30 */}
      {/* Three candidate cold opens. Exactly one renders, chosen by COLD_OPEN
          at the top of this file, so the deck is always 9 slides and the slide
          counter tells the truth. (They were briefly stacked as vertical
          slides; that inflated the count to 11 and made it look like slides 2
          and 3 had gone missing.) */}
      <section>
        {COLD_OPEN === 'guess' && (
          <>
            <p className="kicker">AI Tinkerers · Tom Harvey</p>
            <h1>Your software doesn&rsquo;t know its purpose</h1>
            <PurposeGuess />
            <aside className="notes">
              0:00–1:30 · NEVER CUT{'\n\n'}
              ⌨ PRESS C to cycle this opener: guesses → feature factory →
              self-portrait. Or open with ?open=belt / ?open=portrait.{'\n\n'}
              BEFORE ANY OF THIS — walk up and CLOSE THE LAPTOP LID. Let them
              wonder. Then:{'\n\n'}
              "This is a story about an engineering team. But what I'm really
              hoping to get across is something that applies well outside
              engineering — how you build trust in an AI system. If you're not
              on an engineering team, come and find me afterwards and tell me
              whether I managed it. If you are on one, come and find me too."
              {'\n\n'}
              That does two jobs: it tells the non-engineers in the room this is
              for them, and it gives everyone a question to hold for ten minutes
              so you don't have to bolt examples on.{'\n\n'}
              WHO YOU ARE — 30 seconds, no more. Software engineer for
              twenty-five years. Head of engineering, VP engineering, CTO.
              Co-founded companies. Always small startups, so never stopped
              writing code. Head of AI at Flock, a London insurtech — "Admiral
              liked it enough to pay £110m for the business."{'\n\n'}
              ⚠ Your name badge may say founder of Rosenfeld. Clear it up in one
              line: that's the passion project, the energy one; today is the day
              job, because it's the one with thousands of real users behind it.
              {'\n\n'}
              "Your landing page. Does it know that its job is to sell?" It knows
              what colour the button is. It knows where everything sits and how big
              every word is. It knows its own shape perfectly, down to the pixel.
              {'\n\n'}
              WHAT IT HAS NO IDEA ABOUT IS WHETHER ANY OF IT IS FOR ANYTHING. It has
              never once found out whether a single person bought a single thing.
              {'\n\n'}
              LET IT PLAY. The answers come back faster and faster — it is showing
              off — and then they stop. DO NOT FILL THE SILENCE. The last line
              takes about a second and a half longer than you will want it to.
              {'\n\n'}
              WALK THE CARD. Notice every one of those is about its own shape —
              size, layout, colour. It answers them instantly, and has been able to
              for twenty years. The last one it has never been able to
              answer, and — this is the part — nobody ever thought that was strange.
              {'\n\n'}
              THEN THE REAL ONE, SPOKEN. "Last month a customer wrote to us: just
              give me a CSV of this, what do you mean you can't do that, that's
              ridiculous. Our product knows how to draw that table. Perfectly. What
              it has never known is that the table is only there so somebody can go
              and DO something with the numbers."{'\n\n'}
              "And somebody's job was to read that and write down 'maybe we should
              add an export'. That is a real job. I don't think it's a job any
              more."{'\n\n'}
              The intent existed once — written somewhere nobody kept, a chat thread,
              someone's head, a job closed eighteen months ago. It never travelled
              with the thing that got built.{'\n\n'}
              BRIDGE — "you don't need a product for this to be true. You need
              something you shipped and stopped asking questions about."{'\n\n'}
              10 sec on Flock, INCLUDING: "Admiral liked it enough to pay £110m for
              the business." Then straight into slide 2.{'\n\n'}
              ⚠ The customer message is SPOKEN, not shown — the screen carries the
              idea, not the anecdote. If you'd rather show the real screenshot, it
              belongs as a second beat after the card, not instead of it.
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
            <h1>Your software doesn&rsquo;t know its purpose</h1>
            <aside className="notes">
              COLD OPEN — ALTERNATE A · the feature factory{'\n\n'}
              Let it run in silence for a few seconds before you say anything.{'\n\n'}
              "This is a feature factory. Things come down the line, they're
              perfectly well made, they get shipped, and they disappear. Nobody
              standing at the line can tell you why any of them were built."{'\n\n'}
              THE MOVE — AND THIS IS THE WHOLE REASON TO USE THIS OPENER:{'\n\n'}
              "Now — none of this is about AI. We invented the feature factory
              decades ago. We were doing this when the roadmap was a spreadsheet
              and the tickets were index cards. Nobody needed a language model to
              lose track of why they were building something."{'\n\n'}
              "All the machines did was speed the line up."{'\n\n'}
              That reframe is the point. The room arrives braced for another talk
              about what AI is doing to us, and you tell them the problem is
              thirty years older than the tools — which buys you their attention
              for the next nine minutes.{'\n\n'}
              THEN the title lands, and go to the loop.
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
            <h1>Your software doesn&rsquo;t know its purpose</h1>
            <aside className="notes">
              COLD OPEN — ALTERNATE B · the self-portrait{'\n\n'}
              "This is our homepage. Ask it anything about how it's put together
              and it will tell you. What colour is that button — it knows. How big
              is the heading — it knows. Where does everything sit — it knows that
              too."{'\n\n'}
              POINT AT THE LABEL WITH NOTHING UNDER IT.{'\n\n'}
              "That one it has never been able to answer. And the strange part
              isn't that it can't. It's that nobody ever thought that was odd."{'\n\n'}
              ⚠ THE WIREFRAME IS A GUESS. I could not reach flockcover.com from
              here — no outbound network — so this is the shape every B2B homepage
              shares: nav, hero, one call to action, three cards. CHECK IT AGAINST
              THE REAL PAGE before you show it. If it doesn't match, the room full
              of people who have seen your site will notice and it undercuts you.
              The three labels are illustrative too.
            </aside>
          </>
        )}
      </section>

      {/* 2 ────────────────────────────────────── 1:30–2:45 */}
      <section>
        <p className="kicker muted">The loop</p>
        <h2>We stopped writing our own to-do list</h2>
        <LoopDiagram />
        <aside className="notes">
          1:30–2:45 · The diagram builds itself in four steps — let it land
          before you talk over the last one.{'\n\n'}
          We stopped writing the list of what to build. Something else reads what
          customers actually do, and writes the job up WITH THE REASON ATTACHED.
          {'\n\n'}
          That reason is the intent travelling with the work — the thing that
          used to evaporate.{'\n\n'}
          And it watches what happens after it ships. The interesting arrow is
          the one going back. Without it you haven't got a loop, you've got an
          expensive suggestion box.{'\n\n'}
          IT ALSO HAS TO KNOW ITS OWN HISTORY. Models are terrible at the
          passage of time — every run is a fresh one straight out of the box. So
          it gets fed what it has already done and how that went: what's a
          long-running problem, what's new, what it tried before. Without that
          it has no way to tell progress from repetition.{'\n\n'}
          DOES IT WORK — and these are the numbers to say out loud, because they
          are the inarguable ones: "the product this runs on is about retention.
          Our target was 20% of users coming back every week. It's 60%."{'\n\n'}
          BRIDGE — "keep the why next to the output, not in a chat you're about
          to close."{'\n\n'}
          NO TICKET COUNTS. The retention numbers are outcome, which is the point
          — throughput is not, so leave it out unless asked.
        </aside>
      </section>

      {/* 3 ────────────────────────────────────── 2:40–3:40 */}
      {/* Step one. You cannot audit against a goal you never set, and you
          cannot judge whether history is progress without one either — so this
          has to come first. The numbers here are the inarguable ones. */}
      <section>
        <p className="step"><span className="n">1</span> <span className="of">of four</span> &middot; Give it a purpose</p>
        <h2>Tell it what good looks like, then check whether it got there</h2>
        <div className="goal">
          <p className="lbl">What we told it it was for</p>
          <p className="words">
            &ldquo;Users should come back to this week after week, not try it
            once and forget it.&rdquo;
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
        <p className="ratio-caption">
          …of the people who have tried it, coming back in more than one week.
        </p>
        <aside className="notes">
          2:40–3:40 · STEP ONE — NEVER CUT{'\n\n'}
          "Everything after this depends on this bit, and it's the bit everyone
          skips."{'\n\n'}
          You have to tell it what it is for. Not what to do — what good looks
          like. That sentence is roughly what we handed it for this product.
          {'\n\n'}
          ⚠ SAY "USERS", NOT "FLEET MANAGERS" — nobody outside insurance knows
          what a fleet manager is, and the word costs you a beat while they work
          it out. Same for "fleets": say customers.{'\n\n'}
          AND THEN — and this is the half people miss — you need a way to know
          whether it's getting there. A goal you can't measure isn't a goal,
          it's a mood.{'\n\n'}
          THE NUMBERS, SAID PLAINLY: "we asked for twenty percent of the people
          who tried it to keep coming back. It's fifty-nine." Let that sit.
          Don't dress it up.{'\n\n'}
          ⚠ SAY IT PRECISELY. It is NOT "60% of users are weekly active". It is
          59% of the users who ever tried it, coming back in MORE THAN ONE WEEK
          — 208 of 352. The looser version is checkable and wrong, and this is a
          room that will check.{'\n\n'}
          IN RESERVE, if anyone wants the other half: 57% of customers have used
          it at least once, against a 50% target — 330 of 576, rising to 64%
          among those who've had a fair chance at it. Both key results are met.
          {'\n\n'}
          BRIDGE — "you don't need any of this machinery to do the first part.
          Most software has never been told what it's for. Write the sentence."
          {'\n\n'}
          ⚠ SOURCE: OKR 2 target from the Q3 OKR doc; figures from the Jay launch
          dashboard, last updated 17 September 2026. These are the only numbers
          in the talk. Re-check the dashboard on the morning if you can — it
          moves.
        </aside>
      </section>

      {/* 4 ────────────────────────────────────── 3:40–4:40 */}
      <section>
        <p className="step"><span className="n">2</span> <span className="of">of four</span> &middot; Make it auditable</p>
        <h2>&ldquo;The agent did it&rdquo; is just sloppy</h2>
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
          3:40–4:40 · STEP TWO{'\n\n'}
          START WITH THE SHRUG, because everyone in the room has seen it. "You
          ask why something got built, and you get this." Point at the grey one.
          {'\n\n'}
          "That's everywhere at the moment. And I want to be blunt about it —
          it's not mysterious, it's not the price of working this way. It's
          sloppy. It's the end of the conversation, and nobody can do anything
          with it."{'\n\n'}
          "We made a decision early on that turned out to matter more than
          anything else. We decided it was more important that it could tell us
          WHY it did something than that it got the thing right first time."
          {'\n\n'}
          NOW THE SECOND ONE — "that's a reason. You can argue with it. You can
          check it. You can decide it's the wrong call." Every item it raises
          traces back to a real person doing a real thing.{'\n\n'}
          THE TEST — "if you can't answer for what it did, you haven't delegated
          the work. You've just lost track of it."{'\n\n'}
          WHY THIS MATTERS, PLAINLY — "the audit trail isn't paperwork. It's how
          you build trust in the thing. And you only ever hand over control of
          something you trust."{'\n\n'}
          IF THERE'S ROOM — you stop telling the system how you work and start
          asking it. "I could tell you what I wrote in the standards document
          five years ago. Everyone's gone a different way since. Don't ask me —
          ask the code what the coding standards are." The system is what the
          system does.{'\n\n'}
          BRIDGE — "at any size: keep the why next to the thing, not in a chat
          you're about to close."{'\n\n'}
          CUT FROM HERE, NOW Q&amp;A MATERIAL: guardrails in tools not prompts,
          and sorting work by blast radius.
        </aside>
      </section>

      {/* 5 ────────────────────────────────────── 4:40–5:40 */}
      {/* Step three. The four duplicate tickets ARE the memory problem: with no
          view of what it had already concluded, it can't tell repetition from
          progress. Same visual, now doing the job it was always best at. */}
      <section>
        <p className="step"><span className="n">3</span> <span className="of">of four</span> &middot; Give it a memory</p>
        <h2>Without a memory it can&rsquo;t tell a new idea from more evidence</h2>
        <TicketBoard />
        <p className="punch">
          The same finding four times should get louder, not longer.
        </p>
        <aside className="notes">
          4:40–5:40 · STEP THREE{'\n\n'}
          "Here's something nobody warns you about. These things have almost no
          sense of time passing. Every run is a fresh one, straight out of the
          box. It doesn't remember yesterday unless you make it."{'\n\n'}
          SO WATCH WHAT HAPPENS. Four different people, four sets of words, one
          finding — and it was right every single time. That isn't forgetfulness.
          That is evidence.{'\n\n'}
          WAIT FOR THE COLLAPSE — "what it should have done is this." One item,
          four times the weight behind it.{'\n\n'}
          "The failure wasn't that it was wrong. It couldn't add its own evidence
          up. It treated the fourth person saying the same thing as a fourth job,
          instead of as the reason to believe the first one."{'\n\n'}
          WHAT THE FIX ACTUALLY IS — feed it its own history. What it has already
          done, what happened, what's a long-running problem and what's new.
          Without that it cannot tell progress from repetition.{'\n\n'}
          BRIDGE — "wherever you're doing this: hearing the same thing twice
          should raise your confidence, not your workload. If your setup turns
          it into more work, that's the bit to fix."{'\n\n'}
          ⚠ Illustrative wording, real failure mode. Don't present the ticket
          numbers as exact.
        </aside>
      </section>

      {/* 6 ────────────────────────────────────── 5:40–7:00 */}
      <section className="invert" data-background-color="#f6f404">
        <p className="step"><span className="n">4</span> <span className="of">of four</span> &middot; Make it scale</p>
        <h2>Being in the loop doesn&rsquo;t scale, because you don&rsquo;t</h2>
        <InOrAbove />
        <p className="punch">
          A human in the loop sounds responsible. It just makes babysitters and
          bottlenecks.
        </p>
        <aside className="notes">
          5:40–7:00 · STEP FOUR — NEVER CUT, this is the hinge{'\n\n'}
          SET IT UP WITH THE BOTTLENECK, SPOKEN — "so it worked, and then it
          worked too well. It raised more than we could get through. And we hit
          the thing every engineering team hits: something writes a lot of code
          and now there's a lot of code to review. All we'd done was move the
          queue along one place — and put a person in front of it."{'\n\n'}
          "Humans in the loop sounds like the responsible answer. It mostly
          creates babysitters and bottlenecks."{'\n\n'}
          LEFT — you're a station on it. Every revolution comes through you.
          That scales with your attention, and your attention does not scale.
          Notice it runs slower.{'\n\n'}
          RIGHT — you're outside it. You don't make the decisions any more, you
          change the shape of the thing that makes them. Point at it: "and notice
          that isn't a circle. It's still a loop. A loop doesn't have to be a
          neat circle to be a loop."{'\n\n'}
          HOW YOU ACTUALLY DO IT — go back through the audit trail, find where it
          decided something you didn't want, see the assumptions it was working
          from, and change those. You're not correcting the output. You're
          reshaping what produces it.{'\n\n'}
          NO BRIDGE HERE — this beat is already about them.
        </aside>
      </section>

      {/* 7 ────────────────────────────────────── 6:30–7:50 */}
      {/* The bridge. Slide 6 argues capacity; slide 8 argues purpose; nothing
          connects them on its own. This is the connection: from above the loop
          a "what" instruction is no longer available to you, so a "why" is the
          only kind left. The why isn't something you graduate to once you have
          spare time — it's forced on you. */}
      <section>
        <p className="kicker muted">What changes when you move</p>
        <h2>You can&rsquo;t shape a loop without knowing what it&rsquo;s for</h2>
        <div className="versus">
          <div className="side">
            <p className="where">In it &middot; an instruction about one thing</p>
            <p className="said">
              &ldquo;Add a button to that table that downloads a CSV.&rdquo;
            </p>
            <p className="life">You get that button. Nothing else, ever.</p>
          </div>
          <div className="side up">
            <p className="where">Above it &middot; an instruction about what good looks like</p>
            <p className="said">
              &ldquo;People should be able to get at their own data without
              asking us.&rdquo;
            </p>
            <p className="life">
              You get that button &mdash; and the four you hadn&rsquo;t thought of.
            </p>
          </div>
        </div>
        <aside className="notes">
          6:30–7:50 · NEVER CUT — this is the turn the whole talk hinges on{'\n\n'}
          "Here's the bit I didn't expect. Moving above the loop doesn't just
          free you up. It takes something away from you."{'\n\n'}
          READ THE LEFT ONE FIRST. That is a perfectly good instruction. Precise,
          unambiguous, and you'd get exactly that button.{'\n\n'}
          NOW THE RIGHT ONE — and say this explicitly, because it's the whole
          slide: "the left-hand one is something the right-hand one would have
          produced anyway." Ask for the button and you get the button. Ask for
          the outcome and you get the button, plus the download link in the
          email, plus the thing on the mobile screen, plus the one nobody in
          this room has thought of yet.{'\n\n'}
          THE ASYMMETRY — inside the loop every instruction you give is a WHAT.
          It works because you were standing there when it was needed. From
          above it you aren't standing there, so you can't give that kind of
          instruction at all. The only lever left is changing the conditions.
          {'\n\n'}
          THE POINT, SLOWLY — "and you cannot change the conditions sensibly
          without a definition of better. A definition of better is a why. So
          the why isn't the thing you get to think about once you've got spare
          time. It's the only instruction that still works from up there. It is
          forced on you."{'\n\n'}
          THE CALLBACK — "which is the same sentence I opened with. That system
          couldn't improve itself without knowing what it was for." Beat.
          "Neither can you."{'\n\n'}
          NO NAMES, NO NUMBERS, NO TOOLING. This slide is an argument, not
          evidence.{'\n\n'}
          ⚠ The two must stay RELATED — the left has to be something the right
          could plausibly produce. Unrelated examples were tried and nobody could
          see the connection. Both also sit on the export thread running through
          slides 1 and 3, so the room has met this need twice already.{'\n\n'}
          ⚠ The right-hand instruction should be something you'd genuinely say.
          Swap it for your own wording if it rings false — it's carrying a lot.
        </aside>
      </section>

      {/* 8 ────────────────────────────────────── 7:50–9:15 */}
      <section>
        <p className="kicker muted">What&rsquo;s left</p>
        <h2>This is the most software engineering I&rsquo;ve done in twenty-five years</h2>
        <p className="punch">Building the system that builds the system.</p>
        <aside className="notes">
          7:50–9:15 · NEVER CUT the why-becomes-the-job beat{'\n\n'}
          Her answer, unprompted: working out the right thing to build.
          Understanding what people are actually struggling with, applying
          judgement to THAT, and building the systems that surface which thing
          matters most.{'\n\n'}
          "So if the why is now the job — is that a smaller job? It is not."{'\n\n'}
          SAY THIS ONE STRAIGHT, IT'S TRUE AND IT LANDS: "this is the most
          software engineering I have done in twenty-five years of software
          engineering. Building the systems was never this. Building the system
          that builds the systems — that's engineering. I've fallen back in love
          with it, and there was a long stretch where I hadn't."{'\n\n'}
          And the correction people need: software engineering isn't over. It
          changed.{'\n\n'}
          THE HONEST COST — this has been a serious time investment, and most of
          it went on teaching it what Flock actually does. Coding standards were
          about 1% of it; the rest is knowledge that only existed in a few
          people's heads.{'\n\n'}
          Getting lost in the what was a TRAP, and for thirty years it was
          COMPULSORY. Everybody fell into it, because the job genuinely required
          somebody down there. What's changed is that it's optional now — and
          what's left when you climb out is the harder half.{'\n\n'}
          The tool doesn't only produce value. It moves you up a level, whether
          or not you meant to go.{'\n\n'}
          ⚠ TONE — this is the slide that can go wrong in the room. The weeds
          were compulsory and YOU WERE IN THEM TOO. Never "people were doing it
          wrong."{'\n\n'}
          Farmers don't care about a grain of wheat. They care about the farm.
          {'\n\n'}
          And the honest bit: this isn't a phase you pass through. Shaping the
          thing is a full-time job forever — priorities keep moving and it has to
          move with them.
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
        <p className="hiring">Flock is hiring</p>
        <aside className="notes">
          9:15–9:45{'\n\n'}
          It's September 2026 and nobody knows if this is right, including me.
          {'\n\n'}
          The model isn't the variable any more — I took the strongest one out of
          my own setup and what came back was still good enough, from something
          you can reportedly run on a machine at home. Six months ago I'd have
          said the price of this was going up. Now I think it goes to roughly
          zero.{'\n\n'}
          IF THE MODEL IS A COMMODITY, THE THING YOU WRAP AROUND IT IS THE WHOLE
          PRODUCT.{'\n\n'}
          BRIDGE — "if you're choosing tools, stop optimising which model and
          start looking at what you've built around it."{'\n\n'}
          THE ONE THING THEY SHOULD LEAVE WITH — say it before the questions:
          "if you take one thing away: go and build your own way of trusting
          this stuff. Not whether it works in the abstract. Whether it works for
          you, well enough that you'd let go of a piece of control. That part is
          on you, and nobody can hand it to you."{'\n\n'}
          THE CLOSE — the opening question. Then a beat. Then "do you?"{'\n\n'}
          NEVER ADD A THIRD QUESTION. Then the hiring line and stop. Say where
          we're hiring out loud if it's relevant — it's not on the slide, so the
          deck stays true wherever this is given.{'\n\n'}
          ⚠ Verify the model claim before this is said — transcript audio was
          rough.
        </aside>
      </section>
    </>
  )
}
