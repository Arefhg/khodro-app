// Bollo (tassa automobilistica) rates for 2026 — checked on official sources on 23 Nov 2026.
// Every region: where the numbers come from, and whether they are confirmed. Details: docs/BOLLO_SOURCES.md
//
// car:  annual € per kW, one pair per Euro class 0..6: [up to 100 kW, each kW over 100]
// moto: motorcycles over 50 cc, Euro 0, 1, 2, 3+: [fixed amount up to 11 kW, € per kW]
//       above 11 kW the tax = fixed amount + € per kW × ALL kW (Lombardia and Liguria sheets say so clearly)
// ok:   true = taken from the official 2026 sheet; false = NOT CONFIRMED (see note)
//
// Persian region names are the keys the app shows.
(function () {
  const NAT_CAR = [[3.00, 4.50], [2.90, 4.35], [2.80, 4.20], [2.70, 4.05], [2.58, 3.87], [2.58, 3.87], [2.58, 3.87]];
  const NAT_MOTO = [[26.00, 1.70], [23.00, 1.30], [21.00, 1.00], [19.11, 0.88]];
  const PLUS10_CAR = [[3.30, 4.95], [3.19, 4.79], [3.08, 4.62], [2.97, 4.46], [2.84, 4.26], [2.84, 4.26], [2.84, 4.26]];
  const PLUS10_MOTO = [[28.60, 1.87], [25.30, 1.43], [23.10, 1.10], [21.02, 0.97]];
  const HIGH_CAR = [[3.63, 5.45], [3.51, 5.27], [3.39, 5.08], [3.27, 4.91], [3.12, 4.69], [3.12, 4.69], [3.12, 4.69]];
  const HIGH_MOTO = [[31.46, 2.06], [27.83, 1.57], [25.41, 1.21], [23.12, 1.07]];
  const ACI = (f) => `https://aci.gov.it/app/uploads/${f}`;

  const R = {
    "آبروتزو":            { car: HIGH_CAR, moto: HIGH_MOTO, ok: true, src: ACI("2026/01/Tariffario-Abruzzo-2026.pdf") },
    "بازیلیکاتا":         { car: NAT_CAR, moto: NAT_MOTO, ok: true, src: ACI("2026/01/Tariffario-Basilicata-2026.pdf") },
    "کالابریا":           { car: PLUS10_CAR, moto: PLUS10_MOTO, ok: false, src: "https://tributi.regione.calabria.it/web/guest/tassa-auto",
                            note: "سایت رسمی منطقه در دسترس نبود؛ عددها از سایت‌های معتبر خودرو (alvolante) — NOT CONFIRMED" },
    "کامپانیا":           { car: HIGH_CAR, moto: HIGH_MOTO, ok: true, src: ACI("2026/01/Tariffario-Campania-2026.pdf") },
    "امیلیارومانیا":       { car: [[3.30, 4.90], [3.19, 4.78], [3.07, 4.62], [2.97, 4.45], [2.84, 4.26], [2.84, 4.26], [2.84, 4.26]],
                            moto: [[29.20, 1.91], [25.83, 1.46], [23.59, 1.12], [21.47, 0.99]], ok: true, src: ACI("2026/02/Tariffario-Emilia-Romagna-2026.pdf") },
    "فریولی-ونتزیا جولیا": { car: NAT_CAR, moto: NAT_MOTO, ok: true, src: ACI("2025/12/Friuli-e-Sardegna-2026.pdf") },
    "لاتزیو":             { car: PLUS10_CAR, moto: PLUS10_MOTO, ok: true, src: ACI("2026/01/Tariffario-Lazio-2026.pdf") },
    "لیگوریا":            { car: PLUS10_CAR, moto: PLUS10_MOTO, ok: true, src: "https://bolloauto.regione.liguria.it/tassa-auto/images/Autovetture.pdf",
                            note: "منطقه از ۲۰۲۳ برای یورو ۰ و ۱ ده درصد اضافه کرده؛ جدول رسمی منطقه هنوز ۳٫۳۰ و ۳٫۱۹ نشون می‌ده — برای یورو ۰ و ۱ NOT CONFIRMED" },
    "لمباردیا":           { car: NAT_CAR, moto: [[26.00, 1.70], [23.00, 1.30], [21.00, 1.00], [19.11, 0.88]], motoMin3: 20.00, ok: true, src: ACI("2026/01/Tariffario_Lombardia_2026.pdf"),
                            note: "موتور یورو ۳ به بالا تا ۱۱ کیلووات: ۲۰ یورو (طبق جدول لمباردیا)" },
    "مارکه":              { car: [[3.24, 4.86], [3.13, 4.70], [3.02, 4.54], [2.92, 4.37], [2.79, 4.18], [2.79, 4.18], [2.79, 4.18]],
                            moto: [[28.07, 1.84], [24.84, 1.40], [22.68, 1.08], [20.63, 0.95]], ok: true,
                            src: "https://www.regione.marche.it/Regione-Utile/Finanze-e-Tributi/Tassa-Automobilistica/Autoveicoli-e-Motoveicoli" },
    "مولیزه":             { car: [[3.53, 5.30], [3.38, 5.07], [3.24, 4.85], [3.09, 4.63], [2.76, 4.14], [2.76, 4.14], [2.76, 4.14]],
                            moto: [[30.60, 2.00], [26.82, 1.52], [24.27, 1.16], [20.45, 0.94]], ok: false,
                            src: "https://www.regione.molise.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/362",
                            note: "سایت رسمی منطقه در دسترس نبود؛ عددها از alvolante (جدول منطقه از ۲۰۱۶) — NOT CONFIRMED" },
    "پیمونته":            { car: NAT_CAR, moto: [[29.92, 1.93], [26.47, 1.48], [24.17, 1.14], [22.00, 1.00]], ok: true, piemonte: true,
                            src: "https://www.regione.piemonte.it/web/media/57917/download",
                            note: "نرخ پیمونته به توان ماشین بستگی داره (تا ۵۳، تا ۱۰۰، تا ۱۳۰، بالای ۱۳۰ کیلووات). جدول ۲۰۲۵؛ جدول ۲۰۲۶ هنوز منتشر نشده" },
    "پوگلیا":             { car: NAT_CAR, moto: NAT_MOTO, ok: true, src: ACI("2026/01/Tariffario-Puglia-2026.pdf") },
    "ساردنیا":            { car: NAT_CAR, moto: NAT_MOTO, ok: true, src: ACI("2025/12/Friuli-e-Sardegna-2026.pdf") },
    "سیسیل":              { car: NAT_CAR, moto: NAT_MOTO, ok: true, src: ACI("2026/03/Tariffario-Sicilia-2026.pdf") },
    "توسکانا":            { car: [[3.47, 5.45], [3.35, 5.37], [3.23, 5.08], [3.12, 4.91], [2.71, 4.26], [2.71, 4.26], [2.71, 4.26]],
                            moto: [[31.46, 1.96], [27.83, 1.50], [25.41, 1.16], [23.12, 1.02]], ok: true, src: ACI("2026/01/Tariffario-Toscana-2026.pdf") },
    "ترنتو":              { car: [[3.00, 4.50], [2.90, 4.35], [2.80, 4.20], [2.70, 4.05], [2.58, 3.87], [2.06, 3.10], [1.96, 2.95]],
                            moto: NAT_MOTO, ok: true, src: ACI("2026/01/Tariffario-Trento-2026.pdf"),
                            note: "یورو ۶ بالای ۱۰۰ کیلووات (۲٫۹۵) از جدول خونده نشد — NOT CONFIRMED" },
    "بولزانو":            { car: [[2.70, 4.05], [2.61, 3.92], [2.52, 3.78], [2.43, 3.65], [2.32, 3.48], [2.09, 3.13], [1.96, 2.94]],
                            moto: [[23.40, 1.53], [20.70, 1.17], [18.90, 0.90], [17.20, 0.79]], ok: true, src: ACI("2026/01/Tariffario-Bolzano-Italiano-2026.pdf") },
    "اومبریا":            { car: NAT_CAR, moto: NAT_MOTO, ok: true, src: ACI("2026/01/Tariffario-Umbria-2026.pdf") },
    "واله‌دائوستا":       { car: NAT_CAR, moto: NAT_MOTO, ok: true, src: "https://gestionewww.regione.vda.it/allegato.aspx?pk=27477" },
    "ونتو":               { car: PLUS10_CAR, moto: PLUS10_MOTO, ok: true, src: "https://drive.google.com/file/d/1-9_YrO9nNucuxXY1gIMpylguZ8N5UJLF/view" },
  };

  // Piemonte, 2025 sheet: the €/kW depends on the car's power
  // up to 53 kW: national column; 54–100: column 2; 101–130: col 3/4; over 130: col 5/6
  const PIEMONTE = {
    upTo53:   [3.00, 2.90, 2.80, 2.70, 2.58],
    upTo100:  [3.18, 3.07, 2.97, 2.86, 2.73],
    upTo130:  [[3.24, 4.86], [3.13, 4.70], [3.02, 4.54], [2.92, 4.37], [2.79, 4.18]],
    over130:  [[3.30, 4.95], [3.19, 4.79], [3.08, 4.62], [2.97, 4.46], [2.84, 4.26]],
  };

  window.BOLLO = {
    year: 2026,
    checked: "2026-11-23",
    regions: R,
    piemonte: PIEMONTE,
    superbollo: { overKw: 185, perKw: 20 },   // national, €20 for each kW over 185
    // 2027: one vehicle per person doesn't pay (DL 162/2026, converted by L. 209/2026)
    exempt2027: true,
  };
})();
