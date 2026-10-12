# Digital Profits PH website

The static site for **Digital Profits PH** and *The ₱100K Investment Challenge*, hosted on GitHub Pages at https://digitalprofitsph.github.io/.

Plain HTML, CSS and a little JavaScript. There's no build step: whatever is in this repo is what gets served.

## Files
- `index.html`: the whole page (hero, Kuya JB, the 4 phases, the 3 rules, episodes, Ka-Profits, footer)
- `styles.css`: colours and layout. The brand colours sit at the top under `:root`
- `script.js`: mobile menu, scroll fade-ins, and the Episode 1 premiere label (switches by itself after Oct 13, 2026, 6 PM PH time)
- `starting-point/`: the Starting Point Calculator from Episode 3 (`index.html` + `calc.js`). Viewers enter income, expenses, what they have and debts, and see their surplus, net worth, emergency-fund months, position 1/2/3 and time to ₱100K. Everything is computed in the browser; nothing is saved or sent. "Subukan ang halimbawa ni Ana" loads the episode's example.
- `404.html`: the "page not found" page
- `assets/`: logo, favicon, Kuya JB photo, episode thumbnails, social share image (`og-image.png`, 1200×630)

## Common edits
- **New episode:** in `index.html`, copy the Episode 1 `<a class="episode">` block inside `<div class="episodes">`, then change the link, thumbnail, title and text. Put the thumbnail in `assets/` as a 960×540 `.webp`. Move the "Abangan" card down to the next episode.
- **Links:** YouTube channel `https://www.youtube.com/@digitalprofitsph`, series playlist `https://www.youtube.com/playlist?list=PLdHB0yVSAcLo`.

## Preview locally
```bash
python -m http.server 5180
```
Then open http://localhost:5180.

## Deploy
GitHub Pages serves the `main` branch root (Settings → Pages → Deploy from a branch → `main` / `/ (root)`). Every push to `main` goes live in about a minute.
