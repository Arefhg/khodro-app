# Status

Last update: 23 Nov 2026

## Where we are
- Version 0.3 is live on GitHub Pages and installed on Aref's iPhone.
- v0.3: new Home with three sections (reminder, latest news, emergency numbers), in the old colorful style.
- Phase 1 (redesign) has started. Three design directions are in `design/directions.html`.
  Waiting for Aref to choose one.

## Store apps (iOS and Android)
- Capacitor projects are in the repo: `ios/` and `android/`. They wrap the same web app.
- Not built or tested yet: iOS needs a Mac (or a cloud Mac); Android needs Android Studio.
- Icons are scaled up from 512 px: need a sharp 1024 px icon before publishing.
- Real reminders added (local notifications). Only in the store apps; not yet tested on a real phone.

## Languages (25 Nov 2026)
- The app speaks Persian (RTL), Italian and English (LTR). 496 texts, all translated (`i18n/`).
- Language: first screen + Settings; default = phone language, else Persian.
- Check missing translations any time: `node scripts/i18n-keys.mjs`.

## Store page (prepared 25 Nov 2026)
- Screenshots (5), listing text, privacy policy page and in-app link are ready (`store/`, `privacy.html`).
- Store pages: Italian (primary) + English, each with a Persian paragraph (NOT CONFIRMED that Apple accepts it).
- Vehicles can be edited and deleted. No "coming soon" placeholders left (Apple rule 2.1).
- Code is ready for version 1.0. Last part: the 1024 icon (see `docs/BUILD.md` → Changing the icon).
- Then from Aref: full name for copyright, Apple Developer account, a Mac for the build.

## What works
- Onboarding, Home, Garage (with add-vehicle sheet and detail page), Tools, Settings.
- Bollo calculator (car and moto, 20 regions).
- Insurance guide and price estimate (model is ON HOLD).
- Emergency numbers (checked on official sources, 22 Nov 2026).
- Works offline (network first), light and dark mode.

## Known problems
- The whole app is one file (`index.html`, about 1,300 lines).
- The desktop demo (phone frame, step list, gallery) is mixed into the app code.
- Every tap rebuilds the screen: scroll jumps, no swipe-back, browser back leaves the app.
- Home news is typed in by hand from the Telegram channel (posts 17, 14, 11). Later it must come from the news bot.
- Dark mode choice is not saved.
- Bollo rates checked on official 2026 sheets (23 Nov 2026), in `data/bollo-2026.js`.
  NOT CONFIRMED: Calabria and Molise (official sites unreachable), Liguria Euro 0/1, Trento Euro 6 over 100 kW.
  Piemonte uses its 2025 sheet. Discounts/exemptions are not calculated.
- `user-scalable=no` blocks zoom.

## Next step
- Aref picks a design direction and answers the open questions (see `DECISIONS.md`).
