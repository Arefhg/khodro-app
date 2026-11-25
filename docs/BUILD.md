# Build and publish the store apps (iOS first)

The store apps use **Capacitor**. It puts the same web app (`index.html`) inside a real
iOS app and a real Android app, so they look exactly like the web app.

```
index.html, icons…  ──(npm run sync)──►  www/  ──►  ios/App/App/public/        (iPhone app)
                                              └──►  android/app/src/main/assets/public/  (Android app)
```

You keep editing the web app as always. Before a store build, run `npm run sync`.

Facts checked on 23 Nov 2026:
- iOS builds need a Mac (macOS) — Capacitor docs.
- Apple requires Xcode 26 and the iOS 26 SDK for App Store uploads.
- Apple Developer Program: 99 USD per year (apps leave the store if you stop paying).
- Google Play: 25 USD one time. Personal accounts must pass a testing period with testers before going public.

---

## Part A – One-time setup

### A1. Accounts
1. Apple: go to developer.apple.com → Account → enroll in the Apple Developer Program (99 USD/year).
2. Google (later, for Android): go to play.google.com/console → sign up (25 USD once).

### A2. A Mac
Option 1 – your own Mac:
1. Open the App Store on the Mac, install **Xcode** (version 26 or newer).
2. Open Xcode once and accept the license.
3. Install **Node.js** (LTS) from nodejs.org.
4. Install **Git** (Xcode installs it, or from git-scm.com).

Option 2 – no Mac: a cloud build service that rents a Mac (for example Capawesome Cloud,
Capgo Build, Ionic Appflow, or Codemagic). Their steps are different; we write them when we pick one.

### A3. Get the code on the Mac
```
git clone https://github.com/Arefhg/khodro-app.git
cd khodro-app
npm install
```

---

## Part B – Build the iPhone app

1. Get the newest code and copy the web app into the projects:
   ```
   git pull
   npm run sync
   ```
2. Open the iOS project in Xcode:
   ```
   npm run open:ios
   ```
3. In Xcode, left panel → click **App** (blue icon) → **Signing & Capabilities**:
   - Team: choose your Apple Developer account.
   - Bundle Identifier: `com.arefhg.khodroitaly` (do not change it after the first upload).
4. Try it on your iPhone: connect the iPhone with a cable, pick it at the top of Xcode, press ▶.
   (The first time, the iPhone asks you to trust the developer: Settings → General → VPN & Device Management.)
5. Set the version: **General** tab → Version (for example 1.0) and Build (1, 2, 3… must go up every upload).
6. Make the upload file: top menu **Product → Archive**. When it finishes, the Organizer window opens.
7. In Organizer → **Distribute App** → **App Store Connect** → Upload.

## Part C – Publish on the App Store

1. Go to appstoreconnect.apple.com → **Apps** → **+** → New App.
   - Platform iOS, name «خودرو ایتالیا», language Persian, bundle ID `com.arefhg.khodroitaly`.
2. **TestFlight** tab: your uploaded build shows here after Apple processes it. Install the
   TestFlight app on your iPhone and test the real store build.
3. **App Store** tab: fill in description, keywords, screenshots, category, age rating, support URL.
   - Privacy policy link: NOT CONFIRMED whether required for this app — check what App Store Connect asks.
4. Press **Add for Review** → **Submit**.

⚠️ Review risk – Guideline 4.2 (Minimum Functionality): Apple rejects apps that feel like
"a repackaged website". Our main phone feature: real bollo/insurance/revisione reminders
(local notifications, scheduled on the phone).

### First-build checklist (test these on the real phone)
1. The app opens full screen, Persian, right to left.
2. Add a vehicle with a date about 4 days from now → you are asked for notification permission.
3. Settings → reminders switch off/on works.
4. Tip to test fast: set a date 3 days from today; the "3 days" reminder comes tomorrow… or today if it's
   before 9:00. (The code reads the plugin from `window.Capacitor.Plugins.LocalNotifications`;
   if reminders never come, check the Xcode console for "reminders:" errors.)
5. Tap-to-call numbers and Telegram links open the phone app / Telegram.
6. Languages: first screen and Settings → Persian (right to left), Italiano, English (left to right).
   Change the iPhone language to Italian: on a fresh install the app should start in Italian.
7. Garage → a vehicle → Modifica/ویرایش: change a date, save; then delete it.

### App name per language on iPhone (do once, in Xcode)
Android already shows «خودرو ایتالیا» in Persian and «Khodro Italia» in Italian/English.
On iPhone the name under the icon is «خودرو ایتالیا» for everyone until you do this:
1. Xcode → File → New → File… → **Strings File**, name it `InfoPlist.strings`, add it to the App target.
2. Select it → right panel → **Localize…** → tick Persian, Italian, English.
3. In the Persian file write `"CFBundleDisplayName" = "خودرو ایتالیا";`,
   in Italian and English write `"CFBundleDisplayName" = "Khodro Italia";`.
(Editing Xcode's project file by hand can break it, so this step is done in Xcode.)

### Version numbers (already set for the first upload)
- App: 1.0 (Settings), Xcode: Version 1.0 / Build 1, Android: versionName 1.0 / versionCode 1.
- Every new upload: raise Build (Xcode) and versionCode (Android) by 1.

---

## Part D – Android (later)

Works on Windows too.
1. Install **Android Studio** (it includes the Android SDK and Java).
2. `git pull`, `npm install`, `npm run sync`, then `npm run open:android`.
3. Press ▶ to run on a phone or emulator.
4. For the store: **Build → Generate Signed App Bundle** → make a key (keep it safe forever,
   you need the same key for every update) → upload the `.aab` file in Play Console.

---

## Store screenshots and text
- Text for App Store Connect: `store/LISTING.md` (Italian and English pages, privacy answers).
- Screenshots: `store/screenshots/iphone-6.9/fa|it|en/` (1320 × 2868, 5 per language). To retake them:
  `python3 -m http.server 8771 &` then `python3 scripts/store-screenshots.py`.
- Privacy policy page (required by Apple): `privacy.html` → https://arefhg.github.io/khodro-app/privacy.html

## Changing the icon
1. Put a sharp 1024×1024 PNG (no transparency) at `assets/icon-1024.png`.
2. Run `python3 scripts/make-icons.py` (needs Python with Pillow: `pip install pillow`).
3. Commit the changed files.

Right now the icons are made from `icon-512.png` scaled up, so they are a bit soft.
Make a real 1024 icon before publishing.
