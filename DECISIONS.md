# Decisions

Each decision: the date, what we chose, and why.

## 22 Nov 2026 – Every step goes straight to the repo
- Chose: small commits pushed to `main` after each step.
- Why: Aref wants to watch each change live on his phone (GitHub Pages serves `main`).

## 22 Nov 2026 – Insurance price model is on hold
- Chose: keep the code, spend no time on it now.

## 22 Nov 2026 – Home has three sections
- Chose (Aref): 1) reminder for bollo or insurance, 2) latest news, short, with the Telegram channel link, 3) emergency numbers.
- Style (Aref): keep the old colorful look (colors, emoji, countdown ring) with the new order.

## 22 Nov 2026 – No yearly cost tool
- Chose (Aref): remove "خرج سالانه" from the app and the roadmap.

## 23 Nov 2026 – Store apps with Capacitor, iOS first
- Chose: Capacitor, which puts the same web app inside real iOS and Android apps.
- Why: Aref wants the store apps to look exactly like the web app, and one code for both phones.
  SwiftUI or React Native would mean redrawing every screen.
- Cost of this choice: Apple may reject "a repackaged website" (Guideline 4.2), so the app
  needs real phone features (reminders) before review.
- App ID: `com.arefhg.khodroitaly`. Can still change before the first upload; never after.
- The web files stay in the repo root (GitHub Pages keeps working); `npm run sync` copies them into the apps.

## 23 Nov 2026 – Bollo data in its own file
- Chose: `data/bollo-2026.js` holds all rates + source per region; code only calculates.
- Why: next year we update one data file, not the code. Every number has a source and a status.
- Where an official sheet couldn't be read, we show "تأیید نشده" in the app instead of hiding it.

## 25 Nov 2026 – Store page language
- Persian isn't an App Store language. Plan: primary language Italian, Persian text inside, short Italian
  paragraph at the end. Aref to confirm. Not confirmed that App Review accepts this.

## 25 Nov 2026 – Three languages, Persian text as the key
- Chose (Aref): the app in Persian, Italian and English.
- How: gettext style — `tr("Persian text")`, translations in `i18n/it.js` and `i18n/en.js`.
  Why: turning 500 sentences into named keys by hand was slow and risky; this way a missing
  translation shows the Persian text instead of breaking.
- Default language = the phone's language if it's fa/it/en, otherwise Persian.
- Store pages: Italian (primary) and English, because Persian isn't an App Store language.

## Open questions (waiting for Aref)
1. Mac: does Aref have one, or do we use a cloud Mac for iOS builds?
2. Desktop demo: move it to a separate `demo.html`?
3. Code structure: plain files with no build step, or a small build tool (Vite)?

## 25 Nov 2026 – Split index.html into css/ and js/ (plain scripts, no build tool)
- Why: one 1,500-line file was hard to read and risky to change.
- How: cut at the existing section titles; plain `<script>` files in a fixed order.
- Not chosen: ES modules / a bundler (Vite). It would need import/export in every file and a
  build step before every test; not worth it at this size. Can be done later if the app grows.
