// screens.js – Every screen: each vXxx() function returns the HTML of one screen.
/* =========================================================
   Screens
   ========================================================= */
const STEPS = [
  { id:"welcome",  t:tr("خوش‌آمدگویی"),   s:tr("اولین صفحه") },
  { id:"features", t:tr("اپ چی کار می‌کنه"), s:tr("سه ویژگی اصلی") },
  { id:"setup",    t:tr("ماشین و شهرت"),    s:tr("تو ۱۰ ثانیه تنظیمش کن") },
  { id:"notify",   t:tr("یادآوری‌ها"),        s:tr("اجازه‌ی اعلان") },
  { id:"home",     t:tr("خانه"),              s:tr("یادآوری، خبرها، شماره‌های ضروری") },
  { id:"garage",   t:tr("گاراژ من"),          s:tr("ماشین و موتورهات") },
  { id:"add",      t:tr("افزودن وسیله"),       s:tr("فرم ساده از پایین صفحه") },
  { id:"detail",   t:tr("جزئیات ماشین"),      s:tr("همه‌ی تاریخ‌ها یه جا") },
  { id:"tools",    t:tr("ابزارها"),           s:tr("همه‌ی ابزارها") },
  { id:"bollo",    t:tr("حساب بولو"), s:tr("از روی راهنمای بولو") },
  { id:"quote",    t:tr("فرم قیمت بیمه"),     s:tr("۵ مرحله، مثل Prima و Facile") },
  { id:"insurance",t:tr("بیمه چنده؟"),        s:tr("قیمت حدودی از آمار رسمی IVASS") },
  { id:"profile",  t:tr("تنظیمات"),           s:tr("منطقه، اعلان، تم") },
];

function statusBar(){ return `<div class="island"></div><div class="status"><span>9:41</span><span class="icons">
  <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.6c2.2 0 4.2.9 5.7 2.3l1.1-1.1A9.6 9.6 0 0 0 8 1 9.6 9.6 0 0 0 1.2 3.8l1.1 1.1A8 8 0 0 1 8 2.6Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1A6.4 6.4 0 0 0 8 4.2c-1.7 0-3.3.7-4.5 1.8l1.1 1.1c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2c-.5 0-1 .2-1.3.5L8 11l1.3-1.5c-.3-.3-.8-.5-1.3-.5Z"/></svg>
  <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".45"/></svg>
  </span></div>`; }

function tabbar(active){
  const T = [["home",tr("خانه"),I.home],["garage",tr("گاراژ"),I.garage],["tools",tr("ابزارها"),I.tools],["profile",tr("من"),I.me]];
  return `<nav class="tabbar">${T.map(([id,t,ic]) => `<button class="tab ${active===id?"on":""}" data-tab="${id}">${ic}<span>${t}</span></button>`).join("")}</nav>`;
}

const LOGO = `<div class="logo">${CAR("#E5383B").replace('class="car"','style="width:92px;height:40px;margin-bottom:6px"')}</div>`;

function vWelcome(){
  return `<div class="ob"><div class="welcome-bg"></div>
    <div class="langbar">${I18N.LANGS.map(l => `<button class="${l===I18N.lang?'on':''}" data-lang="${l}">${I18N.NAMES[l]}</button>`).join("")}</div>
    <div class="grow">${LOGO}
      <h2>${tr("خودرو ایتالیا")}</h2>
      <p>${tr("هر چی درباره‌ی ماشین و موتور تو ایتالیا")}<br>${tr("لازم داری، ساده و فارسی.")}</p>
    </div>
    <button class="btn fill" data-go="features">${tr("شروع کنیم")}</button>
    <button class="btn plain" data-go="home">${tr("فعلاً رد شو")}</button>
  </div>`;
}

function vFeatures(){
  return `<div class="ob"><div class="grow" style="justify-content:flex-start;padding-top:20px">
    <h2 style="margin-top:0">${tr("هر چی لازم داری،")}<br>${tr("تو یه اپ")}</h2>
    <div class="feature-list">
      <div class="feat"><div class="fi" style="background:#E5383B">${I.euro}</div><div><b>${tr("بولوت رو بدون دردسر حساب کن")}</b><span>${tr("بگو ماشینت چند کیلوواته و کجا زندگی می‌کنی، بقیه‌ش با ما.")}</span></div></div>
      <div class="feat"><div class="fi" style="background:#0A84FF">${I.shield}</div><div><b>${tr("بیمه رو بفهم، گول نخور")}</b><span>${tr("کلاس بیمه، کاسکو، فرانشیز… همه رو ساده توضیح دادیم.")}</span></div></div>
      <div class="feat"><div class="fi" style="background:#DC2626">${I.phone}</div><div><b>${tr("شماره‌های ضروری، همیشه دم دست")}</b><span>${tr("۱۱۲، پلیس، امداد خودرو… با توضیح و یه دست زدن.")}</span></div></div>
      <div class="feat"><div class="fi" style="background:#F59E0B">${I.bell}</div><div><b>${tr("دیگه هیچ تاریخی یادت نمی‌ره")}</b><span>${tr("بیمه، بولو و رویزیونه رو قبل از اینکه دیر بشه بهت می‌گیم.")}</span></div></div>
    </div></div>
    <div class="dots"><i></i><i class="on"></i><i></i><i></i></div>
    <button class="btn fill" data-go="setup">${tr("ادامه")}</button>
  </div>`;
}

function vSetup(){
  return `<div class="ob" style="padding-top:64px"><div class="grow" style="justify-content:flex-start">
    <h2 style="margin-top:0;font-size:26px">${tr("ماشین داری یا موتور؟")}</h2>
    <p style="margin-top:4px">${tr("بعداً هم می‌تونی عوضش کنی.")}</p>
    <div class="choice" style="margin-top:18px">
      <button class="${state.vehicle==='car'?'on':''}" data-veh="car">${KIND_SVG.car}${tr("ماشین")}</button>
      <button class="${state.vehicle==='moto'?'on':''}" data-veh="moto">${KIND_SVG.moto}${tr("موتور")}</button>
    </div>
    <div class="regions"><div class="sec-h" style="padding:0 4px 8px"><h3 style="font-size:17px">${tr("کدوم منطقه زندگی می‌کنی؟")}</h3></div>
      <div class="group">${REGIONS.map(r => `<button class="row ${state.region===r?'sel':''}" data-region="${r}" style="width:100%"><span class="t">${tr(r)}</span>${I.check}</button>`).join("")}</div>
      <div class="foot">${tr("بولو تو هر منطقه یه کم فرق داره، واسه همین می‌پرسیم.")}</div>
    </div></div>
    <div class="dots"><i></i><i></i><i class="on"></i><i></i></div>
    <button class="btn fill" data-go="notify">${tr("ادامه")}</button>
  </div>`;
}

function vNotify(){
  return `<div class="ob"><div class="welcome-bg"></div><div class="grow">
    <div class="fi" style="width:84px;height:84px;border-radius:24px;background:linear-gradient(145deg,#F59E0B,#E5383B);display:grid;place-items:center;color:#fff">${I.bell.replace('<svg','<svg width="44" height="44"')}</div>
    <h2>${tr("یادت می‌ندازیم")}</h2>
    <p>${tr("۱۴ روز و ۳ روز قبل از اینکه بیمه، بولو یا رویزیونه‌ات تموم بشه، و همون روز، یه پیام کوتاه برات می‌فرستیم.")}</p>
    <div class="notif-demo">
      <div class="nbanner"><div class="ni">${CAR("#E5383B").replace('class="car"','style="width:30px;height:14px"')}</div><div><b>${tr("بیمه‌ی موتورت ۶ روز دیگه تموم می‌شه")}</b><p>${tr("هوندا اس‌اچ ۱۲۵ · بزن تا تمدیدش کنی")}</p></div><small>${tr("الان")}</small></div>
      <div class="nbanner"><div class="ni">${CAR("#E5383B").replace('class="car"','style="width:30px;height:14px"')}</div><div><b>${tr("بولوی فیات پاندا")}</b><p>${tr("۱۲ روز دیگه باید بدی")}</p></div><small>${tr("۲ ساعت")}</small></div>
    </div></div>
    <div class="dots"><i></i><i></i><i></i><i class="on"></i></div>
    <button class="btn fill" data-notify="1" data-go="home">${tr("باشه، خبرم کن")}</button>
    <button class="btn plain" data-notify="0" data-go="home">${tr("بعداً")}</button>
  </div>`;
}

