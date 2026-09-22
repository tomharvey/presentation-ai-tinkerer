# Does your software know why it exists?

A 10-minute talk on self-improving systems — what changes when you hand work to
agents, and what's left for the people who used to do it.

**AI Tinkerers**

The slides carry no venue, date or location, so the deck travels — anything
specific to a given delivery is spoken, not printed.

## Run it

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # static bundle in dist/
```

## Presenting

- **`S`** opens the speaker view. Every slide's notes carry its time slot, the
  beats to hit, and what to cut if you're running behind.
- Configured `totalTime: 600`, so the speaker view paces against the real
  10-minute slot.
- **`F`** fullscreen · **`O`** overview · **`B`** blank the screen.
- Fixed 1280×720 canvas; reveal scales it to whatever the projector is.

## Choosing the cold open

Three openers are built. One shows at a time, so the deck is always nine slides.
Switch without touching the code:

- **Press `C`** while the deck has focus — cycles targets → guess → belt → portrait
- or open the deck with **`?open=belt`** / **`?open=portrait`**

| Value | What it opens on |
|---|---|
| `targets` | **Default.** The site thinks in numbers somebody is carrying — +20% more sales, 1,000 signups a day, −100 support requests, +15% weekly returns |
| `guess` | The same in words — take money, sign up users, cut the calls, retain users |
| `belt` | A feature factory, which predates all of this; the machines only sped the line up |
| `portrait` | A homepage that can tell you everything about itself except why it exists |

## The argument

Nine slides. Numbers below match the counter on screen, so slide 1 is the
holding card — identity only, up while you walk on, says nothing. Read the
eight that follow and you get the whole argument:

2. Your software doesn't know its purpose
3. We stopped caring about the what. We care about the why.

Then the four pillars, in the order they have to happen — you can't audit
against a goal you never set, and you can't say what a system isn't allowed to
do until you've said what it's for:

4. **Feedback loop** — give it a goal. Make it improve itself.
5. **Make it auditable** — "the agent did it" is not a reason. It's just sloppy.
6. **Guardrails** — it will hit the goal. That's the bit to worry about.
7. **Make it scale** — a loop with you in it runs at your speed

8. You don't build the thing any more. You build what builds it.
   *(and that is not a smaller job — the misreading this slide exists to kill)*
9. Does your software know its purpose? Do you?

The overarching move is slide 3 to slide 8: let go of the *what*, lean into the
*why*. The four pillars are what makes that safe to do.

There was a fifth pillar, **give it a memory**, between auditable and
guardrails. Cut for time on 21 Sept, not because it was wrong — it held the
best concrete story in the deck and needed a minute it didn't have. The slide
and its `TicketBoard` component are in git history. Restoring it means three
things, not one: the eyebrows read *of four*, slide 8's spoken callback goes
back to three ("and a place in the history"), and you need a minute from
somewhere.

## Hosting

The deck builds to static files and is set up to publish to GitHub Pages via
`.github/workflows/deploy.yml`. `base` is `'./'` so it works at any path — local
dev, Pages project path, or a file:// copy on a laptop at the venue.

The repo is public (as of 22 Sept). **One manual step remains:** on GitHub go to
**Settings > Pages > Build and deployment > Source**, and choose **GitHub
Actions** (not "Deploy from a branch"). Then re-run the latest workflow, or push
anything. The site lands at
<https://tomharvey.github.io/presentation-ai-tinkerer/>.

Until that's set, the workflow's `build` job succeeds and `deploy` fails on
`actions/deploy-pages` — which is exactly what the failed runs before this
point were.

⚠ **Read this before making it public.** The deck states Jay's retention figure
(59% of activated customers, from the owned dashboard), the £110m Admiral
acquisition figure, and the goal sentence given to the system. All of it is said
aloud at the meetup, so none of it is secret — but a Pages site is permanently
indexed, which is not the same as said once in a room. That is a deliberate
call, not a side effect of wanting a link.

`CUE-CARD.md` is gitignored on purpose. It is personal delivery notes — which
numbers keep coming out wrong, which words drift — and it belongs in the private
vault, not on the open web.

### Running it offline, which is the backup that actually matters

⚠ **Double-clicking `dist/index.html` does not work.** It opens to a blank deck
— zero slides. The build is ES modules, and browsers refuse to load those over
`file://`. Verified, not assumed.

The deck needs to be *served*, even locally. Any of these work with no network:

```
npm run dev        # what you've been using
npm run preview    # serves the production build
cd dist && python3 -m http.server 8000
```

Pages is a convenience, not a fallback — if the venue wifi is down, so is the
hosted copy. `npm run dev` on the laptop is the real backup.

## Speaker notes

Press `S`. The notes are the cue card and nothing else — for each slide, the
phrases to land and the one bridge line into the next slide. They used to carry
the full run sheet, tone notes and sourcing; that was too busy to read while
talking, and all of it still lives in the vault script.

Two conventions: CAPITALS are sentences to land exactly, and the `→` line is the
bridge. Say the bridge, advance, then pause while the room reads the new slide.

## Stack

reveal.js 5 + React 18 + Vite. Typography and colour derive from Flock's brand
tokens; Roboto is used deliberately, as the brand book's documented substitute
where the primary licensed typeface can't be embedded. Everything is left
aligned — that's a brand rule, not a preference.

### Two things reveal-in-React will bite you with

Both are fixed here. Noting them because both present as a correctly-coloured
**blank screen**, which is a misleading symptom.

1. **Never set `height` or `display` on `.reveal .slides section`.** reveal
   measures sections to compute its scale factor. Override either and it
   collapses to `minScale` and translates off-canvas. Let reveal own vertical
   centring (`center: true`).
2. **Give `html, body, #root` an explicit `height: 100%`.** reveal normally owns
   the whole page and inherits height from `<html>`. Mounted inside React's
   `#root` it doesn't, so it measures a zero-height viewport.

---

Preparation, source material and the full run sheet live separately, in my notes
vault — this repo holds the slides only.
