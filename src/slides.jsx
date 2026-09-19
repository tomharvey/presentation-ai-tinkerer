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

/* ---------------------------------------------------------------- slide 2 */
function LoopDiagram() {
  const [lit, setLit] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current?.closest('section')
    if (!el) return
    let timers = []
    const run = () => {
      setLit(0)
      timers.forEach(clearTimeout)
      timers = [1, 2, 3, 4].map((n) => setTimeout(() => setLit(n), n * 620))
    }
    // Replay whenever this slide becomes the visible one.
    const onIn = () => run()
    el.addEventListener('slidetransitionend', onIn)
    document.addEventListener('slidechanged', (e) => {
      if (e.currentSlide === el) run()
    })
    if (el.classList.contains('present')) run()
    return () => {
      timers.forEach(clearTimeout)
      el.removeEventListener('slidetransitionend', onIn)
    }
  }, [])

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

/* ---------------------------------------------------------------- slide 6 */
function InOrAbove() {
  return (
    <svg className="schematic" viewBox="0 0 620 150" role="img"
         aria-label="Left: a person inside the loop, every pass coming back to them. Right: a person above the loop, which runs on its own.">
      <text x="0" y="14">In it</text>
      <rect x="0" y="34" width="250" height="78" rx="3" />
      <circle className="you" cx="125" cy="73" r="9" />
      <path d="M40 73 L112 73" /><path d="M104 68 L114 73 L104 78 Z" className="you" />
      <path d="M210 73 L138 73" /><path d="M146 68 L136 73 L146 78 Z" className="you" />
      <path d="M125 46 L125 60" /><path d="M120 54 L125 64 L130 54 Z" className="you" />
      <path d="M125 100 L125 86" /><path d="M120 92 L125 82 L130 92 Z" className="you" />

      <text x="340" y="14">Above it</text>
      <circle className="you" cx="465" cy="26" r="9" />
      <path d="M465 40 L465 56" /><path d="M460 50 L465 60 L470 50 Z" className="you" />
      <rect x="340" y="62" width="250" height="50" rx="3" />
      <path d="M380 87 L540 87" /><path d="M532 82 L542 87 L532 92 Z" className="you" />
    </svg>
  )
}

