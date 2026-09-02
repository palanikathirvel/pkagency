# P.K Creative Agency — Portfolio Website

A single-page portfolio for **P.K Creative Agency**, built as a static site — no build step, no dependencies.

## Design direction

**"Warm Editorial × Red, Black & White"** — the editorial layout system
(Fraunces serif display + General Sans grotesque, asymmetric grid, airy spacing)
rendered strictly in the palette of the agency's PK eagle emblem:

| Role | Color | Hex |
| --- | --- | --- |
| Base background | Pure white / soft white | `#FFFFFF` · `#F8FAFC` |
| Primary ink | Emblem black | `#09090B` · `#111111` |
| Primary accent | Emblem red | `#DD121A` |
| Deep red (hover / gradients) | Dark red | `#A80E15` |
| Neutral grays | Slate support | `#F1F5F9` · `#4B5563` |

No other hues are used anywhere — buttons, tags, avatars, artwork and even the
WhatsApp button all stay within red, black, white and gray.

## Structure

Nav → Hero (emblem in editorial frame) → Proof band (client marquee + animated stats) →
Services → Process → Selected Work → Testimonials → Dark CTA band → Footer (with newsletter).

## Motion

Preloader with counter, split-line headline reveals, staggered scroll fades, animated stat
counters, slow client marquee, magnetic buttons, custom cursor with "View" state, hide-on-scroll
nav, and a gold scroll-progress hairline. All motion is disabled under `prefers-reduced-motion`.

## Run it

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Files

```
index.html      — markup (all sections + inline SVG artwork)
css/style.css   — design system, components, responsive + reduced-motion rules
js/main.js      — motion & interaction layer (vanilla JS, ~300 lines)
assets/         — emblem (logo.jpg, logo-nav.png) and favicon.png
```

Client names, testimonials and stats are placeholders — swap in real copy when ready.
