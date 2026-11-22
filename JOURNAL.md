# Journal

Newest first. What we did, and what we learned.

## 22 Nov 2026
- Removed the "خرج سالانه" (yearly cost) card from Tools (Aref's request).
- Learned: GitHub Pages lets phones keep each file for up to 10 minutes, so new pushes
  didn't show. Fix: `sw.js` now fetches with `cache: "no-cache"` (always checks for a newer file).
- v0.3: Home keeps the new order but gets the old colorful look back: hello + avatar,
  red countdown card, colored icon rows, news cards with colored thumbnails and tags,
  colored emergency tiles, emoji in section titles.
- v0.2: put the new Home into the real app (`vHome` in `index.html`).
  Removed the countdown ring, tool cards, fake news, tip and the fake "remind me" button.
  Reminder shows bollo and insurance only, closest first. Checked on a phone-size screen, light and dark.
- New Home draft (top of `design/directions.html`): reminder, latest news from the
  real channel posts (17, 14, 11), emergency numbers with tap to call.
- Read the whole repo and listed what's weak (see `STATUS.md`).
- Added the four project docs: STATUS, ROADMAP, DECISIONS, JOURNAL.
- Added `design/directions.html`: three redesign directions (Home, Garage, Bollo),
  so Aref can compare them on his phone.
- Learned: `sw.js` ignores files from other websites, which is why the Google font
  is never cached for offline use.
