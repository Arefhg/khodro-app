# Takes the App Store screenshots (iPhone 6.9", 1320 x 2868) with sample vehicles.
#
#   python3 -m http.server 8771 &          (in the repo folder)
#   python3 scripts/store-screenshots.py          (all languages: fa, it, en)
#
# Needs: pip install playwright && playwright install chromium
import datetime as dt, json
from playwright.sync_api import sync_playwright

import os
OUT = "store/screenshots/iphone-6.9"
day = lambda n: (dt.date.today() + dt.timedelta(days=n)).isoformat() + "T11:00:00Z"
cars = [
    {"id": 1764000000001, "kind": "car", "name": "Fiat Panda", "year": 2019, "plate": "GH 482 KT", "fuel": "", "kw": 51, "euro": 6,
     "color": "#1F2937", "dl": {"bollo": day(12), "insurance": day(41), "revisione": day(118)}},
    {"id": 1764000000002, "kind": "moto", "name": "Honda SH 125", "year": 2021, "plate": "FX 19284", "fuel": "", "kw": 11, "euro": 5,
     "color": "#B91C1C", "dl": {"insurance": day(6), "bollo": day(70)}},
]
state = json.dumps({"seen": True, "region": "کامپانیا", "notify": True, "cars": cars})
SHOTS = [
    ("1-home", "go('home')", None),
    ("2-garage", "go('garage')", None),
    ("3-bollo", "go('bollo')", "(()=>{const v=document.querySelector('.view'), e=v.querySelector('.euro').closest('.section'); v.scrollTop=e.offsetTop-120})()"),
    ("4-detail", "state.detail=1764000000001; go('detail')", None),
    ("5-sos", "go('sos')", None),
]
with sync_playwright() as p:
  b = p.chromium.launch()
  for lang in ["fa", "it", "en"]:
    os.makedirs(f"{OUT}/{lang}", exist_ok=True)
    init = f"localStorage.setItem('ki_lang','{lang}'); localStorage.setItem('ki_state', JSON.stringify({state}))"
    for name, open_screen, scroll in SHOTS:
        pg = b.new_page(viewport={"width": 440, "height": 956}, device_scale_factor=3)   # 440 x 956 points x 3 = 1320 x 2868 px
        pg.add_init_script(init)
        pg.goto("http://localhost:8771/"); pg.wait_for_timeout(900)
        pg.evaluate(open_screen); pg.wait_for_timeout(700)
        if scroll: pg.evaluate(scroll); pg.wait_for_timeout(300)
        pg.screenshot(path=f"{OUT}/{lang}/{name}.png"); print("saved", lang, name)
  b.close()
