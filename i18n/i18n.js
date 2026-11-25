// Languages: Persian (fa, right to left), Italian (it) and English (en), left to right.
//
// How it works (the "gettext" way): the Persian sentence in the code is the key.
//   tr("خانه")  → "خانه" in Persian, "Home" in English and Italian
// Translations live in i18n/it.js and i18n/en.js as { "Persian text": "translation" }.
// A missing translation shows the Persian text (and is listed by I18N.missing() in the console).
//
// Load order in index.html: i18n.js → it.js → en.js → app.
(function () {
  const LANGS = ["fa", "it", "en"];
  const NAMES = { fa: "فارسی", it: "Italiano", en: "English" };

  // 1) saved choice, 2) the phone's language, 3) Persian
  let lang = null;
  try { lang = localStorage.getItem("ki_lang"); } catch (e) {}
  if (!LANGS.includes(lang)) {
    const dev = (navigator.language || "fa").slice(0, 2).toLowerCase();
    lang = LANGS.includes(dev) ? dev : "fa";
  }

  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "fa" ? "rtl" : "ltr";

  const dict = {};          // filled by it.js and en.js
  const missing = new Set();

  function t(s) {
    if (lang === "fa" || s == null) return s;
    const d = dict[lang] || {};
    if (Object.prototype.hasOwnProperty.call(d, s)) return d[s];
    missing.add(s);
    return s;
  }

  function setLang(l) {
    if (!LANGS.includes(l)) return;
    try { localStorage.setItem("ki_lang", l); } catch (e) {}
    location.reload();                       // simplest and safest: draw everything again
  }

  window.I18N = {
    lang, LANGS, NAMES, dict, setLang,
    rtl: lang === "fa",
    add(l, entries) { dict[l] = Object.assign(dict[l] || {}, entries); },
    missing: () => [...missing],
    // Intl locales for numbers and dates (Gregorian calendar in every language)
    locale: { fa: "fa-IR-u-ca-gregory-nu-arabext", it: "it-IT", en: "en-GB" }[lang],
  };
  window.tr = t;           // the app calls tr("…") (t is used as a local name in places)
})();
