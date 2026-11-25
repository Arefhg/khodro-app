// Bollo math, checked against the official 2026 rate sheets (see docs/BOLLO_SOURCES.md).
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadCalcBollo } from "./helpers.mjs";

const calcBollo = await loadCalcBollo();
const CASES = [
  // [kind, kW, Euro, region, expected €, why]
  ["car", 70, 6, "کامپانیا", 218.40, "Campania Euro 6: 70 × 3.12"],
  ["car", 110, 6, "کامپانیا", 358.90, "guide example: 100 × 3.12 + 10 × 4.69"],
  ["car", 70, 6, "لاتزیو", 198.80, "Lazio: 70 × 2.84"],
  ["car", 70, 6, "ونتو", 198.80, "Veneto: 70 × 2.84"],
  ["car", 70, 6, "لمباردیا", 180.60, "Lombardia: 70 × 2.58"],
  ["car", 70, 6, "مارکه", 195.30, "Marche: 70 × 2.79"],
  ["car", 70, 6, "توسکانا", 189.70, "Toscana: 70 × 2.71"],
  ["car", 100, 6, "بولزانو", 196.00, "Bolzano Euro 6: 100 × 1.96"],
  ["car", 100, 5, "ترنتو", 206.00, "Trento Euro 5: 100 × 2.06"],
  ["car", 60, 6, "پیمونته", 163.80, "Piemonte 54–100 kW: 60 × 2.73"],
  ["car", 50, 6, "پیمونته", 129.00, "Piemonte up to 53 kW: 50 × 2.58"],
  ["car", 120, 6, "پیمونته", 362.60, "Piemonte 101–130 kW: 100 × 2.79 + 20 × 4.18"],
  ["car", 58.9, 6, "لمباردیا", 149.64, "kW without decimals: 58 × 2.58"],
  ["car", 200, 6, "کامپانیا", 1081.00, "312 + 100 × 4.69 + superbollo 15 × 20"],
  ["car", 70, 0, "کامپانیا", 254.10, "Campania Euro 0: 70 × 3.63"],
  ["moto", 9, 5, "کامپانیا", 23.12, "Campania motorbike up to 11 kW, Euro 3+"],
  ["moto", 33, 4, "لمباردیا", 48.15, "Lombardia: 19.11 + 0.88 × 33 (all kW)"],
  ["moto", 9, 4, "لمباردیا", 20.00, "Lombardia up to 11 kW, Euro 3+: 20.00"],
  ["moto", 20, 5, "لیگوریا", 40.42, "Liguria: 21.02 + 0.97 × 20"],
];
for (const [kind, kw, euro, region, expected, why] of CASES) {
  test(why, () => assert.equal(calcBollo(kind, kw, euro, region).total, expected));
}
test("every region has 7 car rates and 4 motorbike rates", async () => {
  for (const [name, r] of Object.entries(window.BOLLO.regions)) {
    assert.equal(r.car.length, 7, name); assert.equal(r.moto.length, 4, name); assert.ok(r.src, name + " has a source");
  }
});
