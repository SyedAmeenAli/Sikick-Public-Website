# Hero film sources

HyperFrames compositions (HTML + GSAP) for the homepage film.

- `landscape/` 1920x1080, 30 fps, 10 s -> `public/media/sikick-hero.mp4`
- `portrait/` 1080x1920, 30 fps, 10 s -> `public/media/sikick-hero-portrait.mp4`

Render (needs Node 22+, ffmpeg and ffprobe on PATH):

```bash
cd film-src/landscape && npx hyperframes render -o ../../public/media/sikick-hero.mp4 -f 30 -q standard
cd film-src/portrait  && npx hyperframes render -o ../../public/media/sikick-hero-portrait.mp4 -f 30 -q standard
```

`mark-data.js` is generated from `src/components/hairline/siborgShapes.ts`
(run `node scripts/generate-siborg-assets.mjs` first, then re-export the SB_MEDIUM block).
