// core.js – Small helpers: Persian digits, dates, money format.
/* =========================================================
   Data (sample only — no real account, numbers are examples)
   ========================================================= */
const FA = (s) => I18N.rtl ? String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) : String(s);   // Persian digits only in Persian
const today = new Date(); today.setHours(12,0,0,0);
const addDays = (n) => { const d = new Date(today); d.setDate(d.getDate()+n); return d; };
const fmtDate = (d) => new Intl.DateTimeFormat(I18N.locale, {day:"numeric", month:"long", year:"numeric"}).format(d);
const fmtDay = (d) => new Intl.DateTimeFormat(I18N.locale, {weekday:"long", day:"numeric", month:"long"}).format(d);
const daysLeft = (d) => Math.round((d - today) / 86400000);

// bollo rates live in data/bollo-2026.js (checked on official sources) — see docs/BOLLO_SOURCES.md
const REGIONS = Object.keys(BOLLO.regions);
const EUR0 = (n) => EUR(n).replace(/(٫۰۰|[.,]00)$/, "");   // whole euros, no ",00"
const EUR = (n) => I18N.rtl ? FA(n.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })).replace(/\./g, "٫").replace(/,/g, "٬")
  : n.toLocaleString(I18N.lang === "it" ? "it-IT" : "en-GB", { minimumFractionDigits:2, maximumFractionDigits:2 });