function vHome(){
  // 1) reminder: bollo and insurance only, closest first
  const dl = [];
  for (const c of state.cars) for (const k of ["bollo","insurance"]) if (c.dl[k]) dl.push({ c, k, d:c.dl[k] });
  dl.sort((a, b) => a.d - b.d);
  const first = dl[0], others = dl.slice(1, 3);
  const days = (n) => n < 0 ? tr("گذشته") : n === 0 ? tr("امروز") : `${FA(n)} ${tr("روز")}`;
  const C = 2*Math.PI*36;
  let reminder = `<div class="card tip"><div class="ti">${I.plus}</div><p>${tr("هنوز وسیله‌ای اضافه نکردی. از گاراژ اضافه کن تا یادآوری‌ها اینجا بیان.")}</p></div>`;
  if (first) {
    const left = daysLeft(first.d), pct = Math.max(.04, Math.min(1, left / (RENEW[first.k][0] * 30.44)));   // time left in this cycle
    reminder = `<div class="card hero ${status(left)}">
      <svg class="ring" viewBox="0 0 84 84"><circle cx="42" cy="42" r="36" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="8"/>
        <circle cx="42" cy="42" r="36" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-pct)}" transform="rotate(-90 42 42)"/></svg>
      <div class="ring"><b>${FA(Math.max(0, left))}<small>${tr("روز")}</small></b></div>
      <div class="k">${tr("نزدیک‌ترین تاریخ")}</div>
      <h2>${DL[first.k][0]} ${esc(first.c.name)}</h2>
      <p>${fmtDate(first.d)}</p>
      <div class="acts">${left <= SHOW_DONE_DAYS ? `<button class="w" data-done="${first.c.id}:${first.k}">${RENEW[first.k][1]}</button><button data-open="${first.c.id}">${tr("جزئیات")}</button>` : `<button class="w" data-open="${first.c.id}">${tr("جزئیات")}</button><button data-tab="garage">${tr("گاراژ")}</button>`}</div>
    </div>
    ${others.length ? `<div class="group" style="margin-top:12px">${others.map((o) => `<button class="row" style="width:100%" data-open="${o.c.id}"><div class="ic" style="background:${DL[o.k][1]}">${DL[o.k][2]}</div><span class="t">${DL[o.k][0]} ${esc(o.c.name)}</span><span class="chip ${status(daysLeft(o.d))}"><i></i>${days(daysLeft(o.d))}</span></button>`).join("")}</div>` : ""}`;
  }

  // 2) latest news: real posts from the Telegram channel (by hand for now; later from the news bot)

  // 3) emergency numbers (from the checked SOS list)
  const SOS_HOME = [
    ["112", tr("اورژانس، با مترجم"), "#DC2626", I.phone],
    ["113", tr("پلیس"), "#0A84FF", I.shield],
    ["118", tr("آمبولانس"), "#30A46C", I.plus],
    ["803.116", tr("امداد خودرو ACI"), "#F59E0B", I.wrench],
  ];

  return `<div class="navbar" data-title="${tr("خانه")}"><span class="ttl">${tr("خانه")}</span></div>
  <div class="hello"><div><div class="d">${fmtDay(today)}</div><h1>${tr("سلام 👋")}</h1></div></div>
  <div class="section"><div class="sec-h"><h3>${I.bell}${tr("یادآوری")}</h3><a data-tab="garage">${tr("گاراژ")}</a></div>${reminder}</div>
  <div class="section"><div class="sec-h"><h3>${I.news}${tr("آخرین خبرها")}</h3><a href="https://t.me/khodro_italy" target="_blank" rel="noopener">${tr("کانال تلگرام")}</a></div>
    <div class="card news" id="newsbox">${newsHTML()}</div></div>
  <div class="section"><div class="sec-h"><h3>${I.phone}${tr("شماره‌های ضروری")}</h3><a data-tool="sos">${tr("همه")}</a></div>
    <div class="sosgrid">${SOS_HOME.map(([n, t, c, ic]) => `<a class="card" href="tel:${n.replace(/[^+\d]/g, "")}"><div class="ti" style="background:${c}">${ic}</div><b>${FA(n)}</b><span>${t}</span></a>`).join("")}</div></div>
  ${tabbar("home")}`;
}

function carCard(v){
  const chips = Object.entries(v.dl).sort((a,b) => a[1]-b[1]).map(([k,d]) => { const n = daysLeft(d); return `<span class="chip ${status(n)}"><i></i>${DL[k][0]}: ${daysTxt(n)}</span>`; }).join("") || `<span class="chip"><i></i>${tr("هنوز تاریخی ثبت نشده")}</span>`;
  return `<div class="card carcard" data-open="${v.id}">
    <div class="top" style="background:radial-gradient(80% 90% at 50% 100%, ${v.color}22, transparent 70%), linear-gradient(180deg, var(--card2), var(--card))">${ART(v)}</div>
    <div class="meta"><h4>${esc(v.name)} ${v.plate ? plate(v.plate) : ""}</h4>
      <div class="sub">${[v.year ? FA(v.year) : "", v.fuel, `${FA(v.kw)} ${tr("کیلووات")}`, tr("یورو {n}", {n:FA(v.euro)})].filter(Boolean).join(" · ")}</div>
      <div class="chips">${chips}</div></div></div>`;
}

function vGarage(){
  return `<div class="navbar" data-title="${tr("گاراژ من")}"><span class="navbtn"></span><span class="ttl">${tr("گاراژ من")}</span><span class="navbtn end"><button class="iconbtn" data-sheet="1">${I.plus.replace('<svg','<svg width="18" height="18"')}</button></span></div>
  <div class="large">${tr("گاراژ من")}</div>
  <div class="subhead">${FA(state.cars.length)} ${tr("وسیله ·")} ${tr(state.region)}</div>
  <div class="section" style="display:flex;flex-direction:column;gap:16px">${state.cars.map(carCard).join("")}
    <button class="empty-add" data-sheet="1"><b>${tr("+ اضافه کردن ماشین یا موتور")}</b>${tr("مدل و کیلووات کافیه، تاریخ‌ها هم اگه بدونی")}</button></div>
  ${tabbar("garage")}`;
}

function vDetail(){
  const v = state.cars.find(c => c.id === state.detail) || state.cars[0];
  const rows = Object.entries(v.dl).sort((a,b) => a[1]-b[1]).map(([k,d]) => {
    const n = daysLeft(d), [t,c,ic] = DL[k], s = status(n);
    const col = s==="ok" ? "var(--green-text)" : s==="warn" ? "var(--orange-text)" : "var(--tint-text)";
    return `<div class="deadline"><div class="ic" style="background:${c}">${ic}</div>
      <div class="tx"><b>${t}</b><span>${fmtDate(d)}</span><div class="bar"><i style="width:${Math.max(4, Math.min(100, n / (RENEW[k][0] * 30.44) * 100))}%;background:${col}"></i></div></div>
      <div class="left"><b style="color:${col}">${n < 0 ? tr("گذشته") : FA(n)}</b><span>${n < 0 ? "" : tr("روز مونده")}</span></div>
      ${n <= SHOW_DONE_DAYS ? `<button class="donebtn" data-done="${v.id}:${k}">${I.check} ${RENEW[k][1]}</button>` : ""}</div>`;
  }).join("");
  return `<div class="navbar solid-on-scroll" data-title="${esc(v.name)}"><button class="navbtn" data-back="garage">${I.back}<span>${tr("گاراژ")}</span></button><span class="ttl">${esc(v.name)}</span><span class="navbtn end"><button class="navbtn end" style="min-width:0" data-edit="${v.id}">${tr("ویرایش")}</button></span></div>
  <div class="detail-hero" style="background:radial-gradient(70% 70% at 50% 85%, ${v.color}33, transparent 70%)">${ART(v)}</div>
  <div class="detail-head"><h2>${esc(v.name)}</h2>${v.plate ? `<div style="margin-top:8px">${plate(v.plate)}</div>` : ""}</div>
  <div class="section"><div class="specs">
    <div class="card spec"><b>${FA(v.kw)}</b><span>${tr("کیلووات")}</span></div>
    <div class="card spec"><b>${tr("یورو {n}", {n:FA(v.euro)})}</b><span>${tr("آلایندگی")}</span></div>
    <div class="card spec"><b>${v.year ? FA(v.year) : "—"}</b><span>${tr("سال ساخت")}</span></div></div></div>
  <div class="section"><div class="sec-h"><h3>${tr("موعدها")}</h3></div><div class="card">${rows || `<div style="padding:16px;color:var(--label2)">${tr("هنوز تاریخی ثبت نشده.")}</div>`}</div></div>
  <div class="section"><div class="group">
    <button class="row" style="width:100%" data-tool="bollo" data-car="${v.id}"><div class="ic" style="background:#E5383B">${I.euro}</div><span class="t">${tr("بولوی این وسیله")}</span><span class="v">${EUR(calcBollo(v.kind, v.kw, v.euro, state.region).total)} €</span>${I.chev}</button>
    <button class="row" style="width:100%" data-tool="insurance"><div class="ic" style="background:#0A84FF">${I.shield}</div><span class="t">${tr("بیمه رو بفهم")}</span>${I.chev}</button>
    <div class="row"><div class="ic" style="background:#F59E0B">${I.bell}</div><span class="t">${tr("یادآوری‌ها")}</span><span class="v">${!state.notify ? tr("خاموش") : NATIVE ? tr("۱۴ و ۳ روز قبل") : tr("فقط تو اپ")}</span>${I.chev}</div>
  </div></div>
  ${tabbar("garage")}`;
}

