// app.js – Navigation, back button, taps and typing, saving, and app start. Loads last.
/* =========================================================
   Render
   ========================================================= */
const phone = document.getElementById("phone");
function screenHTML(id, anim){
  const body = VIEWS[id]();
  const isOb = ["welcome","features","setup","notify"].includes(id);
  return `<div class="screen">${statusBar()}
    ${isOb ? `<div class="view ${anim||''}" style="padding:0">${body}</div>` : `<div class="view ${anim||''}">${body}</div>`}
    <div class="dim ${id==='add'?'on':''}" data-sheet="0"></div>
    <div class="sheet ${id==='add'?'on':''}">${sheetHTML()}</div>
    <div class="toast" id="toast">${I.ok}<span></span></div>
    <div class="home-ind"></div></div>`;
}

let current = "welcome";
// Back navigation: child screens are added to the browser history, so the Android back button,
// iPhone swipe-back (installed web app) and the browser back button all go back one screen.
const TABS = ["home", "garage", "tools", "profile"];
function go(id, anim = "fade", fromHistory = false){
  current = id;
  state.step = STEPS.findIndex(s => s.id === id);
  if (id === "detail" && !state.cars.some(c => c.id === state.detail)) { if (!state.cars.length) id = current = "garage"; else state.detail = state.cars[0].id; }
  phone.innerHTML = screenHTML(id, anim);
  pinTabbar(phone);
  const view = phone.querySelector(".view");
  const nav = phone.querySelector(".navbar");
  if (nav && view) view.addEventListener("scroll", () => nav.classList.toggle("solid", view.scrollTop > 30));
  if (id === "detail" && nav) nav.classList.add("solid");
  renderSteps();
  if (IS_APP && !fromHistory) {
    const entry = { id, detail: state.detail };
    if (TABS.includes(id) || id === "add") history.replaceState(entry, ""); else history.pushState(entry, "");
  }
}
window.addEventListener("popstate", (e) => {
  if (!IS_APP) return;
  if (phone.querySelector(".sheet.on")) {            // a sheet is open: back closes it first
    phone.querySelector(".sheet").classList.remove("on"); phone.querySelector(".dim").classList.remove("on");
    state.editId = null; history.pushState({ id: current, detail: state.detail }, ""); return;
  }
  const st = e.state;
  if (st && st.id) { if (st.detail) state.detail = st.detail; go(st.id, "fade", true); }
  else if (current !== "home") go("home", "fade", true);
});

// the tab bar is written inside the scrolling view; move it to the screen so it stays at the bottom
function pinTabbar(root){ root.querySelectorAll(".screen").forEach(sc => { const t = sc.querySelector(".view .tabbar"); if (t) sc.appendChild(t); }); }
function toast(msg){
  const t = phone.querySelector("#toast"); if (!t) return;
  t.querySelector("span").textContent = msg; t.classList.add("on");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2200);
}

function renderSteps(){
  document.getElementById("steps").innerHTML = STEPS.map((s,i) =>
    `<button class="${i===state.step?'on':''}" data-step="${s.id}"><b>${FA(i+1)}</b><span>${s.t}<small>${s.s}</small></span></button>`).join("");
}

/* =========================================================
   Events (one listener for the whole page)
   ========================================================= */
