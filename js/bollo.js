// bollo.js – Bollo calculation. Rates are in data/bollo-2026.js. Tested by tests/bollo.test.mjs.
function calcBollo(kind, kw, euro, region){
  kw = Math.max(1, Math.floor(kw));            // official rule: use kW without decimals
  const R = BOLLO.regions[region] || BOLLO.regions["لمباردیا"];
  const lines = []; let total = 0;
  if (kind === "moto") {
    const e = Math.min(euro, 3), [base, per] = R.moto[e];
    if (kw <= 11) { total = (e === 3 && R.motoMin3) ? R.motoMin3 : base; lines.push([`${tr("تا")} ${FA(11)} ${tr("کیلووات (مبلغ ثابت)")}`, total]); }
    else { total = base + per * kw; lines.push([tr("مبلغ ثابت"), base], [`${FA(kw)} ${tr("کیلووات ×")} ${EUR(per)} ${tr("یورو")}`, per * kw]); }
  } else if (R.piemonte) {
    const P = BOLLO.piemonte, e = Math.min(euro, 4);
    if (kw <= 53) { total = kw * P.upTo53[e]; lines.push([`${FA(kw)} ${tr("کیلووات ×")} ${EUR(P.upTo53[e])} ${tr("یورو")}`, total]); }
    else if (kw <= 100) { total = kw * P.upTo100[e]; lines.push([`${FA(kw)} ${tr("کیلووات ×")} ${EUR(P.upTo100[e])} ${tr("یورو")}`, total]); }
    else { const [u, o] = (kw <= 130 ? P.upTo130 : P.over130)[e];
      lines.push([`${FA(100)} ${tr("کیلووات ×")} ${EUR(u)} ${tr("یورو")}`, 100 * u], [`${FA(kw - 100)} ${tr("کیلووات بالای ۱۰۰ ×")} ${EUR(o)} ${tr("یورو")}`, (kw - 100) * o]);
      total = 100 * u + (kw - 100) * o; }
  } else {
    const [u, o] = R.car[euro];
    lines.push([`${FA(Math.min(kw, 100))} ${tr("کیلووات ×")} ${EUR(u)} ${tr("یورو")}`, Math.min(kw, 100) * u]);
    if (kw > 100) lines.push([`${FA(kw - 100)} ${tr("کیلووات بالای ۱۰۰ ×")} ${EUR(o)} ${tr("یورو")}`, (kw - 100) * o]);
    total = Math.min(kw, 100) * u + Math.max(0, kw - 100) * o;
  }
  if (kind === "car" && kw > BOLLO.superbollo.overKw) {
    const x = (kw - BOLLO.superbollo.overKw) * BOLLO.superbollo.perKw;
    lines.push([`${tr("سوپربولو (کشوری):")} ${FA(kw - BOLLO.superbollo.overKw)} ${tr("کیلووات ×")} ${FA(BOLLO.superbollo.perKw)} ${tr("یورو")}`, x]); total += x;
  }
  total = Math.round(total * 100) / 100;
  return { total, lines, ok: R.ok, note: R.note || "", src: R.src };
}

