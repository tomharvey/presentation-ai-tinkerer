/* Slide titles are statements, per the Flock Communication Playbook rule 04
   and tokens.json /voice/rules. Read the nine titles alone and you get the
   whole argument. Speaker notes carry the run sheet — press S. */

function LoopDiagram() {
  return (
    <svg className="loop-svg" viewBox="0 0 760 210" role="img"
         aria-label="What customers do, to an agent, to work with its reasoning attached, to shipped, and back again">
      <rect x="4" y="52" width="150" height="58" rx="3" />
      <text x="79" y="76" textAnchor="middle">What customers</text>
      <text x="79" y="94" textAnchor="middle">actually do</text>

      <line x1="160" y1="81" x2="208" y2="81" />
      <path d="M200 75 L210 81 L200 87 Z" fill="#3b484c" stroke="none" />

      <rect x="214" y="52" width="130" height="58" rx="3" />
      <text x="279" y="86" textAnchor="middle">An agent</text>

      <line x1="350" y1="81" x2="398" y2="81" />
      <path d="M390 75 L400 81 L390 87 Z" fill="#3b484c" stroke="none" />

      <rect className="hl" x="404" y="42" width="180" height="78" rx="3" />
      <text className="hl" x="494" y="70" textAnchor="middle">Work — with the</text>
      <text className="hl" x="494" y="88" textAnchor="middle">reason it exists</text>
      <text className="hl" x="494" y="106" textAnchor="middle">attached</text>

      <line x1="590" y1="81" x2="638" y2="81" />
      <path d="M630 75 L640 81 L630 87 Z" fill="#3b484c" stroke="none" />

      <rect x="644" y="52" width="110" height="58" rx="3" />
      <text x="699" y="86" textAnchor="middle">Shipped</text>

      <path className="back" d="M699 118 L699 172 Q699 182 689 182 L89 182 Q79 182 79 172 L79 118" />
      <path className="back" d="M73 128 L79 116 L85 128 Z" fill="#f6f404" stroke="none" />
      <text className="hl" x="389" y="204" textAnchor="middle">and it watches what happened</text>
    </svg>
  )
}