document.addEventListener("click", (e) => {
  if (e.target.closest("a[href]")) return;
  const el = e.target.closest("button,[data-open],[data-tab],[data-go],[data-sheet],a,.dim"); if (!el) return;
  const d = el.dataset;
  if (d.step) return go(d.step);
  if (d.go) { if (d.notify !== undefined) { state.notify = d.notify === "1"; if (state.notify && LN()) LN().requestPermissions().catch(() => {}); } return go(d.go, d.go === "home" ? "fade" : "fade"); }
  if (d.tab) { state.detail = null; return go(d.tab); }
  if (d.open) { state.detail = Number(d.open); return go("detail", "enter"); }
  if (d.back) return go(d.back, "fade");
  if (d.veh) { state.vehicle = d.veh; const y = phone.querySelector(".view").scrollTop; go("setup", ""); return; }
  if (d.lang) { I18N.setLang(d.lang); return; }
  if (d.region) { state.region = d.region; phone.querySelectorAll("[data-region]").forEach(b => b.classList.toggle("sel", b === el)); return; }
  if (d.toast) return toast(d.toast);
  if (d.tool) {
    if (d.tool === "bollo" && d.car) { const v = state.cars.find(c => c.id === Number(d.car)); if (v) Object.assign(state.bollo, { kind:v.kind, kw:v.kw, euro:v.euro, region:state.region }); }
    else if (d.tool === "bollo") state.bollo.region = state.region;
    return go(d.tool, "enter");
  }
  if (d.bkind) { state.bollo.kind = d.bkind; state.bollo.kw = d.bkind === "moto" ? 11 : 70; return go("bollo", ""); }
  if (d.beuro) { state.bollo.euro = Number(d.beuro); phone.querySelectorAll("[data-beuro]").forEach(x => x.classList.toggle("on", x === el)); return updBollo(); }
  if (d.kw) { setKw(state.bollo.kw + Number(d.kw)); return; }
  if (d.kwset) { setKw(Number(d.kwset)); return; }
  if (d.qkind) { state.insq.kind = d.qkind; state.insq.age = Math.min(state.insq.age, IPER.ages[d.qkind].length-1); if (!IPER.prov[d.qkind][state.insq.prov]) state.insq.prov = "Caserta"; return rerender(); }
  if (d.qage) { state.insq.age = Number(d.qage); phone.querySelectorAll("[data-qage]").forEach(x => x.classList.toggle("on", x === el)); return updQuote(); }
  if (d.qset) { const [k,v] = d.qset.split("|"); state.quote[k] = Number(v); el.parentElement.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === el)); return; }
  if (d.qkind2) { state.quote.kind = d.qkind2; state.quote.power = 0; if (!IPER.prov[d.qkind2][state.quote.prov]) state.quote.prov = "Caserta"; return rerender(); }
  if (d.qcu2) { state.quote.cu = Math.min(18, Math.max(1, state.quote.cu + Number(d.qcu2))); return rerender(); }
  if (d.qnav) { const q = state.quote; q.step = Math.min(5, Math.max(0, q.step + Number(d.qnav)));
    if (q.step >= 2 && (!q.age || q.age < 14 || q.age > 99)) { q.step = 1; go("quote",""); return toast(tr("سنت رو درست بنویس")); }
    go("quote",""); phone.querySelector(".view").scrollTop = 0; return; }
  if (d.qpay) { state.insq.monthly = d.qpay === "1"; phone.querySelectorAll("[data-qpay]").forEach(x => x.classList.toggle("on", x === el)); return updQuote(); }
  if (d.qlic) { state.insq.lic = Number(d.qlic); phone.querySelectorAll("[data-qlic]").forEach(x => x.classList.toggle("on", x === el)); return updQuote(); }
  if (d.radd) { state.rf = { paid:"", note:"" }; return updReal(); }
  if (d.rcancel) { state.rf = null; return updReal(); }
  if (d.rsave) {
    const num = (v) => Number(String(v).replace(/[۰-۹]/g, c => "۰۱۲۳۴۵۶۷۸۹".indexOf(c)).replace(/[^\d.]/g, ""));
    const paid = num(phone.querySelector("#rpaid").value);
    if (!paid || paid < 30 || paid > 10000) { phone.querySelector("#rpaid").focus(); return toast(tr("یه عدد درست بنویس (یورو در سال)")); }
    state.real.push({ ...state.insq, paid, note: phone.querySelector("#rnote").value.trim().slice(0,80) });
    saveReal(); state.rf = null; updReal(); return toast(tr("ثبت شد، مرسی ✓"));
  }
  if (d.qcu) { state.insq.cu = Math.min(18, Math.max(1, state.insq.cu + Number(d.qcu))); return updQuote(); }
  if (d.cls) { state.ins.start = Math.min(18, Math.max(1, state.ins.start + Number(d.cls))); return rerender(); }
  if (d.yr) { state.ins.years[Number(d.yr)] = d.acc === "1"; return rerender(); }
  if (d.cov) { if (d.cov === "rc") return toast(tr("بیمه‌ی شخص ثالث اجباریه، نمی‌شه خاموشش کرد"));
    state.ins.cov[d.cov] = !state.ins.cov[d.cov];
    if (d.cov === "kaskoFull" && state.ins.cov.kaskoFull) state.ins.cov.kaskoPart = false;
    if (d.cov === "kaskoPart" && state.ins.cov.kaskoPart) state.ins.cov.kaskoFull = false;
    return rerender(); }
  if (d.sheet !== undefined) {
    if (d.sheet === "1") { state.editId = null; state.newCar = { kind:"car", name:"", year:"", plate:"", kw:"", euro:6, color:"#1F2937", bollo:"", insurance:"", revisione:"" }; refreshSheet(); phone.querySelector(".sheet").classList.add("on"); phone.querySelector(".dim").classList.add("on"); state.step = 6; renderSteps(); }
    else { phone.querySelector(".sheet").classList.remove("on"); phone.querySelector(".dim").classList.remove("on"); state.step = STEPS.findIndex(s => s.id === "garage"); renderSteps(); }
    return;
  }
  if (d.done) {
    const [cid, k] = d.done.split(":"), v = state.cars.find(c => c.id === Number(cid)); if (!v || !v.dl[k]) return;
    const next = addMonths(v.dl[k], RENEW[k][0]);
    if (!confirm(tr("{what} رو انجام دادی؟ تاریخ بعدی می‌شه {date}.", { what: `${DL[k][0]} ${v.name}`, date: fmtDate(next) }))) return;
    v.dl[k] = next; persist(); go(current, "", true); setTimeout(() => toast(tr("تاریخ بعدی: {date}", { date: fmtDate(next) })), 120); return;
  }
  if (d.edit) {
    const v = state.cars.find(c => c.id === Number(d.edit)); if (!v) return;
    state.editId = v.id;
    state.newCar = { kind:v.kind, name:v.name, year:v.year||"", plate:v.plate||"", kw:v.kw, euro:v.euro, color:v.color,
      bollo:isoDay(v.dl.bollo), insurance:isoDay(v.dl.insurance), revisione:isoDay(v.dl.revisione) };
    refreshSheet(); phone.querySelector(".sheet").classList.add("on"); phone.querySelector(".dim").classList.add("on"); return;
  }
  if (d.del) {
    if (!confirm(tr("این وسیله و همه‌ی تاریخ‌هاش پاک بشه؟"))) return;
    state.cars = state.cars.filter(c => c.id !== Number(d.del)); state.editId = null; persist();
    go("garage"); setTimeout(() => toast(tr("پاک شد")), 120); return;
  }
  if (d.kind) { state.newCar.kind = d.kind; return refreshSheet(); }
  if (d.euro) { state.newCar.euro = Number(d.euro); return refreshSheet(); }
  if (d.color) { state.newCar.color = d.color; return refreshSheet(); }
  if (d.save) {
    const n = state.newCar;
    const num = (v) => Number(String(v).replace(/[۰-۹]/g, c => "۰۱۲۳۴۵۶۷۸۹".indexOf(c)).replace(/[^\d.]/g, ""));
    const shake = (f) => { const i = phone.querySelector(`[data-f=${f}]`); i.focus(); i.closest(".field").animate([{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],{duration:300}); };
    if (!n.name.trim()) return shake("name");
    const kw = num(n.kw); if (!kw || kw < 1 || kw > 1000) return shake("kw");
    const dl = {}; for (const k of ["bollo","insurance","revisione"]) { const d = toDate(n[k]); if (d) dl[k] = d; }
    const car = { kind:n.kind, name:n.name.trim(), year:num(n.year)||"", plate:(n.plate||"").trim().toUpperCase(), fuel:"", kw, euro:n.euro, color:n.color, dl };
    if (state.editId) {
      const i = state.cars.findIndex(c => c.id === state.editId);
      if (i >= 0) state.cars[i] = { ...state.cars[i], ...car };
      state.detail = state.editId; state.editId = null; persist();
      go("detail"); setTimeout(() => toast(tr("ذخیره شد ✓")), 120); return;
    }
    state.cars.push({ id:Date.now(), ...car }); persist();
    go("garage"); setTimeout(() => toast(tr("اضافه شد به گاراژ ✓")), 120); return;
  }
  if (d.sw === "notify") { state.notify = !state.notify; el.classList.toggle("on", state.notify); persist(); return; }
  if (d.sw === "dark") { setTheme(document.documentElement.dataset.theme !== "dark"); el.classList.toggle("on"); return; }
});
document.addEventListener("input", (e) => {
  if (e.target.dataset.f) state.newCar[e.target.dataset.f] = e.target.value;
  if (e.target.id === "kwr") setKw(Number(e.target.value));
  if (e.target.id === "valr") { state.ins.value = Number(e.target.value); phone.querySelector("#valv").textContent = EUR0(state.ins.value) + " €"; phone.querySelector("#advice").innerHTML = insAdvice(); }
});
document.addEventListener("change", (e) => { if (e.target.id === "breg") { state.bollo.region = e.target.value; updBollo(); }
  if (e.target.id === "qprov") { state.insq.prov = e.target.value; updQuote(); }
  if (e.target.id === "qprov2") state.quote.prov = e.target.value; });
