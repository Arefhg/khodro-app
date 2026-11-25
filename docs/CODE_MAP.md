# Code map – where everything lives

```
index.html            the page: meta tags, the phone frame, and the list of scripts (≈60 lines)
css/app.css           every style. Colors and sizes are variables at the top (--tint, --label…)

i18n/                 languages
  i18n.js             picks the language, tr("Persian text") → Italian/English
  it.js, en.js        the translations (Persian text is the key)
data/                 facts, no code logic
  bollo-2026.js       bollo rates for every region (official sources: docs/BOLLO_SOURCES.md)
  news.json           the news box on Home

js/                   the app, loaded in this order ↓
  core.js             small helpers: Persian digits, dates, money
  insurance.js        insurance estimate (IVASS data) + quote engine
  bollo.js            calcBollo(): the bollo math
  state.js            app data (cars, settings), icons, car drawings, deadline helpers
  news.js             reads data/news.json, draws the news box
  reminders.js        phone reminders (store apps only)
  screens.js          one function per screen: vHome(), vGarage(), vBollo()…
  app.js              navigation + back button, taps/typing, saving, start   ← always last

tests/                npm test – GitHub runs it on every push
```

## How a tap becomes a screen
```
tap ──► app.js (click listener) ──► go("bollo") ──► screens.js vBollo() ──► HTML on the phone
                                                       │
                                                       └─ uses bollo.js, state.js, core.js
```

## Rules to remember
- The js files share one scope (no import/export), so the **order in index.html matters**.
  A file can only *run* code from files above it while loading. Functions called later
  (after a tap) can live anywhere.
- Add a new file? Add it in 3 places: `index.html`, `sw.js` (FILES, and bump CACHE), and `scripts/copy-web.mjs` copies the whole `js/` and `css/` folders by itself.
- New text on screen? Wrap it in `tr("…")`, then add the Italian and English with `scripts/i18n-sync.py`.