function vTools(){
  // only tools that work (Apple rule 2.1: no "coming soon" placeholders). Add new ones here when they are ready.
  const T = [[tr("شماره‌های ضروری"),tr("اورژانس، امداد خودرو، ترافیک"),"#DC2626",I.phone,"sos"],
    [tr("حساب بولو"),tr("ماشین و موتور، همه‌ی منطقه‌ها"),"#E5383B",I.euro,"bollo"],
    [tr("بیمه چنده؟"),tr("قیمت حدودی از آمار رسمی"),"#0A84FF",I.shield,"insurance"],
    [tr("خبرهای رسمی"),tr("از کانال تلگرام خودرو ایتالیا"),"#14B8A6",I.news,null,"https://t.me/khodro_italy"]];
  return `<div class="navbar" data-title="${tr("ابزارها")}"><span class="ttl">${tr("ابزارها")}</span></div>
  <div class="large">${tr("ابزارها")}</div><div class="subhead">${tr("هر چی واسه ماشین و موتورت لازم داری.")}</div>
  <div class="section"><div class="tools">${T.map(([name,sub,c,ic,tool,url]) => url
    ? `<a class="card tool" href="${url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none"><div class="ti" style="background:${c}">${ic}</div><b>${name}</b><span>${sub}</span></a>`
    : `<button class="card tool" data-tool="${tool}"><div class="ti" style="background:${c}">${ic}</div><b>${name}</b><span>${sub}</span></button>`).join("")}</div></div>
  ${tabbar("tools")}`;
}

function vProfile(){
  const dark = document.documentElement.dataset.theme === "dark";
  return `<div class="navbar" data-title="${tr("تنظیمات")}"><span class="ttl">${tr("تنظیمات")}</span></div>
  <div class="large">${tr("تنظیمات")}</div>
  <div class="section"><div class="card" style="display:flex;gap:14px;align-items:center;padding:16px"><div style="width:58px;height:58px;flex:none">${LOGO}</div>
    <div style="flex:1"><b style="font-size:18px">${tr("خودرو ایتالیا")}</b><div class="sub" style="color:var(--label2);font-size:13.5px">${FA(state.cars.length)} ${tr("وسیله ·")} ${tr(state.region)}</div></div></div></div>
  <div class="section"><div class="group">
    <button class="row" style="width:100%" data-go="setup"><div class="ic" style="background:#30A46C">${I.pin}</div><span class="t">${tr("منطقه")}</span><span class="v">${tr(state.region)}</span>${I.chev}</button>
    <div class="row"><div class="ic" style="background:#F59E0B">${I.bell}</div><span class="t">${tr("یادآوری‌ها")}</span><button class="sw ${state.notify?'on':''}" data-sw="notify"></button></div>
    <div class="row"><div class="ic" style="background:#5856D6">${I.moon}</div><span class="t">${tr("حالت تاریک")}</span><button class="sw ${dark?'on':''}" data-sw="dark"></button></div>
    <div class="row"><div class="ic" style="background:#0A84FF">${I.globe}</div><span class="t">${tr("زبان")}</span></div>
    <div style="padding:0 16px 12px"><div class="langbar">${I18N.LANGS.map(l => `<button class="${l===I18N.lang?'on':''}" data-lang="${l}">${I18N.NAMES[l]}</button>`).join("")}</div></div>
  </div><div class="foot">${NATIVE ? `${tr("یادآوری‌ها:")} ${REMIND_TEXT}.` : tr("یادآوری با اعلان فقط تو اپ آیفون و اندروید (از اپ‌استور و گوگل‌پلی) کار می‌کنه. اینجا تاریخ‌ها فقط تو صفحه‌ی خانه نشون داده می‌شن.")}</div></div>
  <div class="section"><div class="group">
    <a class="row" href="https://t.me/khodro_italy" target="_blank" rel="noopener" style="color:inherit;text-decoration:none"><div class="ic" style="background:#229ED9">${I.news}</div><span class="t">${tr("کانال تلگرام")}</span><span class="v" style="direction:ltr">@khodro_italy</span>${I.chev}</a>
    <a class="row" href="https://www.instagram.com/khodro_italy/" target="_blank" rel="noopener" style="color:inherit;text-decoration:none"><div class="ic" style="background:linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)">${I.me}</div><span class="t">${tr("اینستاگرام")}</span><span class="v" style="direction:ltr">@khodro_italy</span>${I.chev}</a>
    <a class="row" href="https://arefhg.github.io/khodro-app/privacy.html" target="_blank" rel="noopener" style="color:inherit;text-decoration:none"><div class="ic" style="background:#30A46C">${I.lock || I.info}</div><span class="t">${tr("حریم خصوصی")}</span>${I.chev}</a>
    <div class="row"><div class="ic" style="background:#8E8E93">${I.info}</div><span class="t">${tr("درباره‌ی اپ")}</span><span class="v">${tr("نسخه‌ی ۱٫۰")}</span></div>
  </div><div class="foot">${tr("همه‌ی اطلاعاتت فقط روی همین گوشی می‌مونه و جایی فرستاده نمی‌شه.")}</div></div>
  ${tabbar("profile")}`;
}

function sheetHTML(){
  const n = state.newCar;
  const COLORS = ["#1F2937","#E5383B","#F5F5F4","#0A84FF","#30A46C","#F59E0B"];
  return `<div class="grab"></div>
  <div class="sh"><button class="navbtn" data-sheet="0">${tr("انصراف")}</button><b>${state.editId ? tr("ویرایش وسیله") : tr("ماشین جدید")}</b><button class="navbtn end" style="font-weight:700" data-save="1">${tr("ذخیره")}</button></div>
  <div class="body">
    <div class="seg" style="margin:6px 0 18px"><button class="${n.kind==='car'?'on':''}" data-kind="car">${tr("ماشین")}</button><button class="${n.kind==='moto'?'on':''}" data-kind="moto">${tr("موتور")}</button></div>
    <div style="display:flex;justify-content:center;margin:-6px 0 6px">${(n.kind==="moto"?MOTO:CAR)(n.color).replace('class="car"','style="width:220px;height:88px;filter:drop-shadow(0 12px 12px rgba(0,0,0,.2))"')}</div>
    <div class="group">
      <div class="field"><label>${tr("مدل")}</label><input data-f="name" value="${esc(n.name)}" placeholder="${n.kind==='moto'?tr('مثلاً یاماها تی‌مکس'):tr('مثلاً فیات ۵۰۰')}"></div>
      <div class="field"><label>${tr("سال ساخت")}</label><input data-f="year" value="${esc(n.year)}" inputmode="numeric" placeholder="${FA(2020)}"></div>
      <div class="field"><label>${tr("پلاک")}</label><input class="ltr" data-f="plate" value="${esc(n.plate)}" placeholder="AB 123 CD"></div>
      <div class="field"><label>${tr("توان موتور")}</label><input data-f="kw" value="${n.kw}" inputmode="numeric" placeholder="${tr("کیلووات — تو لیبرتو، خونه‌ی P.2")}"></div>
    </div>
    <div class="foot">${tr("مدل و کیلووات لازمه؛ کیلووات رو واسه حساب کردن بولو می‌خوایم.")}</div>
    <div class="group">
      <div class="field"><label>${tr("مهلت بولو")}</label><input type="date" data-f="bollo" value="${n.bollo}"></div>
      <div class="field"><label>${tr("پایان بیمه")}</label><input type="date" data-f="insurance" value="${n.insurance}"></div>
      <div class="field"><label>${tr("رویزیونه")}</label><input type="date" data-f="revisione" value="${n.revisione}"></div>
    </div>
    <div class="foot">${tr("هر کدوم رو که می‌دونی بزن؛ بقیه رو بعداً هم می‌شه اضافه کرد.")}</div>
    <div class="group"><div style="padding:12px 16px 0;font-size:13px;color:var(--label2)">${tr("کلاس یورو")}</div>
      <div class="euro">${[0,1,2,3,4,5,6].map(e => `<button class="${n.euro===e?'on':''}" data-euro="${e}">${FA(e)}</button>`).join("")}</div></div>
    <div class="group" style="margin-top:18px"><div style="padding:12px 16px 0;font-size:13px;color:var(--label2)">${tr("رنگ")}</div>
      <div class="colors">${COLORS.map(c => `<button style="background:${c}" class="${n.color===c?'on':''}" data-color="${c}"></button>`).join("")}</div></div>
    <button class="btn fill" style="margin-top:22px" data-save="1">${state.editId ? tr("ذخیره‌ی تغییرات") : tr("اضافه کن به گاراژ")}</button>
    ${state.editId ? `<button class="btn plain" style="color:var(--red,#E5383B)" data-del="${state.editId}">${tr("حذف این وسیله")}</button>` : ""}
  </div>`;
}

