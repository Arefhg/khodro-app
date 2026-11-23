// Copies the web app (the files GitHub Pages serves) into www/,
// the folder Capacitor puts inside the iOS and Android apps.
// We copy instead of moving, so GitHub Pages keeps working from the repo root.
import { rmSync, mkdirSync, copyFileSync } from "node:fs";

const FILES = ["index.html", "manifest.webmanifest", "sw.js", "icon-180.png", "icon-192.png", "icon-512.png"];

rmSync("www", { recursive: true, force: true });
mkdirSync("www");
for (const f of FILES) copyFileSync(f, `www/${f}`);
console.log(`Copied ${FILES.length} files into www/`);
