# OPD LoggerX — Android APK via Capacitor + GitHub Actions

This repo packages the existing PWA into a native Android APK.

## Local prerequisites
- Node.js ≥ 18
- Java 17
- Android Studio (for local builds)

## Quick start (local)
```bash
npm ci
npm run prepare:www
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

## GitHub Actions build
1. Push this repo to GitHub.
2. The workflow `.github/workflows/android-apk.yml` runs on every push to `main/master` or manually (`Run workflow`).
3. After it finishes, download artifacts:
   - `app-debug.apk` (installable, debug)
   - `app-release-unsigned.apk` (needs signing)

## App identifiers
- **appId**: `com.opd.loggerx`
- **appName**: `OPD LoggerX`

## Web assets
`npm run prepare:www` copies these files into `www/`:
- `index.html`, `styles.css`, `app.js`, `service-worker.js`, `manifest.webmanifest`
- everything in `assets/` (if present)

You can add your icons to `assets/` and reference them in the manifest.

## Notes
- In native builds, Capacitor injects the bridge automatically. Your `app.js` already detects `window.Capacitor`.
- Export (CSV/XLS) uses Capacitor Filesystem & Share if available; otherwise falls back to web sharing.
- For release signing, create a keystore and add signing steps or use Play App Signing. The workflow currently uploads **unsigned** release APK.
