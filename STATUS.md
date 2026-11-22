# Status

Last update: 22 Nov 2026

## Where we are
- Version 0.1 is live on GitHub Pages and installed on Aref's iPhone.
- Phase 1 (redesign) has started. Three design directions are in `design/directions.html`.
  Waiting for Aref to choose one.

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
- "Remind me" shows a message, but no reminder exists.
- Dark mode choice is not saved.
- The font loads from Google and is never cached, so offline it falls back to the system font.
- Home news is invented sample text.
- Bollo rates come from the "Bollo Auto" guide and are not yet checked against official sources.
  Euro 0–3 rates are a guess (national rate × region rate ÷ 2.58), not real data.
- Garage dates are fake demo dates.
- `user-scalable=no` blocks zoom.

## Next step
- Aref picks a design direction and answers the open questions (see `DECISIONS.md`).
