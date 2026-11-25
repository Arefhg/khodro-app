// Every text the app shows has an Italian and an English translation, and no translation is left unused.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

test("translations are complete", () => {
  const out = execFileSync("node", ["scripts/i18n-keys.mjs"]).toString();
  for (const l of ["it", "en"]) assert.match(out, new RegExp(`${l}: (\\d+)/\\1 translated, 0 missing, 0 unused`), out);
});
