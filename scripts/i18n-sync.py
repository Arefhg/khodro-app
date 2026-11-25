# Adds new translations and removes unused ones from i18n/it.js and i18n/en.js.
# usage: python3 scripts/i18n-sync.py '{"persian": ["italian","english"], ...}'  → adds new, drops unused
import json, subprocess, sys, re
new = json.loads(sys.argv[1]) if len(sys.argv) > 1 else {}
keys = json.loads(subprocess.check_output(["node", "scripts/i18n-keys.mjs", "--json"]).decode().strip().splitlines()[-1])
for li, lang in [(0, "it"), (1, "en")]:
    path = f"i18n/{lang}.js"; src = open(path).read()
    entries = dict(re.findall(r'^  ("(?:[^"\\]|\\.)*"): ("(?:[^"\\]|\\.)*"),$', src, re.M))
    d = {json.loads(k): json.loads(v) for k, v in entries.items()}
    for k, v in new.items(): d[k] = v[li]
    head = src[:src.index("I18N.add(")]
    body = "".join(f"  {json.dumps(k, ensure_ascii=False)}: {json.dumps(d[k], ensure_ascii=False)},\n" for k in keys if k in d)
    open(path, "w").write(head + f'I18N.add("{lang}", {{\n' + body + "});\n")
print(subprocess.check_output(["node", "scripts/i18n-keys.mjs"]).decode())