function vBollo(){
  const b = state.bollo;
  return `<div class="navbar solid" data-title="${tr("حساب بولو")}"><button class="navbtn" data-back="tools">${I.back}<span>${tr("ابزارها")}</span></button><span class="ttl">${tr("حساب بولو")}</span><span class="navbtn end"></span></div>
  <div class="large" style="padding-top:8px">${tr("حساب بولو")}</div>
  <div class="subhead">${tr("ببین امسال چقدر بولو باید بدی.")}</div>
  <div class="section"><div class="seg"><button class="${b.kind==='car'?'on':''}" data-bkind="car">${tr("ماشین")}</button><button class="${b.kind==='moto'?'on':''}" data-bkind="moto">${tr("موتور")}</button></div></div>
  <div class="section"><div class="card" style="padding:18px 16px 14px">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span style="font-weight:700">${tr("ماشینت چند کیلوواته؟")}</span><span class="foot" style="padding:0">${tr("تو لیبرتو، خونه‌ی P.2")}</span></div>
    <div class="kwrow"><button class="stepb" data-kw="-1">−</button><div class="kwbig"><b id="kwv">${FA(b.kw)}</b><span>${tr("کیلووات")}</span><small id="cvv">≈ ${FA(Math.round(b.kw/0.736))} ${tr("اسب")}</small></div><button class="stepb" data-kw="1">+</button></div>
    <input type="range" class="slider" id="kwr" min="1" max="${b.kind==='moto'?120:400}" value="${b.kw}">
    <div class="quick">${(b.kind==='moto'?[9,11,15,35,70]:[51,70,85,110,190]).map(k => `<button data-kwset="${k}">${FA(k)}</button>`).join("")}</div>
  </div></div>
  <div class="section"><div class="group"><div style="padding:12px 16px 0;font-size:13px;color:var(--label2)">${tr("کلاس یورو — تو لیبرتو، خونه‌ی V.9")}</div>
    <div class="euro">${[0,1,2,3,4,5,6].map(e => `<button class="${b.euro===e?'on':''}" data-beuro="${e}">${FA(e)}</button>`).join("")}</div></div></div>
  <div class="section"><div class="group"><div class="field"><label>${tr("منطقه")}</label>
    <select id="breg">${REGIONS.map(r => `<option value="${r}" ${r===b.region?'selected':''}>${tr(r)}</option>`).join("")}</select></div></div></div>
  <div class="section" id="bres">${bolloResult()}</div>
  <div class="section"><div class="card tip"><div class="ti">${I.bulb}</div><p>${tr("عدد دقیق رو با پلاکت تو سایت ACI چک کن. تخفیف‌ها (برقی، گازی، هیبریدی، ماشین‌های قدیمی) اینجا حساب نشده.")}</p></div></div>
  ${tabbar("tools")}`;
}
function bolloResult(){
  const b = state.bollo, r = calcBollo(b.kind, b.kw, b.euro, b.region);
  let cmp = "";
  if (b.kind === "car") {
    const all = REGIONS.map(x => calcBollo("car", b.kw, b.euro, x).total), cheap = Math.min(...all), dear = Math.max(...all);
    const span = Math.max(1, dear - cheap), pos = ((r.total - cheap) / span) * 100;
    cmp = `<div class="cmp"><div class="cmpbar"><i style="inset-inline-start:${Math.min(100,Math.max(0,pos))}%"></i></div>
      <div class="cmpl"><span>${tr("ارزون‌ترین منطقه")}<br><b>${EUR(cheap)} €</b></span><span style="text-align:end">${tr("گران‌ترین منطقه")}<br><b>${EUR(dear)} €</b></span></div></div>`;
  }
  return `<div class="card result">
    <div class="rk">${tr("بولوی سالانه‌ات")}</div>
    <div class="rv"><b>${EUR(r.total)}</b><span>${tr("یورو در سال")}</span></div>
    ${r.ok ? "" : `<span class="badge" style="background:rgba(245,158,11,.15);color:#B45309">${tr("تأیید نشده — جدول رسمی این منطقه در دسترس نبود")}</span>`}
    <div class="lines">${r.lines.map(([t,v]) => `<div><span>${t}</span><b>${EUR(v)} €</b></div>`).join("")}</div>
    ${cmp}${r.note ? `<div class="foot" style="padding:8px 0 0">${tr(r.note)}</div>` : ""}
    <div class="foot" style="padding:8px 0 0">${tr("نرخ‌های {y}، چک‌شده با جدول رسمی.", {y:FA(BOLLO.year)})} <a href="${r.src}" target="_blank" rel="noopener" style="color:var(--tint-text)">${tr("منبع")}</a></div>
    <div class="foot" style="padding:8px 0 0"><b>${FA(2027)}:</b> ${tr("برای هر نفر یه وسیله بولو نمی‌ده: ماشین بنزینی، دیزلی، دوگانه‌سوز یا هیبریدی تا ۸۰ کیلووات (اگه چند تا داری، کم‌توان‌ترین)؛ اگه چنین ماشینی نداری، موتور. فقط اشخاص (نه شرکت‌ها)، با بیمه‌ی معتبر.")}</div>
  </div>`;
}

