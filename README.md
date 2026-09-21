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

Nine slides. Read the titles alone and you get the whole thing:

1. Your software doesn't know its purpose
2. We stopped writing down what to build

Then the four things that make one of these work, in the order they have to
happen — you can't audit against a goal you never set, and you can't judge
history without one either:

3. **Feedback loop** — give it a goal. Check it got there.
4. **Make it auditable** — if it can't explain itself, you've just hired it a babysitter
5. **Give it a memory** — hearing it again should change how sure you are
6. **Make it scale** — a loop with you in it runs at your speed

7. You can't shape a loop without knowing what it's for
8. This is the most software engineering I've done in twenty-five years
9. Does your software know its purpose? Do you?

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