export default function Slides() {
  return (
    <>
      {/* 1 ────────────────────────────────────── 0:00–1:30 */}
      <section>
        <p className="kicker">AI Tinkerers · Tom Harvey</p>
        <h1>Your software doesn&rsquo;t know why it exists</h1>
        <p className="lede">
          It knows what colour the button is. It has never once found out
          whether anybody bought anything.
        </p>
        <div className="message">
          <p className="who">A customer, last month</p>
          Just give me a CSV of this. What do you mean you can&rsquo;t do that?
          That&rsquo;s ridiculous.
        </div>
        <aside className="notes">
          0:00–1:30 · NEVER CUT{'\n\n'}
          "Your landing page. Does it know that its job is to sell?" It knows
          what it looks like on a phone. It knows what colour the button is. It
          does not know it is a salesperson — nobody told it, and it has never
          once found out whether anybody bought anything.{'\n\n'}
          "I think people will want to hear this." → READ THE MESSAGE OUT. This
          is a real customer, about our product.{'\n\n'}
          THE TURN — and this is the whole talk in one move: our product knows
          how to draw that table. Perfectly. What it has never known is that the
          table is only there so somebody can go and DO something with the
          numbers. Nobody ever told it what it was for.{'\n\n'}
          "And the honest version is that somebody's job was to read that message
          and write down 'maybe we should add an export'. That's a real job. I
          don't think it's a job any more."{'\n\n'}
          The intent existed once — written somewhere nobody kept, a chat thread,
          someone's head, a job closed eighteen months ago. It never travelled
          with the thing that got built.{'\n\n'}
          BRIDGE — "you don't need a product for this to be true. You need
          something you shipped and stopped asking questions about."{'\n\n'}
          10 sec on Flock, INCLUDING: "Admiral liked it enough to pay £109m for
          the business." Then straight into slide 2.{'\n\n'}
          ⚠ SWAP IN THE REAL SCREENSHOT if you can — you have it, and a genuine
          capture beats a rendering here. Wording on screen is softened; the
          original is blunter. Your call which one a public room gets.
        </aside>
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
        <div className="stack">
          <div className="card"><span className="what">Add CSV export to the table</span><span className="id">#1042</span></div>
          <div className="card dupe"><span className="what">Let people download the data</span><span className="id">#1071</span></div>
          <div className="card dupe"><span className="what">Export button on the table</span><span className="id">#1090</span></div>
          <div className="card dupe"><span className="what">Add CSV export to the table</span><span className="id">#1118</span></div>
        </div>
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
          Above it: you change the shape of the thing so it does that by default.
          That scales with the loop.{'\n\n'}
          Both are judgement. Only one is a job you can do at volume.{'\n\n'}
          NO BRIDGE HERE — this beat is already about them. Adding one is talking
          down.
        </aside>
      </section>

      {/* 7 ────────────────────────────────────── 6:30–7:50 */}
      <section>
        <p className="kicker muted">So which is it?</p>
        <h2>Nobody can tell you where the line is — including the person standing on it</h2>
        <div className="promptline">
          <span className="dim">…every prompt she writes ends the same way</span>
          <br />
          <span className="always">&ldquo;spin up sub-agents if you think that&rsquo;s appropriate&rdquo;</span>
        </div>
        <div className="ratio">
          <div>
            <div className="fig">9 in 10</div>
            <p className="who">Their sessions</p>
          </div>
          <div>
            <div className="fig mine">1 in 30</div>
            <p className="who">Mine</p>
          </div>
        </div>
        <aside className="notes">
          6:30–7:50 · NEVER CUT{'\n\n'}
          ASK IT OUT LOUD: "are they in it, or above it?"{'\n\n'}
          FOR — someone on our product team mentioned almost in passing that
          every prompt she writes ends with THAT LINE. Nine sessions in ten of
          hers now split the work up and run it in parallel. Mine were closer to
          one in thirty. She has never once decided when to do that — she changed
          the conditions so the machine decides.{'\n\n'}
          AGAINST — she still checks what comes out. Still picks the target.
          There's still a person working through the list at the other end.{'\n\n'}
          HONEST ANSWER — both, and the line keeps moving. "I asked her and she
          said that's how she'd say she's currently operating. I believed her,
          and I still couldn't tell you where the boundary sits. I made this
          distinction up on a call last week. Nobody knows."{'\n\n'}
          THE RHYME, ONCE — "I asked the system why it put something top of the
          list and it could tell me. I asked her why she works this way and she
          could tell me too. Both of those are newer than they sound."{'\n\n'}
          BRIDGE — "you don't need any of this tooling. The move is: stop
          remembering to do the good thing, and change the default so you don't
          have to."{'\n\n'}
          ⚠ HER DATA — must be cleared with her before this is shown.
        </aside>
      </section>

      {/* 8 ────────────────────────────────────── 7:50–9:15 */}
      <section>
        <p className="kicker muted">What&rsquo;s left</p>
        <h2>Hand over the <span className="accent">what</span> and the <span className="accent">why</span> becomes your whole job</h2>
        <p className="punch">
          You don&rsquo;t write the list any more. You build the thing that writes
          the list.
        </p>
        <aside className="notes">
          7:50–9:15 · NEVER CUT the why-becomes-the-job beat{'\n\n'}
          Her answer, unprompted: working out the right thing to build.
          Understanding what people are actually struggling with, applying
          judgement to THAT, and building the systems that surface which thing
          matters most.{'\n\n'}
          THE SECOND-ORDER EFFECT — getting lost in the what was a TRAP, and for
          thirty years it was COMPULSORY. Everybody fell into it, because the job
          genuinely required somebody down there. Hand the what over and the why
          becomes the only thing left to do. The tool doesn't only produce value
          — it moves you up a level, whether or not you meant to go.{'\n\n'}
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
