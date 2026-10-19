# Crabwise Baltimore — React Storyboard Prototype

Single-page Vite + React prototype for a Baltimore crab-search concept.

## Interaction

1. The crab explosion/reassembly intro video autoplays on load.
2. When the intro ends, the landing page is revealed.
3. Search accepts any crab-related query and opens a mock article preview directly beneath the search box.
4. Editorial source chips filter the mock results.
5. Any result card can be opened in the same article-preview panel.
6. “Replay crab intro” replays the transition concept.

## Editorial source targets

- Baltimore Magazine — Food & Drink
- Baltimore Fishbowl — Food & Drink
- Eating Baltimore
- The Baltimore Banner — Food & Drink

The current build **does not scrape or query those sites**. Results are intentionally mocked for storyboarding. A production version should use permitted RSS feeds, APIs, licensed indexing, or manually curated links rather than scraping without permission.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
```

The intro asset lives at `public/crab-intro.mp4`.
