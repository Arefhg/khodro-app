# Journal

Newest first. What we did, and what we learned.

## 23 Nov 2026
- Real reminders (store apps only): @capacitor/local-notifications. 14 and 3 days before and on the day,
  at 9:00, for bollo, insurance and revisione. Rescheduled on every change; the Settings switch turns them off.
  Removed Android's exact-alarm permission (day-level reminders don't need it).
  Tested with a fake plugin in the browser; not yet tested on a real phone.
- Learned: a web app on the iPhone home screen can't schedule notifications without a server.
- No more fake data: the real app starts with an empty Garage (demo vehicles only in the desktop demo);
  old demo vehicles saved on phones are removed; add-vehicle sheet has real dates (bollo, insurance,
  revisione, all optional); model and kW are required; no invented plate, fuel or kW.
- Learned: "·" next to a Persian number looks like ۰ (Persian zero is a dot), so use ":".
- Added Capacitor 8: `package.json`, `capacitor.config.json`, `scripts/copy-web.mjs`.
- Added `ios/` and `android/` projects. iOS uses Swift Package Manager (no CocoaPods needed).
- `scripts/make-icons.py` makes all icons and splash screens from one picture.
- `index.html`: inside the store apps, always full-screen and no service worker.
  Tested by faking Capacitor on an iPad-size screen.
- Wrote `docs/BUILD.md` (iOS first, step by step).
- Learned: iOS apps can only be built on macOS; Apple requires Xcode 26 for uploads;
  Apple Guideline 4.2 rejects apps that feel like a website in a frame.

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
