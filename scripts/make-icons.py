# Makes every app icon and splash screen for iOS and Android from ONE picture.
#
#   python3 scripts/make-icons.py
#
# Source: assets/icon-1024.png if it exists (best), otherwise icon-512.png (scaled up, a bit soft).
# Run it again whenever the icon changes, then commit the results.
from pathlib import Path
from PIL import Image, ImageDraw

SRC = Path("assets/icon-1024.png") if Path("assets/icon-1024.png").exists() else Path("icon-512.png")
ICON_BG = "#1B1C20"      # dark color behind the icon on Android
SPLASH_BG = (242, 242, 247)  # same light gray as the app background (#F2F2F7)

icon = Image.open(SRC).convert("RGB")
big = icon.resize((1024, 1024), Image.LANCZOS)

# ---- iOS: one 1024x1024 icon, no transparency (Apple rule) ----
big.save("ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png")

# ---- Android ----
RES = Path("android/app/src/main/res")
SIZES = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
for dpi, s in SIZES.items():
    d = RES / f"mipmap-{dpi}"
    square = icon.resize((s, s), Image.LANCZOS)
    square.save(d / "ic_launcher.png")
    # round icon: same picture cut into a circle
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, s - 1, s - 1), fill=255)
    rnd = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    rnd.paste(square, (0, 0), mask)
    rnd.save(d / "ic_launcher_round.png")
    # adaptive icon (Android 8+): foreground is 108dp; the phone cuts the edges with its own shape
    f = int(s * 108 / 48)
    icon.resize((f, f), Image.LANCZOS).save(d / "ic_launcher_foreground.png")
(RES / "values/ic_launcher_background.xml").write_text(
    f'<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">{ICON_BG}</color>\n</resources>\n'
)

# ---- Splash screens: light gray with the icon in the middle ----
def splash(w, h):
    img = Image.new("RGB", (w, h), SPLASH_BG)
    s = int(min(w, h) * 0.22)
    small = icon.resize((s, s), Image.LANCZOS)
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, s - 1, s - 1), radius=int(s * 0.22), fill=255)
    img.paste(small, ((w - s) // 2, (h - s) // 2), mask)
    return img

for f in Path("ios/App/App/Assets.xcassets/Splash.imageset").glob("*.png"):
    splash(2732, 2732).save(f)
for f in RES.glob("drawable*/splash.png"):
    w, h = Image.open(f).size
    splash(w, h).save(f)

print(f"Icons and splash screens made from {SRC}")