function insClasses(){
  const out = [state.ins.start]; let c = state.ins.start;
  for (const acc of state.ins.years) { c = acc ? Math.min(18, c + 2) : Math.max(1, c - 1); out.push(c); }
  return out;
}
function vInsurance(){
  const s = state.ins, path = insClasses(), last = path[path.length-1];
  const F = [[tr("شهری که توش زندگی می‌کنی"),tr("جاهایی که تصادف یا دزدی بیشتره، گرون‌ترن."),1],[tr("سن و سابقه‌ی پاتنته"),tr("جوون‌ترها و تازه‌پاتنته‌گرفته‌ها بیشتر می‌دن."),1],
    [tr("قدرت ماشین"),tr("ماشین قوی‌تر، بیمه‌ی گرون‌تر."),1],[tr("نوع سوخت"),tr("بنزینی، دیزلی، هیبرید یا برقی — خرج تعمیرشون فرق داره."),0],
    [tr("جعبه سیاه"),tr("یه ردیاب تو ماشین؛ بعضی شرکت‌ها باهاش تخفیف می‌دن."),0],[tr("سقف پوشش"),tr("سقف رو بیشتر از حداقل بگیری، گرون‌تر می‌شه."),0],
    [tr("فرانشیز"),tr("اون تیکه از خسارت که خودت می‌دی؛ هرچی بیشتر، بیمه ارزون‌تر."),0],[tr("برای چی ازش استفاده می‌کنی"),tr("شخصی یا کاری، و سالی چند کیلومتر می‌ری."),0]];
  const C = [["rc",tr("بیمه‌ی شخص ثالث (RC)"),tr("اجباریه — فقط خسارت بقیه رو می‌ده"),1],["kaskoFull",tr("کاسکوی کامل"),tr("تقریباً هر خسارتی به ماشین خودت"),0],["kaskoPart",tr("کاسکوی جزئی"),tr("فقط اگه با یه ماشین دیگه تصادف کنی"),0],
    ["theft",tr("دزدی و آتیش"),tr("اگه ماشینو بدزدن یا بسوزه"),0],["glass",tr("شیشه"),tr("شیشه جلو، بغل‌ها و آینه‌ها"),0],["road",tr("امداد جاده‌ای"),tr("یدک‌کش و تعمیر سر جا"),0],
    ["nature",tr("حوادث طبیعی"),tr("تگرگ، سیل، طوفان"),0],["driver",tr("حادثه‌ی راننده"),tr("اگه خودت آسیب ببینی"),0],["legal",tr("وکیل و دادگاه"),tr("خرج وکیل اگه کار به دادگاه بکشه"),0]];
  const kasko = s.cov.kaskoFull || s.cov.kaskoPart;
  return `<div class="navbar solid" data-title="${tr("بیمه رو بفهم")}"><button class="navbtn" data-back="tools">${I.back}<span>${tr("ابزارها")}</span></button><span class="ttl">${tr("بیمه رو بفهم")}</span><span class="navbtn end"></span></div>
  <div class="large" style="padding-top:8px">${tr("بیمه رو بفهم")}</div>
  <div class="subhead">${tr("قیمت بیمه تو ایتالیا از کجا میاد؟ قدم‌به‌قدم.")}</div>

  <div class="section"><button class="card ctaq" data-tool="quote"><div class="ti" style="background:#0A84FF">${I.shield}</div><div style="flex:1;text-align:start"><b>${tr("قیمت بیمه‌ات رو کامل حساب کن")}</b><span>${tr("۵ مرحله، مثل سایت‌های بیمه")}</span></div>${I.chev}</button></div>
  <div class="section"><div class="sec-h"><h3>${tr("بیمه‌ات حدوداً چنده؟")}</h3></div><div class="card" style="padding:16px">
    <div class="seg" style="margin-bottom:12px"><button class="${state.insq.kind==='car'?'on':''}" data-qkind="car">${tr("ماشین")}</button><button class="${state.insq.kind==='moto'?'on':''}" data-qkind="moto">${tr("موتور")}</button></div>
    <div class="group" style="background:var(--card2)">
      <div class="field"><label>${tr("استان")}</label><select id="qprov">${Object.keys(IPER.prov[state.insq.kind]).sort().map(p => `<option ${p===state.insq.prov?'selected':''}>${p}</option>`).join("")}</select></div>
      <div class="field"><label>${tr("کلاس بیمه")}</label><div class="kwrow" style="margin:0;gap:10px;flex:1;justify-content:flex-end">
        <button class="stepb sm" data-qcu="-1">−</button><b style="font-size:19px;min-width:28px;text-align:center" id="qcu">${FA(state.insq.cu)}</b><button class="stepb sm" data-qcu="1">+</button></div></div>
    </div>
    <div style="font-size:13px;color:var(--label2);margin:12px 2px 6px">${tr("سنت")}</div>
    <div class="euro" style="padding:0">${IPER.ages[state.insq.kind].map((a,i) => `<button class="${state.insq.age===i?'on':''}" data-qage="${i}" style="padding:0 10px">${a}</button>`).join("")}</div>
    <div style="font-size:13px;color:var(--label2);margin:12px 2px 6px">${tr("سابقه‌ی پاتنته")}</div>
    <div class="euro" style="padding:0">${LIC_LABELS.map((a,i) => `<button class="${state.insq.lic===i?'on':''}" data-qlic="${i}" style="padding:0 10px">${a}</button>`).join("")}</div>
    <div style="font-size:13px;color:var(--label2);margin:12px 2px 6px">${tr("پرداخت")}</div>
    <div class="seg"><button class="${!state.insq.monthly?'on':''}" data-qpay="0">${tr("یه‌جا، سالانه")}</button><button class="${state.insq.monthly?'on':''}" data-qpay="1">${tr("قسطی، ماهانه")}</button></div>
    <div id="qres">${insQuoteHTML()}</div>
  </div></div>

  <div class="section" id="realsec">${realHTML()}</div>

  <div class="section"><div class="sec-h"><h3>${tr("کلاس بیمه‌ات")}</h3></div><div class="card" style="padding:16px">
    <p style="font-size:14px;color:var(--label2);line-height:1.8;margin-bottom:12px">${tr("مهم‌ترین چیزیه که قیمت بیمه رو تعیین می‌کنه (تقریباً نصفش). از ۱ (ارزون‌ترین) تا ۱۸ (گرون‌ترین). هر سال بی‌تصادف")} <b style="color:var(--green)">${tr("یه کلاس می‌ری پایین")}</b>${tr("، هر تصادفی که مقصر باشی")} <b style="color:var(--tint-text)">${tr("دو کلاس می‌ری بالا")}</b>.</p>
    <div class="scale"><div class="sbar"></div><i class="mk" style="inset-inline-start:${(last-1)/17*100}%"><b>${FA(last)}</b></i></div>
    <div class="cmpl" style="margin:4px 0 12px"><span>${tr("۱ · ارزون‌ترین")}</span><span>${tr("۱۸ · گرون‌ترین")}</span></div>
    <div class="field" style="padding:0;min-height:44px"><label>${tr("از کلاس")}</label><div class="kwrow" style="margin:0;gap:10px;justify-content:flex-start">
      <button class="stepb sm" data-cls="-1">−</button><b style="font-size:20px;min-width:30px;text-align:center">${FA(s.start)}</b><button class="stepb sm" data-cls="1">+</button>
      <span class="foot" style="padding:0">${s.start===14?tr("پاتنته‌ی تازه"):""}</span></div></div>
    <div class="years">${s.years.map((acc,i) => `<div class="yr"><span class="yn">${tr("سال")} ${FA(i+1)}</span><span class="yc">${FA(path[i])}</span>
      <div class="seg mini"><button class="${!acc?'on':''}" data-yr="${i}" data-acc="0">${tr("بی‌تصادف")}</button><button class="${acc?'on bad':''}" data-yr="${i}" data-acc="1">${tr("تصادف، مقصر")}</button></div>
      <span class="ya ${acc?'up':'down'}">${acc?FA('+2'):FA('−1')}</span></div>`).join("")}
      <div class="yr end"><span class="yn">${tr("سال")} ${FA(s.years.length+1)}</span><span class="yc big">${FA(last)}</span><span style="flex:1;font-size:13px;color:var(--label2)">${tr("کلاست بعد از {n} سال", {n:FA(s.years.length)})}</span></div></div>
    <div class="foot" style="padding:10px 0 0">${tr("کلاس مال خودته، نه ماشین؛ شرکت بیمه رو هم عوض کنی باهات میاد. با «RC فامیلیاره» می‌تونی کلاس خوب یکی از خانواده رو واسه ماشین یا موتور خودت هم بگیری.")}</div>
  </div></div>

  <div class="section"><div class="sec-h"><h3>${tr("دیگه چی قیمت رو بالا پایین می‌کنه؟")}</h3></div><div class="group">
    ${F.map(([t,d,top],i) => `<div class="row" style="align-items:flex-start"><div class="ic" style="background:${top?'#C99A2E':'#8E8E93'};font-weight:800;font-size:13px">${FA(i+1)}</div><div class="t"><b style="font-size:15.5px">${t}</b>${top?` <span class="badge gold">${tr("خیلی مهم")}</span>`:''}<div style="font-size:13px;color:var(--label2);margin-top:2px">${d}</div></div></div>`).join("")}
  </div></div>

  <div class="section"><div class="sec-h"><h3>${tr("چه پوشش‌هایی می‌خوای؟")}</h3></div><div class="group">
    ${C.map(([k,t,d,lock]) => `<div class="row"><div style="flex:1"><b style="font-size:15.5px">${t}</b>${lock?` <span class="badge">${tr("اجباری")}</span>`:''}<div style="font-size:13px;color:var(--label2);margin-top:2px">${d}</div></div><button class="sw ${s.cov[k]?'on':''} ${lock?'lock':''}" data-cov="${k}"></button></div>`).join("")}
  </div>
  <div class="card" style="padding:16px;margin-top:12px">
    <div style="display:flex;justify-content:space-between;font-weight:700"><span>${tr("ماشینت چقدر می‌ارزه؟")}</span><span id="valv">${EUR0(s.value)} €</span></div>
    <input type="range" class="slider" id="valr" min="1000" max="40000" step="500" value="${s.value}">
    <div id="advice">${insAdvice()}</div>
  </div></div>

  <div class="section"><div class="sec-h"><h3>${tr("قیمت بیمه چطور ساخته می‌شه")}</h3></div><div class="card formula">
    <span>${tr("قیمت پایه")}</span><i>×</i><span>${tr("کلاس بیمه")}</span><i>×</i><span>${tr("شهر و راننده")}</span><i>+</i><span>${tr("پوشش‌های اضافه")}</span><i>−</i><span>${tr("تخفیف‌ها")}</span>
    <p>${tr("هر شرکت حساب‌کتاب خودشو داره؛ واسه همین از چندتا شرکت یا سایت مقایسه «پروِنتیوو» بگیر.")}</p></div></div>

  <div class="section"><div class="sec-h"><h3>${tr("چطور ارزون‌تر بگیری")}</h3></div><div class="group">
    ${[tr("اگه کسی تو خانواده کلاس بهتری داره، با RC فامیلیاره ازش استفاده کن."),tr("واسه ماشین ارزون، پول کاسکو نده."),tr("قبل از اینکه خودکار تمدید بشه، چندتا قیمت بگیر و مقایسه کن."),tr("ماشینت ارزونه؟ فرانشیز رو بالاتر بگیر."),tr("سالانه بدی معمولاً ارزون‌تر از قسطیه."),tr("خسارت خیلی کوچیک رو گاهی بهتره خودت بدی تا کلاست بالا نره.")]
      .map(t => `<div class="row"><div class="ic" style="background:var(--green)">${I.ok}</div><span class="t" style="font-size:15px">${t}</span></div>`).join("")}
  </div><div class="foot">${tr("این‌ها فقط واسه فهمیدنه، قیمت نیست. قیمت واقعی رو فقط شرکت بیمه بهت می‌ده.")}</div></div>
  ${tabbar("tools")}`;
}
function insQuoteHTML(){
  const q = state.insq, r0 = insEstimate(q.kind, q.prov, q.age, q.cu, q.lic), nat = IPER.nat[q.kind];
  const pm = q.monthly ? 1.2 : 1, r = { ...r0 }; for (const key of ["est","typ","low","high","lo80","hi80"]) r[key] = r0[key] * pm;
  const R = (n) => FA(Math.round(n/5)*5);
  const min = r.lo80 * .9, max = r.hi80 * 1.05, pos = (v) => Math.min(100, Math.max(0, (v - min) / (max - min) * 100));
  return `<div class="result" style="padding:16px 0 0">
    <div class="rk">${tr("۸ نفر از هر ۱۰ نفری که مثل تو هستن، در سال می‌دن:")}</div>
    <div class="rv"><b style="font-size:36px">${R(r.lo80)} ${tr("تا")} ${R(r.hi80)}</b><span>${tr("یورو")}</span></div>
    <div style="font-size:14px;margin:-4px 0 4px">${tr("معمولاً حدود")} <b>${R(r.typ)} €</b> ${tr("· نصف آدم‌ها بین")} <b>${R(r.low)}</b> ${tr("و")} <b>${R(r.high)} €</b></div>
    <div class="qbar"><span class="q80" style="inset-inline-start:${pos(r.lo80)}%;width:${pos(r.hi80)-pos(r.lo80)}%"></span><span class="qrange" style="inset-inline-start:${pos(r.low)}%;width:${pos(r.high)-pos(r.low)}%"></span><i style="inset-inline-start:${pos(r.typ)}%"></i><em style="inset-inline-start:${pos(nat)}%">${tr("میانگین ایتالیا")}</em></div>
    <div class="foot" style="padding:24px 0 0">${tr("چرا این‌قدر بازه پهنه؟ چون شرکت‌ها برای یه آدم قیمت‌های خیلی فرق‌دار می‌دن. اگه قیمتی که بهت دادن نزدیک بالای بازه‌ست، حتماً چند جای دیگه هم بپرس.")}</div>
    <div class="lines" style="margin-top:28px">
      <div><span>${tr("میانگین سن و کلاس تو (کل ایتالیا)")}</span><b>${FA(Math.round(r.base))} €</b></div>
      <div><span>${tr("استان")} ${q.prov} ${tr("(میانگین")} ${FA(r.provMean)} €)</span><b>× ${FA(r.pIdx.toFixed(2)).replace(".","٫")}</b></div>
      ${r.g ? `<div><span>${tr("کلاس")} ${FA(q.cu)} ${tr("داخل گروهش")}</span><b>× ${FA(r.adj.toFixed(2)).replace(".","٫")}</b></div>` : ""}
      ${r.lf !== 1 ? `<div><span>${tr("پاتنته‌ی تازه (")}${LIC_LABELS[q.lic]})</span><b>× ${FA(r.lf.toFixed(2)).replace(".","٫")}</b></div>` : ""}
      ${q.monthly ? `<div><span>${tr("قسطی ماهانه (+۲۰٪)")}</span><b>× ${EUR(1.2)}</b></div>` : ""}
      <div><span>${tr("میانگین آدم‌هایی مثل تو")}</span><b>${R(r.est)} €</b></div>
      <div><span>${tr("ازش مالیات و SSN (حدود ۲۱٪)")}</span><b>${R(r.est*0.265/1.265)} €</b></div>
      ${q.monthly ? `<div><span>${tr("هر ماه حدوداً")}</span><b>${R(r.est/12)} €</b></div>` : ""}
    </div>
    <div class="foot" style="padding:10px 0 0">${tr("فقط بیمه‌ی شخص ثالث (RC)، با مالیات. قدرت موتور، جعبه سیاه و شرکت بیمه هنوز حساب نشدن، واسه همین یه بازه نشون می‌دیم.")}<br>${tr("منبع: IVASS، قیمت‌هایی که واقعاً پرداخت شده —")} ${IPER.date}.
    ${q.lic<3 && q.age>0 ? `<br><b style="color:var(--orange)">${tr("ضریب پاتنته‌ی تازه از")} ${q.kind==='moto'?tr('قراردادهای واقعی'):tr('قیمت‌های منتشرشده')} ${tr("اومده و هنوز داده‌ی کمی پشتشه؛ هرچی قیمت بیشتری ثبت بشه، دقیق‌تر می‌شه.")}</b>` : ''}
    ${q.monthly ? `<br><b style="color:var(--tint-text)">${tr("اگه یه‌جا بدی، حدود")} ${R(r0.est*0.2)} ${tr("€ کمتر می‌دی.")}</b> ${tr("(۲۰٪ از یه قرارداد واقعی؛ هر شرکت فرق داره)")}` : ''}
</div>
    <a class="btn fill" style="margin-top:14px;text-decoration:none" href="https://www.preventivass.it/" target="_blank" rel="noopener">${tr("قیمت دقیق از همه‌ی شرکت‌ها ←")}</a>
    <div class="foot" style="padding:6px 0 0;text-align:center">${tr("سایت رسمی و رایگان دولت (Preventivass)")}</div>
  </div>`;
}
function realHTML(){
  const all = [...REAL_SEED, ...state.real];
  let inside = 0;
  const rows = all.map((p) => { const E = insEstimate(p.kind, p.prov, p.age, p.cu, p.lic), m = E.est, diff = Math.round((p.paid - m) / m * 100);
    const ok80 = p.paid >= E.lo80 && p.paid <= E.hi80; if (ok80) inside++;
    return `<div class="rp"><div><b>${FA(p.paid)} €</b> <span class="badge ${p.seed?'gold':''}">${p.seed==='pub'?tr('منتشرشده'):p.seed?tr('قرارداد واقعی'):tr('ثبت تو')}</span>
      <div class="foot" style="padding:2px 0 0">${p.kind==='moto'?tr('موتور'):tr('ماشین')} · ${p.prov==='—'?tr('کل ایتالیا'):p.prov} ${tr("· کلاس")} ${FA(p.cu)} · ${IPER.ages[p.kind][p.age]} ${tr("سال · پاتنته")} ${LIC_LABELS[p.lic]}${p.note?` · ${esc(p.note)}`:''}</div></div>
      <div class="rd ${ok80?'ok':'bad'}">${ok80?tr('✓ تو بازه'):tr('✗ بیرون بازه')}<br>${FA(Math.round(E.lo80/5)*5)}–${FA(Math.round(E.hi80/5)*5)} €</div></div>`; }).join("");
  const f = state.rf;
  const form = f ? `<div class="group" style="margin-top:12px;background:var(--card2)">
      <div class="field"><label>${tr("چقدر دادی؟")}</label><input id="rpaid" inputmode="numeric" placeholder="${tr("مثلاً ۸۵۰")}" value="${f.paid||''}"><span style="color:var(--label2)">€</span></div>
      <div class="field"><label>${tr("توضیح")}</label><input id="rnote" placeholder="${tr("مثلاً اسکوتر ۱۲۵، فقط RC")}" value="${f.note||''}"></div></div>
      <div class="foot">${tr("بقیه‌ی مشخصات (موتور یا ماشین، استان، کلاس، سن، پاتنته) رو از فرم بالا برمی‌داریم.")}</div>
      <div style="display:flex;gap:8px"><button class="btn tinted" data-rcancel="1">${tr("انصراف")}</button><button class="btn fill" data-rsave="1">${tr("ثبت")}</button></div>` :
      `<button class="btn tinted" style="margin-top:12px" data-radd="1">${tr("+ قیمتی که پارسال دادی رو ثبت کن")}</button>`;
  return `<div class="sec-h"><h3>${tr("قیمت‌های واقعی")}</h3></div><div class="card" style="padding:16px">
    <p style="font-size:14px;line-height:1.8;color:var(--label2);margin-bottom:6px">${tr("بازه‌ی «۸ از ۱۰» رو با این قیمت‌ها تست می‌کنیم:")} <b style="color:var(--label)">${FA(inside)} ${tr("از")} ${FA(all.length)}</b> ${tr("تو بازه بودن. وقتی قیمت‌های واقعی زیاد بشن، می‌بینیم واقعاً ۸ از ۱۰ تو بازه می‌افتن یا نه، و بازه رو درست می‌کنیم.")}</p>
    ${rows}${form}
    <div class="foot" style="padding:10px 0 0">${tr("قیمت‌هایی که ثبت می‌کنی فقط روی همین گوشی ذخیره می‌شن.")}</div></div>`;
}
function updReal(){ const r = phone.querySelector("#realsec"); if (r) r.innerHTML = realHTML(); }
function updQuote(){ const r = phone.querySelector("#qres"); if (r) r.innerHTML = insQuoteHTML(); const c = phone.querySelector("#qcu"); if (c) c.textContent = FA(state.insq.cu); }

