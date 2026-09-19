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

Three openers are built. One renders at a time — set `COLD_OPEN` at the top of
`src/slides.jsx` to `'card'`, `'belt'` or `'portrait'`. The deck is always nine
slides whichever you pick.

| Value | What it opens on |
|---|---|
| `card` | The software's own self-description — every line answerable except the last |
| `belt` | A feature factory, which predates all of this; the machines only sped the line up |
| `portrait` | A homepage that can tell you everything about itself except why it exists |

## The argument

Nine slides. Read the titles alone and you get the whole thing:

1. Your software doesn't know why it exists
2. Every ticket now carries the reason it exists
3. It didn't hallucinate — it forgot what it had already said
4. Speeding up one stage just moves the queue
5. A loop has to explain itself, or you'll end up babysitting it
6. Judgement moves from inside the loop to above it
7. Our product team is doing both, and the line keeps moving
8. Handing over the *what* makes the *why* your job
9. Does your software know why it exists? Do you?

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
