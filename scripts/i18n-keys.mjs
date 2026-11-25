// Lists every text the app translates, and which ones are missing in it.js / en.js.
//   node scripts/i18n-keys.mjs
import { readFileSync, readdirSync } from "node:fs";
// the app code: index.html + every file in js/
const html = ["index.html", ...readdirSync("js").filter((f) => f.endsWith(".js")).map((f) => "js/" + f)].map((f) => readFileSync(f, "utf8")).join("\n");
const keys = new Set();
for (const m of html.matchAll(/\btr\((["'])((?:\\.|(?!\1).)*)\1[,)]/g)) keys.add(JSON.parse('"' + m[2].replace(/\\'/g, "'").replace(/"/g, '\\"') + '"'));
// data shown through tr(): bollo region names and notes
globalThis.window = {}; await import("../data/bollo-2026.js");
for (const [name, r] of Object.entries(window.BOLLO.regions)) { keys.add(name); if (r.note) keys.add(r.note); }
globalThis.I18N = { dict: {}, add(l, e) { this.dict[l] = { ...(this.dict[l] || {}), ...e }; } };
await import("../i18n/it.js"); await import("../i18n/en.js");
for (const l of ["it", "en"]) {
  const d = I18N.dict[l] || {}, miss = [...keys].filter((k) => !(k in d)), extra = Object.keys(d).filter((k) => !keys.has(k));
  console.log(`${l}: ${keys.size - miss.length}/${keys.size} translated, ${miss.length} missing, ${extra.length} unused`);
  if (process.argv[2] === "--list" ) miss.forEach((k) => console.log("  " + JSON.stringify(k)));
}
if (process.argv[2] === "--json") console.log(JSON.stringify([...keys]));