function insAdvice(){
  const s = state.ins, kasko = s.cov.kaskoFull || s.cov.kaskoPart;
  if (kasko && s.value < 8000) return `<div class="advice warn">${tr("⚠ ماشین")} ${EUR0(s.value)} ${tr("یورویی؟ کاسکو معمولاً نمی‌صرفه؛ چند سال پولشو بدی، از خود ماشین بیشتر می‌شه.")}</div>`;
  if (!kasko && s.value >= 15000) return `<div class="advice info">${tr("ماشینت گرونه؛ کاسکو (کامل یا جزئی) می‌تونه منطقی باشه.")}</div>`;
  if (s.value < 8000) return `<div class="advice ok">${tr("✓ خوبه: واسه ماشین ارزون، بیمه‌ی ساده با فرانشیز بالاتر معمولاً به‌صرفه‌تره.")}</div>`;
  return `<div class="advice ok">${tr("✓ پوشش‌هات با قیمت ماشینت جوره.")}</div>`;
}

function vQuote(){
  const q = state.quote, S = [tr("وسیله"),tr("راننده"),tr("استفاده"),tr("سابقه"),tr("قرارداد"),tr("قیمت")];
  const chips = (key, list) => `<div class="euro" style="padding:0 0 4px">${list.map((x,i) => `<button class="${q[key]===i?'on':''}" data-qset="${key}|${i}" style="padding:0 10px;height:36px">${x[0]}</button>`).join("")}</div>`;
  const lab = (t) => `<div style="font-size:13px;color:var(--label2);margin:14px 2px 6px">${t}</div>`;
  const num = (key, label, ph, ltr) => `<div class="field"><label>${label}</label><input data-qf="${key}" value="${q[key]??''}" placeholder="${ph}" ${ltr?'class="ltr"':''} inputmode="${ltr?'text':'numeric'}"></div>`;
  let body = "";
  if (q.step === 0) body = `<div class="seg" style="margin-bottom:6px"><button class="${q.kind==='car'?'on':''}" data-qkind2="car">${tr("ماشین")}</button><button class="${q.kind==='moto'?'on':''}" data-qkind2="moto">${tr("موتور")}</button></div>
    <div class="group" style="margin-top:10px">${num("brand",tr("برند"), q.kind==='moto'?tr('مثلاً سیم (SYM)'):tr('مثلاً فیات'), true)}${num("model",tr("مدل"), q.kind==='moto'?tr('مثلاً Symphony 125'):tr('مثلاً Panda'), true)}${num("year",tr("سال اولین پلاک"),FA(2022))}</div>
    ${lab(q.kind==='moto'?tr("حجم موتور"):tr("قدرت موتور (لیبرتو، خونه‌ی P.2)"))}${chips("power", QF.power[q.kind])}
    ${lab(tr("سوخت"))}${chips("fuel", [[tr("بنزینی")],[tr("دیزلی")],[tr("هیبرید")],[tr("برقی")]])}`;
  if (q.step === 1) body = `<div class="group"><div class="field"><label>${tr("استان")}</label><select id="qprov2">${Object.keys(IPER.prov[q.kind]).sort().map(p => `<option ${p===q.prov?'selected':''}>${p}</option>`).join("")}</select></div>
    ${num("age",tr("سنت"),FA(30))}${num("licYears",tr("چند ساله پاتنته داری؟"),tr("۰ یعنی امسال گرفتم"))}${num("job",tr("شغل"),tr("مثلاً دانشجو"), true)}</div>
    <div class="foot">${tr("جنسیت رو نمی‌پرسیم: تو اروپا قیمت بیمه نباید به جنسیت ربط داشته باشه.")}</div>`;
  if (q.step === 2) body = `${lab(tr("سالی چند کیلومتر می‌ری؟"))}${chips("km", QF.km)}${lab(tr("شب کجا پارکش می‌کنی؟"))}${chips("park", QF.park)}${lab(tr("واسه چی استفاده می‌کنی؟"))}${chips("use", QF.use)}${lab(tr("کی می‌رونه؟"))}${chips("guide", QF.guide)}`;
  if (q.step === 3) body = `<div class="group"><div class="field"><label>${tr("کلاس بیمه (CU)")}</label><div class="kwrow" style="margin:0;gap:10px;flex:1;justify-content:flex-end">
      <button class="stepb sm" data-qcu2="-1">−</button><b style="font-size:19px;min-width:28px;text-align:center">${FA(q.cu)}</b><button class="stepb sm" data-qcu2="1">+</button></div></div></div>
    <div class="foot">${tr("بیمه‌ی اولته؟ کلاس ۱۴. روی «گواهی سابقه‌ی بیمه» (attestato di rischio) نوشته.")}</div>
    ${lab(QF.claims.label)}${chips("claims", QF.claims.opts)}`;
  if (q.step === 4) body = `${lab(tr("جعبه سیاه"))}${chips("box", QF.box)}${lab(tr("سقف پوشش"))}${chips("limit", QF.limit)}${lab(tr("پرداخت"))}${chips("pay", QF.pay)}`;
  if (q.step === 5) {
    const r = quoteCalc(q), R = (n) => FA(Math.round(n/5)*5), E2 = (n) => EUR(n) + " €";
    const min = r.lo80*.9, max = r.hi80*1.05, pos = (v) => Math.min(100, Math.max(0, (v-min)/(max-min)*100));
    body = `<div class="result" style="padding:4px 0 0">
      <div class="rk">${tr("قیمت تخمینی بیمه‌ی")} ${q.kind==='moto'?tr('موتور'):tr('ماشین')}${tr("ت (فقط RC)")}</div>
      <div class="rv"><b>${R(r.total)}</b><span>${tr("یورو در سال")}</span></div>
      ${q.pay ? `<div style="font-size:14px;margin:-6px 0 6px">${tr("ماهی حدود")} <b>${R(r.monthly)} €</b> ${tr("· یه‌جا بدی حدود")} <b>${R(r.total/1.2)} €</b> ${tr("می‌شه")}</div>` : ""}
      <div style="font-size:14px">${tr("۸ نفر از ۱۰ نفری که مثل تو هستن:")} <b>${R(r.lo80)} ${tr("تا")} ${R(r.hi80)} €</b></div>
      <div class="qbar"><span class="q80" style="inset-inline-start:${pos(r.lo80)}%;width:${pos(r.hi80)-pos(r.lo80)}%"></span><i style="inset-inline-start:${pos(r.total)}%"></i></div>
      <h4 style="margin:26px 0 6px;font-size:16px">${tr("از کجا اومد؟")}</h4>
      <div class="lines">${r.f.map(([t,v,tag,base]) => `<div><span>${t} <span class="badge ${tag==='o'?'new':'soon'}" style="font-size:12px">${tag==='o'?tr('رسمی'):tr('تخمینی')}</span></span><b>${base ? R(v)+" €" : "× "+FA(v.toFixed(2)).replace(".","٫")}</b></div>`).join("")}</div>
      <h4 style="margin:22px 0 6px;font-size:16px">${tr("این پول کجا می‌ره؟")}</h4>
      <div class="lines">
        <div><span>${tr("خسارت‌هایی که شرکت پیش‌بینی می‌کنه")}</span><b>${E2(r.claims)}</b></div>
        <div><span>${tr("کمیسیون فروش")}</span><b>${E2(r.commission)}</b></div>
        <div><span>${tr("بقیه‌ی هزینه‌ها و سود شرکت")}</span><b>${E2(r.net - r.claims - r.commission)}</b></div>
        <div><span>${tr("سهم سلامت (SSN) ۱۰٫۵٪")}</span><b>${E2(r.ssn)}</b></div>
        <div><span>${tr("مالیات استانی ۱۶٪")}</span><b>${E2(r.ipt)}</b></div>
      </div>
      <div class="foot" style="padding:10px 0 0">${tr("«رسمی» = از آمار IVASS/ANIA یا قرارداد واقعی. «تخمینی» = حدس ما، که با قیمت‌های واقعی‌ای که ثبت می‌شه درست می‌شه.")}</div>
      <a class="btn fill" style="margin-top:14px;text-decoration:none" href="https://www.preventivass.it/" target="_blank" rel="noopener">${tr("قیمت دقیق از همه‌ی شرکت‌ها ←")}</a>
    </div>`;
  }
  return `<div class="navbar solid"><button class="navbtn" data-back="insurance">${I.back}<span>${tr("بیمه")}</span></button><span class="ttl">${tr("قیمت بیمه")}</span><span class="navbtn end"></span></div>
  <div class="section" style="padding-top:10px">
    <div class="qsteps">${S.map((t,i) => `<span class="${i<q.step?'done':i===q.step?'on':''}">${t}</span>`).join("")}</div>
    <div class="qprog"><i style="width:${q.step/5*100}%"></i></div>
    <div class="large" style="padding:10px 4px 4px;font-size:28px">${[tr("چی داری؟"),tr("خودت"),tr("چطور ازش استفاده می‌کنی؟"),tr("سابقه‌ی بیمه"),tr("قرارداد"),tr("قیمتت")][q.step]}</div>
    <div class="card" style="padding:16px;margin-top:8px">${body}</div>
    <div style="display:flex;gap:10px;margin-top:16px">
      ${q.step>0 ? `<button class="btn tinted" data-qnav="-1">${tr("قبلی")}</button>` : ""}
      ${q.step<5 ? `<button class="btn fill" data-qnav="1">${q.step===4?tr('ببین چنده'):tr('بعدی')}</button>` : `<button class="btn tinted" data-qnav="-5">${tr("از اول")}</button>`}
    </div></div>
  ${tabbar("tools")}`;
}


