# Journal

Newest first. What we did, and what we learned.

## 25 Nov 2026 (night) – review and fixes
- A: back navigation (history: Android back, swipe-back, form closes first), news from data/news.json
  (in-app copy + fresh copy from GitHub), user text escaped, zoom allowed, fake profile removed.
- B: "I paid it" moves bollo/insurance +1 year, revisione +2 years (MIT rule).
- C: red only for urgent/main action; Home card red/orange/green by urgency; ring and bars = time left;
  WCAG 4.5:1 text colors; icons instead of emoji; small text raised.
- D: tests in the repo (26: bollo math, translations, all screens × 3 languages, add/edit/paid/delete,
  back button) + GitHub Actions on every push.
- Learned: a script that removes "unused" translations missed labels kept in a list → screen tests
  now catch any untranslated text.

## 25 Nov 2026 (evening)
- Three languages: `i18n/i18n.js` (tr(), direction, numbers, dates), `it.js`, `en.js`.
  Persian text in the code is the key ("gettext" style). A parser script wrapped 470 texts in tr();
  the function is `tr` because `t` was already a local name in 15 places.
- Fixed for LTR: right/left → start/end, arrows, switch, slider, hero title, button rows.
- Placeholders for sentences with a number in the middle: tr("کلاست بعد از {n} سال", {n}).
- «یورو» means both euro money and Euro class → separate text "یورو {n}" for the class.
- Vehicles: edit + delete. Tools: removed "coming soon" cards (Apple 2.1); news card opens Telegram.
- Android app name per language; iOS needs an InfoPlist.strings step in Xcode (in BUILD.md).
- Store: Italian + English listings, screenshots in fa/it/en, privacy page in 3 languages.
- Tested all 13 screens in 3 languages: no errors, no missing texts.

## 25 Nov 2026
- Store prep: 5 screenshots at 1320 × 2868 (`scripts/store-screenshots.py`), `store/LISTING.md`,
  `privacy.html` (Persian + Italian), privacy link in Settings.
- Settings: Telegram and Instagram rows are now real links; removed the old "this is only a design
  sample, data is fake" note; version 0.3.
- Left the insurance price estimate out of the screenshots (model on hold, not checked).
- Learned: Persian is not one of the 50 App Store languages; keywords are 100 **bytes** (Persian = 2 bytes
  per letter); a privacy policy URL is required for every app and must also be linked inside the app.

## 23 Nov 2026
- Font inside the app: `fonts/Vazirmatn-Variable.woff2` (v33.0.3, one 111 KB file for all weights,
  OFL license in `fonts/OFL.txt`). Removed Google Fonts. Tested with internet blocked: font loads,
  and the app makes no outside requests.
- Bollo: checked all 21 regions/provinces on official sheets (ACI + regions). New data file
  `data/bollo-2026.js` (first step of splitting index.html), sources in `docs/BOLLO_SOURCES.md`.
  Calculator rewritten: real Euro 0–6 and motorbike rates per region, Piemonte power bands,
  Trento and Bolzano separate, kW without decimals, motorbikes over 11 kW = base + rate × all kW,
  superbollo, honest "not confirmed" badge, source link, 2027 exemption note. 19 test cases pass.
- Learned: the guide had several wrong regions (Trento/Bolzano, Marche, Molise, Piemonte) and
  motorbike rates are regional. Big news: bollo 2027 exemption (DL 162/2026, L. 209/2026).
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