export default function Slides() {
  return (
    <>
      {/* 1 ────────────────────────────────────── 0:00–1:30 */}
      <section>
        <p className="kicker">Valencia · 22 September 2026</p>
        <h1>Your software doesn&rsquo;t know why it exists</h1>
        <p className="lede">
          It knows its breakpoints. It knows its font stack. It has never once
          seen its own conversion rate.
        </p>
        <aside className="notes">
          0:00–1:30 · NEVER CUT{'\n\n'}
          "Your landing page. Does it know that its job is to sell?" It knows
          breakpoints, font stack, strong opinions about the hero image. It does
          not know it is a salesperson — nobody told it, and it has never seen
          its own conversion rate.{'\n\n'}
          TURN — "the intent existed once. A PRD nobody kept, a Slack thread,
          someone's head, a ticket closed eighteen months ago. It never
          travelled with the code."{'\n\n'}
          "I think people will want to hear this." → THE ENDPOINT. An endpoint —
          one of the doors into our system — had never once opened. Not broke
          last Tuesday. NEVER. Returned errors its entire life, nobody noticed.
          Not carelessness: nothing in that system knew what it was supposed to
          be doing, so nothing could tell us it wasn't.{'\n\n'}
          BRIDGE — "you don't need a production system for this. You need
          something you shipped and stopped looking at."{'\n\n'}
          10 sec on Flock, INCLUDING: "Admiral liked it enough to pay £109m for
          the business." Then straight into slide 2. No second plant.
        </aside>
      </section>

      {/* 2 ────────────────────────────────────── 1:30–2:45 */}
      <section>
        <p className="kicker muted">What we built</p>
        <h2>Every ticket now carries the reason it exists</h2>
        <LoopDiagram />
        <aside className="notes">
          1:30–2:45{'\n\n'}
          So we built one where the intent travels. It reads what customers
          actually do, and writes the work up WITH ITS REASONING ATTACHED.{'\n\n'}
          That reasoning is the intent travelling with the artefact — the thing
          that used to evaporate.{'\n\n'}
          And it watches what happens after the ship. The interesting arrow is
          the one going back. A loop that can't see the consequence of its own
          output isn't a loop, it's an expensive suggestion box.{'\n\n'}
          BRIDGE — "keep the why next to the output, not in a chat you're about
          to close."{'\n\n'}
          NO COUNTS. No throughput. If they want volumes they can ask afterwards.
        </aside>
      </section>

      {/* 3 ────────────────────────────────────── 2:45–3:35 */}
      <section>
        <p className="kicker muted">What broke, one</p>
        <h2>It didn&rsquo;t hallucinate — it forgot what it had already said</h2>
        <p className="punch">
          Most agent failures are context failures wearing a scary mask.
        </p>
        <aside className="notes">
          2:45–3:35 · NEVER CUT — this is the credibility beat{'\n\n'}
          Everyone braces for made-up work. What we got was the same suggestion,
          again and again, because it had no view of what it had already
          proposed.{'\n\n'}
          The fix wasn't a smarter model. It was teaching it to look at what
          existed before opening its mouth.{'\n\n'}
          END THE STORY — "now the engineer reviewing them finds almost nothing
          worth throwing away." Result, no figure needed.{'\n\n'}
          BRIDGE — "if your AI keeps repeating itself, it doesn't need to be
          cleverer. It needs to be shown what it already told you."
        </aside>
      </section>

      {/* 4 ────────────────────────────────────── 3:35–4:15 */}
      <section>
        <p className="kicker muted">What broke, two</p>
        <h2>Speeding up one stage just moves the queue</h2>
        <p className="punch">
          A loop is only as fast as the slowest human left in it.
        </p>
        <aside className="notes">
          3:35–4:15{'\n\n'}
          We wrote a skill to do the Node upgrade. Branches were suddenly free.
          Nothing got reviewed and shipped — so someone just kept opening more.
          {'\n\n'}
          If your answer is "a human reviews everything", you have invented a job
          called approve, approve, approve.{'\n\n'}
          BRIDGE — "anything you speed up — hiring, content, invoicing — go and
          look at where the queue formed instead."{'\n\n'}
          IF BEHIND: compress the Node detail to one clause. Keep the one-liner
          and the bridge.
        </aside>
      </section>

      {/* 5 ────────────────────────────────────── 4:15–5:35 */}
      <section>
        <p className="kicker muted">How you form one</p>
        <h2>A loop has to explain itself, or you&rsquo;ll end up babysitting it</h2>
        <div className="three">
          <div className="item">
            <p className="name">Auditability</p>
            <p className="gloss">It can tell you why it did that.</p>
          </div>
          <div className="item">
            <p className="name">Guardrails</p>
            <p className="gloss">A prompt is a request. A tool boundary is a fact.</p>
          </div>
          <div className="item">
            <p className="name">Blast radius</p>
            <p className="gloss">Start where being wrong is survivable.</p>
          </div>
        </div>
        <aside className="notes">
          4:15–5:35 · Sentence + one scene + bridge. NOTHING ELSE.{'\n\n'}
          SAY THE COMPRESSED VERSION, don't read the three: "a loop has to be
          able to explain itself. It needs edges it cannot cross. And it needs to
          start somewhere that being wrong is survivable. Miss one and you
          haven't got a loop — you've got a pipeline you'll end up babysitting."
          {'\n\n'}
          ONE SCENE ONLY — she sat in an OKR meeting being asked which retention
          metric to chase, and picked one because the system could tell her why
          that one, and which experiments would move it.{'\n\n'}
          BRIDGE — "all three work at any size. Keep the why. Put the limit
          somewhere it can't be argued with. Start where being wrong is cheap."
          {'\n\n'}
          IF BEHIND: cut the OKR scene to a clause. The rogue-agent story is
          already cut from here — it's Q&amp;A material now.
        </aside>
      </section>

      {/* 6 ────────────────────────────────────── 5:35–6:30 */}
      <section className="invert" data-background-color="#f6f404">
        <p className="kicker">The hinge</p>
        <h2>Judgement moves from inside the loop to above it</h2>
        <div className="cols">
          <div className="col-rule">
            <p><strong>In the loop</strong></p>
            <p className="lede">Interrupt it. &ldquo;No — do it this way.&rdquo; Scales with your attention.</p>
          </div>
          <div className="col-rule on">
            <p><strong>Above the loop</strong></p>
            <p className="lede">Change its shape so it does that by default. Scales with the loop.</p>
          </div>
        </div>
        <p className="punch">Both are judgement. Only one is a job you can do at volume.</p>
        <aside className="notes">
          5:35–6:30 · NEVER CUT. This is the hinge of the whole talk.{'\n\n'}
          In the loop: you interrupt it. Scales with your attention — which does
          not scale.{'\n\n'}
          Above the loop: you change the shape of the loop so it produces that by
          default. Scales with the loop.{'\n\n'}
          Both are judgement. Only one is a job you can do at volume.{'\n\n'}
          NO BRIDGE HERE — this beat is already about them. Adding one is talking
          down.
        </aside>
      </section>

      {/* 7 ────────────────────────────────────── 6:30–7:50 */}
      <section>
        <p className="kicker muted">So which one is she?</p>
        <h2>Our best PM is doing both, and the line keeps moving</h2>
        <div className="ratio">
          <div>
            <div className="fig">9 in 10</div>
            <p className="who">Her sessions</p>
          </div>
          <div>
            <div className="fig mine">1 in 30</div>
            <p className="who">Mine</p>
          </div>
        </div>
        <p className="lede">
          She writes the same line into every prompt she sends. She never decides
          when to parallelise — she changed the conditions.
        </p>
        <aside className="notes">
          6:30–7:50 · NEVER CUT{'\n\n'}
          ASK IT OUT LOUD: "is she in the loop, or is she shaping it?"{'\n\n'}
          FOR — she mentioned almost in passing that she writes the same line
          into every single prompt she sends: "spin up sub-agents if you think
          that's appropriate." Nine sessions in ten of hers lean on sub-agents.
          Mine were closer to one in thirty. She has never once decided when to
          parallelise — she changed the conditions so the machine decides.{'\n\n'}
          AGAINST — she still reviews what comes out. Still picks the metric.
          There's still a human closing tickets by hand at the other end.{'\n\n'}
          HONEST ANSWER — both, and the line keeps moving. "I asked her and she
          said that's how she'd say she's currently operating. I believed her,
          and I still couldn't tell you where the boundary sits. I made this
          distinction up on a call last week. It's September 2026. Nobody knows."
          {'\n\n'}
          THE RHYME, ONCE — "I asked the system why it opened a ticket and it
          could tell me. I asked her why she works this way and she could tell me
          too. Both of those are newer than they sound."{'\n\n'}
          BRIDGE — "you don't need sub-agents. The move is: stop remembering to
          do the good thing, and change the default so you don't have to."{'\n\n'}
          IF BEHIND: cut the AGAINST side before the FOR side. Keep the rhyme.
          {'\n\n'}
          ⚠ MIMA'S DATA — must be cleared with her before this is shown.
        </aside>
      </section>

      {/* 8 ────────────────────────────────────── 7:50–9:15 */}
      <section>
        <p className="kicker muted">What&rsquo;s left</p>
        <h2>Handing over the <span className="accent">what</span> makes the <span className="accent">why</span> your job</h2>
        <p className="punch">
          You no longer write the PRD. You build the farm that grows PRDs.
        </p>
        <aside className="notes">
          7:50–9:15 · NEVER CUT the why-becomes-the-job beat{'\n\n'}
          Her answer, unprompted: working out the right thing to build.
          Understanding user pain, applying judgement to THAT, and building the
          systems that surface which thing matters most.{'\n\n'}
          THE SECOND-ORDER EFFECT — getting lost in the what was a TRAP, and for
          thirty years it was COMPULSORY. Every engineer and every product
          manager fell into it, because the job genuinely required somebody down
          there. Hand the what to a machine and the why becomes the only thing
          left to do. The tool doesn't only produce value — it moves you up a
          level, whether or not you meant to go.{'\n\n'}
          ⚠ TONE — this is the slide that can go wrong in the room. The weeds
          were compulsory and YOU WERE IN THEM TOO. Never "people were doing it
          wrong."{'\n\n'}
          Farmers don't care about a grain of wheat. They care about the farm.
          {'\n\n'}
          And the honest bit: this isn't a transitional phase. Shaping the loop
          is a full-time job forever — priorities keep moving and the loop has to
          move with them.{'\n\n'}
          IF BEHIND: drop the farmer image, keep the PRD line and the why.
        </aside>
      </section>

      {/* 9 ────────────────────────────────────── 9:15–9:45 */}
      <section className="invert" data-background-color="#f6f404">
        <p className="close-q">Does your software know why it exists?</p>
        <p className="close-q second">Do you?</p>
        <p className="hiring">Flock is hiring · Valencia · Madrid · London</p>
        <aside className="notes">
          9:15–9:45{'\n\n'}
          It's September 2026 and nobody knows if this is right, including me.
          {'\n\n'}
          The model isn't the variable any more — I pulled the strongest coder
          out of my own multi-model harness and the output was still good enough,
          from an open-weights model you can reportedly run at home. Six months
          ago I'd have said token prices were going up. Now I think they go to
          roughly zero.{'\n\n'}
          IF THE MODEL IS COMMODITY, THE LOOP YOU WRAP AROUND IT IS THE WHOLE
          PRODUCT.{'\n\n'}
          BRIDGE — "if you're choosing tools, stop optimising which model and
          start looking at what you've wrapped around it."{'\n\n'}
          THE CLOSE — the opening question. Then a beat. Then "do you?"{'\n\n'}
          NEVER ADD A THIRD QUESTION. Then the hiring line and stop.{'\n\n'}
          ⚠ Verify the model claim before this is said — transcript audio was
          rough.{'\n\n'}
          NOTE: this title is a deliberate breach of playbook rule 04. Compliant
          alternative if wanted: "You are the one being asked", question spoken.
        </aside>
      </section>
    </>
  )
}