/* Road emergency numbers (checked against official sources, Nov 2026) */
const SOS = [
  [I.phone + tr("اورژانس"), tr("رایگان و شبانه‌روزی"), [
    ["112",tr("شماره اورژانس عمومی اروپا. برای پلیس، آتش‌نشانی، آمبولانس و کمک در دریا. حتی بدون سیم‌کارت، با گوشی قفل یا بدون شارژ هم کار می‌کند."),tr("ایتالیایی، انگلیسی و زبان‌های دیگر با مترجم تلفنی. اگر ایتالیایی بلد نیستید، بهترین شماره همین است.")],
    ["113",tr("پلیس ایتالیا، از جمله پلیس راه. برای تصادف، خطر در جاده یا هر مشکل امنیتی."),tr("ایتالیایی. جایی که مرکز واحد ۱۱۲ فعال است، به همان مرکز با مترجم می‌رود؛ جاهای دیگر انگلیسی بستگی به اپراتور دارد.")],
    ["115",tr("آتش‌نشانی. برای آتش گرفتن ماشین، گیر افتادن آدم‌ها در ماشین بعد از تصادف، یا نشت سوخت."),tr("ایتالیایی. جایی که مرکز واحد ۱۱۲ فعال است، با مترجم؛ جاهای دیگر انگلیسی تضمینی نیست.")],
    ["118",tr("اورژانس پزشکی و آمبولانس. وقتی کسی زخمی شده یا حالش بد است."),tr("ایتالیایی. جایی که مرکز واحد ۱۱۲ فعال است، با مترجم؛ جاهای دیگر انگلیسی تضمینی نیست.")],
    ["1530",tr("گارد ساحلی. برای اورژانس در دریا و کنار ساحل."),tr("ایتالیایی (برای انگلیسی، تأیید رسمی پیدا نشد).")],
  ]],
  [I.wrench + tr("خرابی ماشین و یدک‌کش"), "", [
    ["803.116",tr("امداد خودرو ACI. شبانه‌روزی، در سراسر ایتالیا، تماس رایگان. برای اعضای ACI یا کسانی که امداد خودرو در بیمه‌شان دارند رایگان است؛ بقیه طبق تعرفه ACI پول می‌دهند."),tr("ایتالیایی (برای انگلیسی، تأیید رسمی پیدا نشد).")],
    ["800.116.800",tr("شماره ACI مخصوص رانندگانی که سیم‌کارت خارجی دارند."),tr("مخصوص خارجی‌هاست، ولی فهرست رسمی زبان‌هایش پیدا نشد.")],
    ["+39 02 66165116",tr("شماره ACI برای تماس از خارج از ایتالیا."),tr("ایتالیایی (برای انگلیسی، تأیید رسمی پیدا نشد).")],
    ["803.803",tr("امداد خودرو یوروپ اسیستنس. در کل شبکه اتوبان‌های «اوتوسترادِ پر ایتالیا» مجاز است."),tr("ایتالیایی (برای انگلیسی، تأیید رسمی پیدا نشد).")],
    ["800.108.108",tr("امداد خودرو تله‌پس، فقط برای مشتری‌های تله‌پس."),tr("ایتالیایی (برای انگلیسی، تأیید رسمی پیدا نشد).")],
    [tr("ستون‌های SOS"),tr("ستون‌های SOS کنار اتوبان را هم می‌شود برای کمک استفاده کرد (اگر بخش صوتی داشته باشند)."),tr("ایتالیایی (برای انگلیسی، تأیید رسمی پیدا نشد)."), "nocall"],
  ]],
  [I.pin + tr("اطلاعات جاده و ترافیک"), "", [
    ["1518",tr("مرکز اطلاعات ترافیک دولت ایتالیا (CCISS). رایگان و شبانه‌روزی، برای وضعیت ترافیک همه جاده‌ها و اتوبان‌ها."),tr("ایتالیایی (برای انگلیسی، تأیید رسمی پیدا نشد).")],
    ["803.111",tr("شماره واحد «اوتوسترادِ پر ایتالیا». رایگان، برای ترافیک اتوبان‌ها و عوارضی پرداخت‌نشده. شماره قدیمی ۸۴۰.۰۴.۲۱.۲۱ دیگر فعال نیست."),tr("ایتالیایی (برای انگلیسی، تأیید رسمی پیدا نشد).")],
    ["800.841.148",tr("پرونتو آناس، برای جاده‌های اصلی دولتی. شبانه‌روزی، حتی روزهای تعطیل. برای اطلاعات ترافیک و گزارش خطر در جاده."),tr("ایتالیایی (برای انگلیسی، تأیید رسمی پیدا نشد).")],
  ]],
  [I.plus + tr("کمک پزشکی غیر اورژانسی"), "", [
    ["116117",tr("پزشک کشیک شب و آخر هفته (گواردیا مدیکا). معمولاً روزهای کاری از ساعت ۲۰ تا ۸ صبح و آخر هفته از شنبه ساعت ۸ تا دوشنبه ساعت ۸. هنوز همه‌جا فعال نیست؛ اگر کار نکرد، شماره منطقه‌تان را از سایت ASL پیدا کنید."),tr("ایتالیایی. در بعضی منطقه‌ها چندزبانه است (مثلاً توسکانا).")],
  ]],
  [I.info + tr("اپلیکیشن مفید"), "", [
    [tr("اپ 112 Where ARE U"),tr("با این اپ با ۱۱۲ تماس می‌گیرید و موقعیت دقیق شما خودکار برای مرکز اورژانس فرستاده می‌شود. در منطقه‌هایی کار می‌کند که مرکز واحد ۱۱۲ فعال است."),tr("همان مرکز ۱۱۲ با مترجم جواب می‌دهد؛ لازم نیست آدرس را به ایتالیایی توضیح دهید."), "nocall"],
  ]],
];