document.addEventListener("input", (e) => { const k = e.target.dataset.qf; if (!k) return;
  const v = e.target.value, n = Number(String(v).replace(/[۰-۹]/g, c => "۰۱۲۳۴۵۶۷۸۹".indexOf(c)));
  state.quote[k] = ["year","age","licYears"].includes(k) ? (isNaN(n) ? 0 : n) : v; });
document.addEventListener("input", (e) => { if (state.rf && e.target.id === "rpaid") state.rf.paid = e.target.value; if (state.rf && e.target.id === "rnote") state.rf.note = e.target.value; });
function setKw(v){
  const max = state.bollo.kind === "moto" ? 120 : 400;
  state.bollo.kw = Math.min(max, Math.max(1, Math.round(v)));
  const q = (s) => phone.querySelector(s);
  if (q("#kwv")) { q("#kwv").textContent = FA(state.bollo.kw); q("#cvv").textContent = `≈ ${FA(Math.round(state.bollo.kw/0.736))} ${tr("اسب")}`; q("#kwr").value = state.bollo.kw; }
  updBollo();
}
function updBollo(){ const r = phone.querySelector("#bres"); if (r) r.innerHTML = bolloResult(); }
function rerender(){ const v = phone.querySelector(".view"), y = v ? v.scrollTop : 0; go(current, ""); const n = phone.querySelector(".view"); if (n) n.scrollTop = y; }
function refreshSheet(){ const s = phone.querySelector(".sheet"); if (s) s.innerHTML = sheetHTML(); }

