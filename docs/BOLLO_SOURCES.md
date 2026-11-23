# Bollo rates – where every number comes from

Checked on **23 November 2026**. Data file: `data/bollo-2026.js`.
"Official" = the 2026 rate sheet (tariffario) from ACI or from the region itself.

## How bollo is calculated (from the official sheets)
- **Cars:** kW (from the libretto, **without decimals**) × the region's rate for the Euro class.
  Up to 100 kW one rate; every kW over 100 a higher rate.
  Example (Campania, Euro 6, 110 kW): 100 × 3.12 + 10 × 4.69 = **358.90 €**.
- **Piemonte is different:** the rate depends on the car's power (up to 53 kW / 54–100 / 101–130 / over 130).
- **Motorbikes over 50 cc:** a fixed amount up to 11 kW. Over 11 kW: fixed amount + rate × **all** kW
  (Lombardia: "€ 0,88 * KW totali"; Liguria: "da applicare su tutti i kW").
  Example (Lombardia, Euro 4, 33 kW): 19.11 + 0.88 × 33 = **48.15 €**.
- **Superbollo (national):** 20 € for each kW over 185 kW.

## Region by region (Euro 4/5/6, up to 100 kW → over 100 kW)
| Region | Rate | Status | Source |
|---|---|---|---|
| Abruzzo | 3.12 → 4.69 | ✅ official | ACI Tariffario-Abruzzo-2026.pdf |
| Basilicata | 2.58 → 3.87 | ✅ official | ACI Tariffario-Basilicata-2026.pdf |
| Calabria | 2.84 → 4.26 | ⚠️ NOT CONFIRMED (region site unreachable; alvolante.it) | tributi.regione.calabria.it |
| Campania | 3.12 → 4.69 | ✅ official | ACI Tariffario-Campania-2026.pdf |
| Emilia-Romagna | 2.84 → 4.26 | ✅ official | ACI Tariffario-Emilia-Romagna-2026.pdf |
| Friuli-Venezia Giulia | 2.58 → 3.87 | ✅ official | ACI Friuli-e-Sardegna-2026.pdf |
| Lazio | 2.84 → 4.26 | ✅ official | ACI Tariffario-Lazio-2026.pdf |
| Liguria | 2.84 → 4.26 | ✅ official (Euro 0/1 ⚠️, see notes) | bolloauto.regione.liguria.it Autovetture.pdf |
| Lombardia | 2.58 → 3.87 | ✅ official | ACI Tariffario_Lombardia_2026.pdf |
| Marche | 2.79 → 4.18 | ✅ official | regione.marche.it, Tassa automobilistica page |
| Molise | 2.76 → 4.14 | ⚠️ NOT CONFIRMED (region site unreachable; alvolante.it, table from 2016) | regione.molise.it |
| Piemonte | by power: 2.58 / 2.73 / 2.79→4.18 / 2.84→4.26 | ✅ official, **2025** sheet (no 2026 sheet yet) | regione.piemonte.it media/57917 |
| Puglia | 2.58 → 3.87 | ✅ official | ACI Tariffario-Puglia-2026.pdf |
| Sardegna | 2.58 → 3.87 | ✅ official | ACI Friuli-e-Sardegna-2026.pdf |
| Sicilia | 2.58 → 3.87 | ✅ official | ACI Tariffario-Sicilia-2026.pdf |
| Toscana | 2.71 → 4.26 | ✅ official | ACI Tariffario-Toscana-2026.pdf |
| Trento (province) | Euro 4: 2.58→3.87, Euro 5: 2.06→3.10, Euro 6: 1.96→2.95 ⚠️ | ✅ official (Euro 6 over 100 kW NOT CONFIRMED) | ACI Tariffario-Trento-2026.pdf |
| Bolzano (province) | Euro 4: 2.32→3.48, Euro 5: 2.09→3.13, Euro 6: 1.96→2.94 | ✅ official | ACI Tariffario-Bolzano-Italiano-2026.pdf |
| Umbria | 2.58 → 3.87 | ✅ official | ACI Tariffario-Umbria-2026.pdf |
| Valle d'Aosta | 2.58 → 3.87 | ✅ official | regione.vda.it allegato pk=27477 |
| Veneto | 2.84 → 4.26 | ✅ official | Regione Veneto table (Google Drive link on regione.veneto.it) |

Euro 0–3 and motorbike rates for every region are in `data/bollo-2026.js`.

## Notes
- **Liguria:** the region says Euro 0 and Euro 1 got +10% from 1 Jan 2023, but its own table still shows
  3.30 and 3.19. We use the table. Euro 0/1 in Liguria: NOT CONFIRMED.
- **Lombardia motorbikes Euro 3+:** 20.00 € up to 11 kW, but the formula over 11 kW starts from 19.11 €.
  Both are as printed on the official sheet.
- **Not included:** discounts and exemptions (electric, LPG/methane, hybrid, historic cars, direct debit −10%
  in Campania and others, Bolzano −10% for Euro 5+).

## 2027 exemption (DL 162/2026, converted by L. 209/2026)
For 2027 only, one vehicle per person doesn't pay bollo (source: ACI page "Esenzione bollo auto anno 2027"):
- only people (not companies or partita IVA);
- cars up to 80 kW, petrol, diesel, dual fuel or hybrid; if you have more than one, the least powerful;
- if your car is over 80 kW (or you have no car), a motorbike; with no car or motorbike, a moped;
- the vehicle must be insured.

## Mistakes found in the old "Bollo Auto" guide (and fixed in the app)
1. Trento and Bolzano are not 2.58 for all Euro 4–6: Euro 5 and 6 are much cheaper (from 1.96).
2. Marche (2.79), Molise (2.76) and Piemonte (2.58–2.84 by power) are not 2.58.
3. Toscana over 100 kW is 4.26, not 50% more than 2.71.
4. Euro 0–3 are not "about 20% more": every region has its own table.
5. Motorbike rates differ by region, and over 11 kW the rate is on all kW.
6. The guide was right about: Campania/Abruzzo 3.12, Lazio/Liguria/Calabria/Veneto/Emilia-Romagna 2.84,
   Toscana 2.71, Emilia-Romagna +10% from 2026, superbollo 20 €/kW over 185 kW.

## Next check
January 2027: regions publish new sheets. Update `data/bollo-2026.js` → `bollo-2027.js` and this file.
