# CLAUDE.md: Daily Health Ledger (public repo)

## What this is
A free, open-source, installable web app (PWA) for daily health logging on Mac, iPhone and iPad. It was generalized in Nov 2026 from Charles Whatley's personal tracker. **This repo must never contain personal health data.**

## Layout
- `app/index.html`: the whole app (HTML + CSS + JS, about 1,800 lines, no build step, no dependencies)
- `app/sw.js`: offline service worker. **Bump `VERSION` on every release** or installed apps keep the old copy.
- `app/manifest.webmanifest`, `app/icons/`, `app/fonts/` (self-hosted OFL fonts; no third-party requests allowed)
- `docs/`: clinician brief and patient setup guide (Word + PDF)
- `pilot/`: 30-day pilot plan and feedback form
- `.github/workflows/pages.yml` deploys `app/` to GitHub Pages; `release.yml` attaches a ZIP to `v*` tags
- `tools/set-github-user.sh`: replaces the `OWNER` placeholder

## How the JS is organized
`index.html` has a base app plus a chain of `<script>` modules that wrap `load`, `save`, `renderAll` and renderers (pattern: `const _x=x; x=function(){ _x(); ... }`). Key modules, in order:
1. MEDICINE DATA: empty `MEDS`, `GUIDE`, `CROSS` shells
2. STATE / HELPERS / NAV / MORNING / MEDICINES / MEALS / EXERCISE / SETTINGS / CHARTS / DASHBOARD / INIT (base)
3. Iterations: other readings, sodium + Go To Meals, Notes, Reading List, Found Articles, bathroom trips, nutrition, label entry
4. IN-PAGE DIALOGS: `uiConfirm`, `uiPrompt` (supports `value`), `uiAlert`, `uiShowText`; doctor-visit report
5. DEVICE SYNC THROUGH A FILE: `S._mt` per-key/per-day modification times; `merge()` = newer wins, id-lists unioned, same-day fields merged; optional File System Access auto-sync (Chrome/Edge)
6. USER MEDICINES: `S.medList` `{id,name,dose,slot:'AM'|'PM',from,to,purpose,how,caut}`; `medsOn(date)`; editor on Settings tab; "Change dose" ends old entry yesterday, starts new today
7. FIRST-RUN SETUP: welcome + disclaimer, owner name, service-worker registration

Storage key: `localStorage['dailyHealthLedger.v1']`. Never rename it (users would lose data).

## Working rules (Charles's Better Workflow)
- Use an HTML parser (BeautifulSoup) for structural edits, not regex
- One change per iteration; after each: validate div/section balance, ID uniqueness, `node --check` on every inline script
- Keep checkpoints and diffs; report changes with sample diffs
- Write large files in ~150-line chunks
- Test in a real browser (Playwright): first run, add medicine, log, two-device sync merge, reload persistence, no console errors
- Prose style: active voice, no em-dashes, plain language for patients

## Guardrails
- No drug-interaction database, dosing logic, or clinical advice in the app. Users enter their own notes. Keep the disclaimer.
- No analytics, external fonts, CDNs, or network calls with user data.
- Release checklist: bump `sw.js` VERSION, update CHANGELOG, tag `vX.Y.Z`, push tag.
