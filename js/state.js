// state.js – App data (state), icons, vehicle drawings, deadline helpers.
// prices users saved themselves (Insurance screen)
function loadReal(){ try { const x = JSON.parse(localStorage.getItem("ki_real") || "[]"); return Array.isArray(x) ? x : []; } catch { return []; } }
function saveReal(){ try { localStorage.setItem("ki_real", JSON.stringify(state.real)); } catch {} }
const state = {
  step: 0, tab: "home", obSlide: 0,
  vehicle: "car", region: "کامپانیا", notify: true,
  bollo: { kind:"car", kw:70, euro:6, region:"کامپانیا" },
  quote: { step:0, kind:"moto", brand:"", model:"", year:2025, power:0, fuel:0, prov:"Caserta", age:30, licYears:1, job:"", km:2, park:0, use:0, guide:1, cu:13, claims:0, box:0, limit:0, pay:1 },
  insq: { kind:"moto", prov:"Caserta", age:1, cu:14, lic:0, monthly:false },
  real: loadReal(), rf: null,
  ins: { start:14, years:[false,false,true,false], value:6000, cov:{ rc:true, kaskoFull:false, kaskoPart:false, theft:true, glass:false, road:true, nature:false, driver:false, legal:false } },
  sheet: false, detail: null,
  newCar: { kind:"car", name:"", year:"", plate:"", kw:"", euro:6, color:"#1F2937", bollo:"", insurance:"", revisione:"" },
  // the real app starts with an empty garage; the two sample vehicles are only for the desktop demo
  cars: document.documentElement.classList.contains("app") ? [] : [
    { id:1, kind:"car", name:tr("فیات پاندا"), year:2019, plate:"GH 482 KT", fuel:tr("بنزین"), kw:51, euro:6, color:"#E5383B",
      dl:{ bollo:addDays(12), insurance:addDays(41), revisione:addDays(118) } },
    { id:2, kind:"moto", name:tr("هوندا اس‌اچ ۱۲۵"), year:2021, plate:"FX 19 284", fuel:tr("بنزین"), kw:9, euro:5, color:"#1F2937",
      dl:{ bollo:addDays(74), insurance:addDays(6), revisione:addDays(230) } },
  ],
};

/* =========================================================
   Icons (simple SF-Symbols-like strokes)
   ========================================================= */
const I = {
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2 3 10.4V20a1 1 0 0 0 1 1h5.5v-6h5v6H20a1 1 0 0 0 1-1v-9.6z"/></svg>',
  garage:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.5 9.5 7 5.6A2 2 0 0 1 8.9 4.3h6.2A2 2 0 0 1 17 5.6l1.5 3.9A2.5 2.5 0 0 1 20.5 12v5a1 1 0 0 1-1 1h-1v1.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V18h-7v1.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V18h-1a1 1 0 0 1-1-1v-5a2.5 2.5 0 0 1 2-2.5Zm2.1-.2h8.8l-1.1-3a.8.8 0 0 0-.7-.5H9.4a.8.8 0 0 0-.7.5ZM7 14.6a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Zm10 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z"/></svg>',
  tools:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="2.2"/><rect x="13" y="3" width="8" height="8" rx="2.2"/><rect x="3" y="13" width="8" height="8" rx="2.2"/><rect x="13" y="13" width="8" height="8" rx="2.2" opacity=".55"/></svg>',
  me:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4.2"/><path d="M3.8 20.2c.9-4 4.2-6.2 8.2-6.2s7.3 2.2 8.2 6.2a.8.8 0 0 1-.8 1H4.6a.8.8 0 0 1-.8-1Z"/></svg>',
  euro:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17.5 6.5A7 7 0 1 0 17.5 17.5M4 10h9M4 14h9"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.9 7.5-9.5V6Z"/><path d="m8.8 12 2.2 2.2 4.2-4.4" stroke-linecap="round"/></svg>',
  list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m4 6.5 1.5 1.5L8 5.5M4 12.5 5.5 14 8 11.5M4 18.5 5.5 20 8 17.5M11 7h9M11 13h9M11 19h9"/></svg>',
  wrench:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.6 17.1a1.9 1.9 0 0 0 2.7 2.7l5.7-5.7a4 4 0 0 0 5.1-5.4l-2.5 2.5-2.4-.4-.4-2.4Z"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9Z"/><path d="M10 20a2.2 2.2 0 0 0 4 0"/></svg>',
  news:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="15" height="16" rx="2.5"/><path d="M18 8h2a1 1 0 0 1 1 1v9a2 2 0 0 1-4 0M7 8h7M7 12h7M7 16h4"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.1 7-11.5a7 7 0 1 0-14 0C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z"/></svg>',
  globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.2"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  back:'<svg viewBox="0 0 12 20" width="12" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2l8 8-8 8"/></svg>',
  chev:'<svg class="chev" viewBox="0 0 9 15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.5 7.5 7.5l-6 6"/></svg>',
  check:'<svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  ok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4Z"/></svg>',
  bulb:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3Z"/></svg>',
};
const CAR = (c) => `<svg class="car" viewBox="0 0 300 120"><defs>
  <linearGradient id="b${c.replace('#','')}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".95"/><stop offset="1" stop-color="${c}"/></linearGradient>
  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe3ff" stop-opacity=".9"/><stop offset="1" stop-color="#7aa7d9" stop-opacity=".7"/></linearGradient></defs>
  <ellipse cx="150" cy="108" rx="128" ry="7" fill="rgba(0,0,0,.18)"/>
  <path d="M28 82c0-10 6-17 16-19l40-6 30-26c6-5 13-8 21-8h58c9 0 17 4 23 10l26 24 26 4c9 1 15 8 15 17v11c0 4-3 7-7 7H35c-4 0-7-3-7-7Z" fill="url(#b${c.replace('#','')})"/>
  <path d="M96 57 120 36c4-3 9-5 14-5h28v26ZM170 31h23c6 0 12 3 16 7l20 19h-59Z" fill="url(#g)"/>
  <path d="M40 74h22M244 74h14" stroke="#ffd166" stroke-width="5" stroke-linecap="round" opacity=".9"/>
  <circle cx="86" cy="96" r="19" fill="#18181b"/><circle cx="86" cy="96" r="9" fill="#a1a1aa"/>
  <circle cx="222" cy="96" r="19" fill="#18181b"/><circle cx="222" cy="96" r="9" fill="#a1a1aa"/>
  <path d="M60 64h190" stroke="rgba(255,255,255,.25)" stroke-width="2"/></svg>`;
