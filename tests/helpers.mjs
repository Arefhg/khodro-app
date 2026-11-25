// Shared helpers for the tests (no extra packages needed except Playwright for the screen tests).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json",
  ".css": "text/css", ".png": "image/png", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json" };

// A tiny web server for the repo folder, on a free port.
export function startServer(root = ".") {
  return new Promise((resolve) => {
    const srv = createServer(async (req, res) => {
      const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
      const file = join(root, path.endsWith("/") ? path + "index.html" : path);
      try {
        const body = await readFile(file);
        res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" }); res.end(body);
      } catch { res.writeHead(404); res.end(); }
    });
    srv.listen(0, "127.0.0.1", () => resolve({ url: `http://127.0.0.1:${srv.address().port}/`, close: () => srv.close() }));
  });
}

// Loads calcBollo() from js/bollo.js so its math can be tested without a browser.
export async function loadCalcBollo() {
  globalThis.window = {};
  await import("../data/bollo-2026.js?" + Date.now());
  const BOLLO = window.BOLLO;
  const html = readFileSync("js/bollo.js", "utf8") + "\n";
  const start = html.indexOf("function calcBollo(");
  const end = html.indexOf("\n}\n", start) + 2;
  const FA = (s) => String(s), EUR = (n) => n.toFixed(2), tr = (s) => s;
  return new Function("BOLLO", "FA", "EUR", "tr", html.slice(start, end) + "\nreturn calcBollo;")(BOLLO, FA, EUR, tr);
}
