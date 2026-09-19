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

   'card'     — the software's own self-description, every line answerable but the last
   'belt'     — the feature factory, which predates all of this
   'portrait' — the homepage that can describe everything about itself but why */
const COLD_OPENS = ['card', 'belt', 'portrait']

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
/* The interrogation. Every question gets an instant answer and they arrive
   faster and faster — the thing is showing off — then a long silence, and the
   last line lands with nothing after it but a cursor. Hold the pause. If you
   talk over it, it dies. */
function SelfKnowledge() {
  const [run, ref] = useReplayOnEnter()
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <div className="selfknow" key={run}>
        <p className="head">Everything it can tell you about itself</p>
        <div className="line"><span>What it looks like on a phone</span><span className="val">yes</span></div>
        <div className="line"><span>What colour the button is</span><span className="val">yes</span></div>
        <div className="line"><span>How quickly it loads</span><span className="val">yes</span></div>
        <div className="line"><span>Who visited yesterday</span><span className="val">yes</span></div>
        <div className="line unknown"><span>Why it exists</span><span className="val"><span className="caret" /></span></div>
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
/* A tracker column, not a list of sentences — header with a count, priority
   marks, type chips, references and who opened them. Cards land one at a
   time, and the build replays on slide entry (a plain CSS animation here
   fires once at page load and is over long before anyone reaches slide 3). */
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
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- slide 6 */
/* The same loop twice. On the left the person is a station on it — every
   revolution has to pass through them. On the right the loop runs closed and
   the person is outside it, bending its shape; the ghost circle is the shape
   it used to be. Boxes would say "process". A circle says "this comes round
   again", which is the entire point.

   Both loops run continuously — no staged build, that was tried and reverted
   because the motion fought the spoken beat. The difference is speed and
   shape: the left one is slower, because every pass has to get through a
   person. The right one runs faster and never settles on a shape, which is the
   argument — still one closed loop, just not a circle.

   The ellipse and the two arms are ALL driven by SMIL off one clock. They were
   previously split between a CSS keyframe and SMIL, which ran on separate
   timebases and drifted into near-opposite phase — the arms swung out while the
   loop pulled in. Keep them together; don't move the ellipse back to CSS. */
function InOrAbove() {
  return (
    <svg
      className="schematic"
      viewBox="0 0 620 200"
      role="img"
      aria-label="Left: a person standing on the loop, so every revolution passes through them. Right: the loop runs closed while the person, outside it, changes its shape."
    >
      {/* ---- in it ---- */}
      <text x="18" y="16">In it</text>
      <circle className="ring flow ring-left" cx="130" cy="108" r="56" />
      <path className="head" d="M181 104 L191 104 L186 116 Z" />
      <path className="head" d="M69 112 L79 112 L74 100 Z" />
      <circle className="you" cx="130" cy="52" r="10" />
      <text className="tiny" x="130" y="190" textAnchor="middle">
        every pass comes through you
      </text>

      {/* ---- above it ---- */}
      <text x="338" y="16">Above it</text>
      <ellipse className="ring flow ring-right" cx="452" cy="116" rx="56" ry="56">
        <animate
          attributeName="rx"
          dur="7s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.3;0.55;0.8;1"
          keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
          values="56;88;46;78;56"
        />
        <animate
          attributeName="ry"
          dur="7s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.3;0.55;0.8;1"
          keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
          values="56;32;64;40;56"
        />
      </ellipse>
      <circle className="you" cx="452" cy="30" r="10" />
      {/* The two arcs anchor to the ellipse's left and right extremes, which
          sit at (cx ∓ rx, cy). SMIL rather than CSS because the endpoint has
          to travel with the morph, and `d` is not dependably animatable in
          CSS across browsers. Timings mirror the `reshape` keyframes. */}
      <path className="pull" d="M438 38 Q404 60 396 116">
        <animate
          attributeName="d"
          dur="7s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.3;0.55;0.8;1"
          keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
          values="M438 38 Q404 60 396 116;
                  M438 38 Q380 58 364 116;
                  M438 38 Q412 62 406 116;
                  M438 38 Q388 59 374 116;
                  M438 38 Q404 60 396 116"
        />
      </path>
      <path className="pull" d="M466 38 Q500 60 508 116">
        <animate
          attributeName="d"
          dur="7s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.3;0.55;0.8;1"
          keySplines="0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1;0.42 0 0.58 1"
          values="M466 38 Q500 60 508 116;
                  M466 38 Q524 58 540 116;
                  M466 38 Q492 62 498 116;
                  M466 38 Q516 59 530 116;
                  M466 38 Q500 60 508 116"
        />
      </path>
      <text className="tiny" x="452" y="190" textAnchor="middle">
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
        {COLD_OPEN === 'card' && (
          <>
            <p className="kicker">AI Tinkerers · Tom Harvey</p>
            <h1>Your software doesn&rsquo;t know why it exists</h1>
            <SelfKnowledge />
            <aside className="notes">
              0:00–1:30 · NEVER CUT{'\n\n'}
              ⌨ PRESS C to cycle this opener: card → feature factory →
              self-portrait. Or open the deck with ?open=belt / ?open=portrait.
              Nothing to edit.{'\n\n'}
              "Your landing page. Does it know that its job is to sell?" It knows
              what it looks like on a phone. It knows what colour the button is. It
              does not know it is a salesperson — nobody told it, and it has never
              once found out whether anybody bought anything.{'\n\n'}
              LET IT PLAY. The answers come back faster and faster — it is showing
              off — and then they stop. DO NOT FILL THE SILENCE. The last line
              takes about a second and a half longer than you will want it to.
              {'\n\n'}
              WALK THE CARD. Every one of those it can answer instantly, and has
              been able to for twenty years. The last one it has never been able to
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
              10 sec on Flock, INCLUDING: "Admiral liked it enough to pay £109m for
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
            <h1>Your software doesn&rsquo;t know why it exists</h1>
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
              <text x="320" y="92">loads in 240ms</text>
              <line className="frame" x1="290" y1="131" x2="316" y2="131" />
              <text x="320" y="134">18,402 visits</text>

              <path className="lead" d="M150 18 L150 6" />
              <text className="q" x="150" y="0" textAnchor="middle">why does this exist?</text>
            </svg>
            <h1>Your software doesn&rsquo;t know why it exists</h1>
            <aside className="notes">
              COLD OPEN — ALTERNATE B · the self-portrait{'\n\n'}
              "This is our homepage. Ask it anything about itself and it will tell
              you. What colour is that button — it knows. How fast does it load —
              it knows. How many people came yesterday — it knows that too."{'\n\n'}
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
        <p className="kicker muted">What we did about it</p>
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
          BRIDGE — "keep the why next to the output, not in a chat you're about
          to close."{'\n\n'}
          NO COUNTS. No throughput. If they want volumes they can ask afterwards.
        </aside>
      </section>

      {/* 3 ────────────────────────────────────── 2:45–3:35 */}
      <section>
        <p className="kicker muted">What broke, one</p>
        <h2>It didn&rsquo;t make things up — it forgot what it had already said</h2>
        <TicketBoard />
        <p className="punch">
          Most of these failures are memory failures wearing a scary mask.
        </p>
        <aside className="notes">
          2:45–3:35 · NEVER CUT — this is the credibility beat{'\n\n'}
          CALLBACK — "remember our angry customer? It heard them." Everyone
          braces for made-up work. What we actually got was THAT — the same
          request, four times, phrased four ways, because it had no view of what
          it had already asked for.{'\n\n'}
          The joke lands on its own: it was right every single time.{'\n\n'}
          The fix wasn't a cleverer model. It was teaching it to look at what
          already existed before opening its mouth.{'\n\n'}
          END THE STORY — "now the person reviewing them finds almost nothing
          worth throwing away." Result, no figure needed.{'\n\n'}
          BRIDGE — "if your AI keeps repeating itself, it doesn't need to be
          cleverer. It needs to be shown what it already told you."{'\n\n'}
          ⚠ Illustrative wording, real failure mode. Don't present the ticket
          numbers as exact.
        </aside>
      </section>

      {/* 4 ────────────────────────────────────── 3:35–4:15 */}
      <section>
        <p className="kicker muted">What broke, two</p>
        <h2>The queue didn&rsquo;t disappear — it moved behind a person</h2>
        <div className="pile">
          <p className="label">Finished by the machine</p>
          <div className="bar waiting" />
          <div className="bar waiting" />
          <div className="bar waiting" />
          <div className="bar waiting" />
          <p className="label">Checked off by a human</p>
          <div className="bar done" />
        </div>
        <p className="punch">
          A loop is only as fast as the slowest person left in it.
        </p>
        <aside className="notes">
          3:35–4:15{'\n\n'}
          We wrote something to do a big boring upgrade. Suddenly the work was
          free. And nothing got checked and released — so it just kept producing
          more.{'\n\n'}
          If your answer is "a human checks everything", you have invented a job
          called approve, approve, approve.{'\n\n'}
          BRIDGE — "anything you speed up — hiring, content, invoicing — go and
          look at where the queue formed instead."{'\n\n'}
          IF BEHIND: skip the upgrade detail, point at the bars, say the
          one-liner and the bridge.
        </aside>
      </section>

      {/* 5 ────────────────────────────────────── 4:15–5:35 */}
      <section>
        <p className="kicker muted">How you build one</p>
        <h2>If it can&rsquo;t explain itself, you&rsquo;ve just hired it a babysitter</h2>
        <div className="exchange">
          <div className="ask">Why did you put this one at the top?</div>
          <div className="reply">
            Because 3 of the last 10 people who left did it right after this
            step, and none of them came back.
          </div>
        </div>
        <aside className="notes">
          4:15–5:35 · Sentence + the exchange + bridge. NOTHING ELSE.{'\n\n'}
          SAY THE COMPRESSED VERSION: "it has to be able to explain itself. It
          needs edges it cannot cross. And it needs to start somewhere that being
          wrong is survivable. Miss one and you haven't got a loop — you've got
          something you'll end up babysitting."{'\n\n'}
          THE EXCHANGE IS THE POINT — that question used to go to a person. Now
          it goes to the system, and it answers. Someone on our product team
          picked which retention number to chase in a planning meeting on exactly
          that basis.{'\n\n'}
          The other two, one line each: a prompt is a request, a boundary in the
          tooling is a fact. And start where being wrong is survivable — an
          internal tool breaking is annoying; paying somebody the wrong amount is
          not.{'\n\n'}
          BRIDGE — "all three work at any size. Keep the why. Put the limit
          somewhere it can't be argued with. Start where being wrong is cheap."
          {'\n\n'}
          ⚠ The exchange is illustrative of a real capability. Don't quote it as
          verbatim output.
        </aside>
      </section>

      {/* 6 ────────────────────────────────────── 5:35–6:30 */}
      <section className="invert" data-background-color="#f6f404">
        <p className="kicker">The hinge</p>
        <h2>Being in the loop doesn&rsquo;t scale, because you don&rsquo;t</h2>
        <InOrAbove />
        <p className="punch">Both are judgement. Only one is a job you can do at volume.</p>
        <aside className="notes">
          5:35–6:30 · NEVER CUT. This is the hinge of the whole talk.{'\n\n'}
          In it: you interrupt. "No — do it this way." Every pass comes back to
          you. That scales with your attention, and your attention does not
          scale.{'\n\n'}
          POINT AT THE RIGHT-HAND SHAPE — "notice that isn't a circle any more.
          It's still a loop. A loop doesn't have to be a neat circle to be a
          loop."{'\n\n'}
          Above it: you change the shape of the thing so it does the right thing
          by default. That scales with the loop.{'\n\n'}
          Both are judgement. Only one is a job you can do at volume.{'\n\n'}
          NO BRIDGE HERE — this beat is already about them. Adding one is talking
          down.
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
            <p className="where">Standing in it</p>
            <p className="said">&ldquo;Move that button to the left.&rdquo;</p>
            <p className="life">Works once. Then it&rsquo;s gone.</p>
          </div>
          <div className="side up">
            <p className="where">Standing above it</p>
            <p className="said">
              &ldquo;People should be able to get at their own data without
              asking us.&rdquo;
            </p>
            <p className="life">Still working after you&rsquo;ve left the room.</p>
          </div>
        </div>
        <aside className="notes">
          6:30–7:50 · NEVER CUT — this is the turn the whole talk hinges on{'\n\n'}
          "Here's the bit I didn't expect. Moving above the loop doesn't just
          free you up. It takes something away from you."{'\n\n'}
          LEFT — inside the loop, every instruction you give is a WHAT. Not that
          one, this one. Move it left. Precise, effective, and dead the second
          it's carried out. It works because you were standing there.{'\n\n'}
          RIGHT — from above it you aren't standing there. You can't give that
          kind of instruction any more; you're not present when each one happens.
          The only lever you've got left is changing the conditions.{'\n\n'}
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
          ⚠ The right-hand instruction should be something you'd genuinely say.
          Swap it for your own wording if it rings false — it's carrying a lot.
        </aside>
      </section>

      {/* 8 ────────────────────────────────────── 7:50–9:15 */}
      <section>
        <p className="kicker muted">What&rsquo;s left</p>
        <h2>This is a bigger job than the one it replaced</h2>
        <p className="punch">
          You don&rsquo;t write the list any more. You build the thing that writes
          the list &mdash; and that never stops needing you.
        </p>
        <aside className="notes">
          7:50–9:15 · NEVER CUT the why-becomes-the-job beat{'\n\n'}
          Her answer, unprompted: working out the right thing to build.
          Understanding what people are actually struggling with, applying
          judgement to THAT, and building the systems that surface which thing
          matters most.{'\n\n'}
          "So if the why is now the job — is that a smaller job? It is not."{'\n\n'}
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
        <p className="close-q">Does your software know why it exists?</p>
        <p className="close-q second">Do you?</p>
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
