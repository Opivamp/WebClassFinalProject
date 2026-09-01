# Jack — 3D Creator

A single-page portfolio landing site for a fictional 3D creator. Dark theme, oversized gradient type, and scroll-driven motion throughout.

**Live sections:** hero → scrolling marquee → about → services → projects → contact.

## Stack

| | |
|---|---|
| Framework | React 18.3 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion 12 |
| Icons | lucide-react |
| Font | [Kanit](https://fonts.google.com/specimen/Kanit) 300–900 (Google Fonts) |

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev      # dev server on http://localhost:5173
```

```bash
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
├── App.tsx                    # section order + page wrapper
├── index.css                  # reset, #0C0C0C background, .hero-heading gradient
├── components/
│   ├── FadeIn.tsx             # scroll-triggered fade/slide wrapper (whileInView)
│   ├── Magnet.tsx             # cursor-following magnetic hover effect
│   ├── AnimatedText.tsx       # character-by-character scroll reveal
│   ├── ContactButton.tsx      # gradient pill CTA
│   └── LiveProjectButton.tsx  # ghost/outline pill
└── sections/
    ├── HeroSection.tsx        # nav, "HI, I'M JACK", magnetic portrait
    ├── MarqueeSection.tsx     # two rows counter-scrolling with page scroll
    ├── AboutSection.tsx       # gradient heading + scroll-revealed paragraph
    ├── ServicesSection.tsx    # white panel, five numbered services
    ├── ProjectsSection.tsx    # sticky cards that scale down as they stack
    └── ContactSection.tsx     # email, socials, footer
```

## How the motion works

**`FadeIn`** wraps any element type via `motion.create()` and animates it once when it scrolls into view. Takes `delay`, `duration`, `x`, `y`.

> Note: `FadeIn` writes an inline `transform`, which overrides Tailwind translate classes such as `-translate-x-1/2`. Put positioning on a wrapper element, not on `FadeIn` itself — see the hero portrait in `HeroSection.tsx`.

**`MarqueeSection`** maps page scroll to horizontal movement rather than using a CSS animation. Row 1 slides right, row 2 slides left:

```
offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
```

Each row triples its image set and starts shifted by `-33.3333%` (exactly one set), so the strip never runs out of content at either edge.

**`ProjectsSection`** uses `useScroll` + `useTransform` for the card stack. Card `i` scales toward `1 - (total - 1 - i) * 0.03`, and each sticky card is offset `i * 28px` lower so the stack stays readable. The responsive sticky offset is composed with a CSS variable:

```
top-[calc(6rem+var(--card-offset))] md:top-[calc(8rem+var(--card-offset))]
```

**`AnimatedText`** splits the paragraph into characters and drives each one's opacity from `0.2 → 1` based on its position relative to scroll progress (`offset: ['start 0.8', 'end 0.2']`). Each character renders an invisible placeholder plus an absolutely positioned animated copy, so layout never shifts.

## Before you publish

Placeholder values in `src/sections/ContactSection.tsx` need replacing:

- `EMAIL` is `hello@example.com`
- All social links (`Instagram`, `Dribbble`, `LinkedIn`) point at `#`

Image assets are hotlinked from external CDNs. Host them yourself if you need this to survive those URLs changing.