function vSos(){
  const row = ([n, d, lang, flag]) => `<div class="sos"><div class="tx"><div class="num">${n}</div><div class="d">${d}</div><div class="lang">${tr("زبان:")} ${lang}</div></div>
    ${flag === "nocall" ? "" : `<a class="call" href="tel:${n.replace(/[^+\d]/g, "")}" aria-label="${tr("تماس با")} ${n}">${I.phone}</a>`}</div>`;
  return `<div class="navbar solid" data-title="${tr("شماره‌های ضروری")}"><button class="navbtn" data-back="tools">${I.back}<span>${tr("ابزارها")}</span></button><span class="ttl">${tr("شماره‌های ضروری")}</span><span class="navbtn end"></span></div>
  <div class="large" style="padding-top:8px">${tr("شماره‌های ضروری")}</div>
  <div class="subhead">${tr("همه‌ی شماره‌هایی که تو جاده لازم داری. روی دکمه‌ی سبز بزن تا زنگ بزنی.")}</div>
  <div class="section"><div class="sos-hero"><b>112</b><p>${tr("تصادف، آتش، زخمی یا خطر؟")}<br>${tr("اول این شماره.")}</p><a href="tel:112">${tr("تماس")}</a></div></div>
  ${SOS.map(([h, sub, items]) => `<div class="section"><div class="sec-h"><h3>${h}</h3>${sub ? `<span class="foot" style="padding:0">${sub}</span>` : ""}</div>
    <div class="group">${items.map(row).join("")}</div></div>`).join("")}
  <div class="section"><div class="card tip"><div class="ti">${I.bulb}</div><p><b>${tr("قانون ساده:")}</b> ${tr("تصادف، آتش، زخمی یا خطر: ۱۱۲ · خرابی ماشین: ۸۰۳.۱۱۶ · اطلاعات ترافیک: ۱۵۱۸")}<br>${tr("مراقب سایت‌های تقلبی امداد خودرو با نام ACI باشید؛ فقط aci.it و acimobility.it رسمی‌اند.")}</p></div>
  <div class="foot">${tr("به‌روز شده: ۲۲ نوامبر ۲۰۲۶. شماره‌ها از سایت‌های رسمی چک شده‌اند.")}</div></div>
  ${tabbar("tools")}`;
}

const VIEWS = { welcome:vWelcome, features:vFeatures, setup:vSetup, notify:vNotify, home:vHome, garage:vGarage, add:vGarage, detail:vDetail, tools:vTools, bollo:vBollo, insurance:vInsurance, quote:vQuote, profile:vProfile, sos:vSos };