function setTheme(dark){
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.getElementById("theme").textContent = dark ? tr("☀️ حالت روشن") : tr("🌙 حالت تاریک");
}
document.getElementById("theme").onclick = () => { setTheme(document.documentElement.dataset.theme !== "dark"); if (current === "profile") go("profile", ""); };
document.getElementById("next").onclick = () => go(STEPS[Math.min(STEPS.length-1, state.step+1)].id);
document.getElementById("prev").onclick = () => go(STEPS[Math.max(0, state.step-1)].id);
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;
  if (e.key === "ArrowLeft") document.getElementById("next").click();
  if (e.key === "ArrowRight") document.getElementById("prev").click();
});

/* gallery: every step side by side */
document.getElementById("gal").onclick = () => {
  const g = document.getElementById("ggrid");
  const keep = current;
  g.innerHTML = STEPS.map((s,i) => { if (s.id === "detail") state.detail = state.cars[0].id;
    return `<div class="gitem" data-step-g="${s.id}"><div class="mini"><div class="phone">${screenHTML(s.id, "")}</div></div><span><b>${FA(i+1)}</b>${s.t}</span></div>`; }).join("");
  pinTabbar(g);
  document.body.classList.add("show-gallery"); window.scrollTo(0,0);
  go(keep, "");
};
document.getElementById("ggrid").addEventListener("click", (e) => {
  const it = e.target.closest("[data-step-g]"); if (!it) return;
  e.stopPropagation(); document.body.classList.remove("show-gallery"); go(it.dataset.stepG);
}, true);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.body.classList.remove("show-gallery"); });

if (matchMedia("(prefers-color-scheme: dark)").matches) setTheme(true);
const IS_APP = document.documentElement.classList.contains("app");
function persist(){ syncReminders(); try { localStorage.setItem("ki_state", JSON.stringify({ seen:true, region:state.region, vehicle:state.vehicle, notify:state.notify,
  cars:state.cars.map(c => ({ ...c, dl:Object.fromEntries(Object.entries(c.dl).map(([k,d]) => [k, d.toISOString()])) })) })); } catch {} }
function restore(){ try { const x = JSON.parse(localStorage.getItem("ki_state") || "null"); if (!x) return false;
  if (x.region === "ترنتینو-آلتوآدیجه") x.region = "ترنتو";
  Object.assign(state, { region:x.region || state.region, vehicle:x.vehicle || state.vehicle, notify:x.notify ?? state.notify });
  if (Array.isArray(x.cars)) state.cars = x.cars.filter(c => c.id > 1000).map(c => ({ ...c, dl:Object.fromEntries(Object.entries(c.dl).map(([k,d]) => [k, new Date(d)])) }));
  return !!x.seen; } catch { return false; } }
const seen = IS_APP && restore();
document.addEventListener("click", () => setTimeout(persist, 50), true);
document.addEventListener("change", () => setTimeout(persist, 50), true);
if (IS_APP && !window.Capacitor && "serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
document.title = tr("خودرو ایتالیا");
loadNews();
go(seen ? "home" : "welcome");
if (IS_APP) history.replaceState({ id: current, detail: state.detail }, "");
syncReminders();
