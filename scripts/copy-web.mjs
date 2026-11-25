// Copies the web app (the files GitHub Pages serves) into www/,
// the folder Capacitor puts inside the iOS and Android apps.
// We copy instead of moving, so GitHub Pages keeps working from the repo root.
import { rmSync, mkdirSync, copyFileSync, cpSync } from "node:fs";

const FILES = ["index.html", "manifest.webmanifest", "sw.js", "icon-180.png", "icon-192.png", "icon-512.png"];

rmSync("www", { recursive: true, force: true });
mkdirSync("www");
for (const f of FILES) copyFileSync(f, `www/${f}`);
cpSync("data", "www/data", { recursive: true });   // bollo rates and other data files
cpSync("fonts", "www/fonts", { recursive: true }); // Vazirmatn font (works offline)
cpSync("i18n", "www/i18n", { recursive: true });   // languages: fa, it, en
cpSync("css", "www/css", { recursive: true });     // styles
cpSync("js", "www/js", { recursive: true });       // app code
console.log(`Copied ${FILES.length} files, data/, fonts/, i18n/, css/ and js/ into www/`);