const MOTO = (c) => `<svg class="car" viewBox="0 0 300 120"><ellipse cx="150" cy="110" rx="110" ry="6" fill="rgba(0,0,0,.18)"/>
  <circle cx="72" cy="88" r="24" fill="none" stroke="#18181b" stroke-width="9"/><circle cx="228" cy="88" r="24" fill="none" stroke="#18181b" stroke-width="9"/>
  <circle cx="72" cy="88" r="6" fill="#a1a1aa"/><circle cx="228" cy="88" r="6" fill="#a1a1aa"/>
  <path d="M72 88 112 58h70l20 30M112 58l-12-14h-16" stroke="#3f3f46" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M104 60c8-14 26-22 46-22h40c10 0 18 6 20 16l2 10H118c-8 0-14-2-14-4Z" fill="${c}"/>
  <path d="M150 38c6-10 16-14 28-12" stroke="${c}" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M200 40l26 48" stroke="#3f3f46" stroke-width="6" stroke-linecap="round"/><path d="M214 28h22" stroke="#18181b" stroke-width="6" stroke-linecap="round"/>
  <circle cx="226" cy="44" r="6" fill="#ffd166"/></svg>`;
const ART = (v) => v.kind === "moto" ? MOTO(v.color) : CAR(v.color);
const KIND_SVG = { car:'<svg viewBox="0 0 64 40" fill="currentColor"><path d="M6 27c0-3 2-5.5 5-6l8-1.5 7-7c1.5-1.4 3.4-2.2 5.5-2.2h9c2.2 0 4.3.9 5.8 2.5l5.7 6.2 4 .7c2.3.4 4 2.4 4 4.8V29c0 1.1-.9 2-2 2H8a2 2 0 0 1-2-2Z"/><circle cx="18" cy="31" r="5" fill="var(--card)" stroke="currentColor" stroke-width="3"/><circle cx="48" cy="31" r="5" fill="var(--card)" stroke="currentColor" stroke-width="3"/></svg>',
  moto:'<svg viewBox="0 0 64 40" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="28" r="8"/><circle cx="51" cy="28" r="8"/><path d="M13 28 24 17h15l6 11M24 17l-3-5h-5M39 17l4-6h6M45 11l6 17"/></svg>' };

const plate = (p) => `<span class="plate"><span class="eu">I</span><span class="nr">${p}</span><span class="rg"></span></span>`;
const esc = (v) => String(v ?? "").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
const isoDay = (d) => { if (!d) return ""; const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}-${String(x.getDate()).padStart(2,"0")}`; };
// "I paid it / done": bollo and insurance +1 year, revisione +2 years (MIT: every 2 years, same month)
const RENEW = { bollo: [12, tr("پرداخت کردم")], insurance: [12, tr("تمدید کردم")], revisione: [24, tr("انجام دادم")] };
const addMonths = (d, m) => { const x = new Date(d); x.setMonth(x.getMonth() + m); return x; };
const SHOW_DONE_DAYS = 60;   // the button shows from 60 days before the date (and when it's late)
const daysTxt = (n) => n < 0 ? tr("گذشته") : n === 0 ? tr("امروز") : `${FA(n)} ${tr("روز")}`;
const toDate = (v) => { if (!v) return null; const d = new Date(v + "T12:00:00"); return isNaN(d) ? null : d; };
const status = (n) => n < 0 ? "bad" : n <= 14 ? "bad" : n <= 45 ? "warn" : "ok";
const DL = { bollo:[tr("بولو"), "#E5383B", I.euro], insurance:[tr("بیمه"), "#0A84FF", I.shield], revisione:[tr("رویزیونه"), "#8E5CF7", I.wrench] };
const nextDeadline = () => {
  let best = null;
  for (const c of state.cars) for (const [k, d] of Object.entries(c.dl)) if (!best || d < best.d) best = { c, k, d };
  return best;
};

