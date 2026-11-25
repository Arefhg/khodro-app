// Opens every screen in Persian, Italian and English in a real browser:
// no JavaScript errors and no untranslated text. Also tests the main user flows.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startServer } from "./helpers.mjs";

const day = (n) => new Date(Date.now() + n * 864e5).toISOString();
const CARS = [
  { id: 1764000000001, kind: "car", name: "Fiat Panda", year: 2019, plate: "GH 482 KT", kw: 51, euro: 6, color: "#1F2937",
    dl: { bollo: day(12), insurance: day(41), revisione: day(118) } },
  { id: 1764000000002, kind: "moto", name: "Honda SH 125", year: 2021, plate: "FX 19284", kw: 11, euro: 5, color: "#B91C1C",
    dl: { insurance: day(6), bollo: day(70) } },
];
const SCREENS = ["welcome", "features", "setup", "notify", "home", "garage", "detail", "tools", "bollo", "insurance", "quote", "sos", "profile"];
let server, browser;
before(async () => {
  server = await startServer();
  browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
});
after(async () => { await browser?.close(); server?.close(); });

async function openApp(lang, cars = CARS) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("dialog", (d) => d.accept());
  await page.addInitScript(([l, s]) => { if (!sessionStorage.t) { sessionStorage.t = 1; localStorage.setItem("ki_lang", l); localStorage.setItem("ki_state", s); } },
    [lang, JSON.stringify({ seen: true, region: "کامپانیا", notify: true, cars })]);
  await page.goto(server.url);
  await page.waitForFunction(() => typeof current !== "undefined");
  return { page, errors };
}

for (const lang of ["fa", "it", "en"]) {
  test(`all screens open without errors or missing text (${lang})`, async () => {
    const { page, errors } = await openApp(lang);
    for (const sc of SCREENS) await page.evaluate((s) => { state.detail = 1764000000001; go(s); }, sc);
    assert.deepEqual(errors, []);
    assert.deepEqual(await page.evaluate(() => I18N.missing()), []);
    assert.equal(await page.evaluate(() => document.documentElement.dir), lang === "fa" ? "rtl" : "ltr");
    await page.close();
  });
}

test("add, edit, 'I paid it' and delete a vehicle", async () => {
  const { page, errors } = await openApp("en", []);
  await page.evaluate(() => go("garage"));
  await page.click(".empty-add");
  await page.fill(".sheet.on [data-f=name]", "Fiat <500>");
  await page.fill(".sheet.on [data-f=kw]", "51");
  await page.fill(".sheet.on [data-f=bollo]", day(10).slice(0, 10));
  await page.click(".sheet.on .btn.fill[data-save]", { force: true });
  assert.equal(await page.evaluate(() => state.cars.length), 1);
  const id = await page.evaluate(() => state.cars[0].id);
  await page.evaluate((i) => { state.detail = i; go("detail"); }, id);
  const before = await page.evaluate(() => new Date(state.cars[0].dl.bollo).getFullYear());
  await page.click("[data-done]");
  assert.equal(await page.evaluate(() => new Date(state.cars[0].dl.bollo).getFullYear()), before + 1, "bollo moved 1 year");
  await page.click("[data-edit]");
  await page.click(".sheet.on [data-del]", { force: true });
  assert.equal(await page.evaluate(() => state.cars.length), 0);
  assert.deepEqual(errors, []);
  await page.close();
});

test("back button goes back one screen, and closes an open form first", async () => {
  const { page } = await openApp("en");
  await page.click("[data-tab=tools]"); await page.click("[data-tool=bollo]");
  await page.goBack(); assert.equal(await page.evaluate(() => current), "tools");
  await page.evaluate(() => { state.detail = 1764000000001; go("detail"); });
  await page.click("[data-edit]");
  await page.goBack();
  assert.equal(await page.locator(".sheet.on").count(), 0); assert.equal(await page.evaluate(() => current), "detail");
  await page.close();
});
