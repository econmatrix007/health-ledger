# Daily Health Ledger

A private, free daily log for **weight, blood pressure, pulse, oxygen (SpO₂), medicines, fluids, food and exercise**, with trend charts and a report you can print for appointments. It runs on **Mac, iPhone and iPad** as an installable web app, and your data never leaves your devices.

**Open the app:** https://econmatrix007.github.io/health-ledger/

> **Not medical advice.** This is a personal record-keeping tool, not a medical device. It does not diagnose or treat anything, and alert thresholds are reminders, not clinical judgments. Follow your care team's instructions. In an emergency, call 911. See [DISCLAIMER.md](DISCLAIMER.md).

## What it does

| Tab | Purpose |
|---|---|
| Dashboard | Today's numbers, alerts against your thresholds, and 7/30/90-day trends |
| Morning Check-in | Weight, BP, pulse and SpO₂ in a consistent routine, with a 15-minute recheck timer, symptoms, and other readings |
| Medicines | Tick off each dose; a 14-day adherence grid |
| Meals & Fluids | Fluid intake against a daily limit; meals with optional sodium, calories, carbs, fiber, protein, saturated fat and potassium |
| Go To Meals | Your own recipe library with per-serving nutrition |
| Exercise | Sessions, effort (RPE), and weekly minutes against a month-by-month plan |
| Medicine Guide | Your own notes on each medicine and general cautions from your care team |
| Notes, Reading List, Found Articles | Questions for your next visit, visit notes, and reading |
| Settings & Data | Your medicines, thresholds, sync, backup, CSV export, doctor-visit report |

## Install it

**iPhone or iPad (Safari):** open the link above, tap **Share**, then **Add to Home Screen**.
**Mac (Safari, macOS Sonoma or later):** open the link, then choose **File › Add to Dock**.
**Mac (Chrome or Edge):** open the link and click the install icon in the address bar.

The installed app opens without an internet connection.

## Use it on more than one device

The ledger saves in the browser on each device. A **sync file** in iCloud Drive carries your data between devices:

1. Create a folder in iCloud Drive named **Health Ledger**.
2. When you finish logging on one device: **Settings & Data › Save sync file** into that folder.
3. Before you log on another device: **Load sync file** from the same folder. Loading **merges**, so nothing on the second device is lost.
4. On a Mac in Chrome or Edge, **Link a sync file** once and it reads and writes automatically.

The full patient guide is in [docs/patient-setup-guide.pdf](docs/patient-setup-guide.pdf).

## Privacy

There is no server, no account, no analytics, and no tracking. The app's files come from GitHub Pages; your entries stay in your browser and in any sync or backup files you save yourself. See [PRIVACY.md](PRIVACY.md).

## For clinicians

A one-page brief is in [docs/clinician-brief.pdf](docs/clinician-brief.pdf). Patients can bring a printed report (Settings & Data › Doctor-visit report) or a CSV export to appointments.

## Download the code

* **Latest release:** [Releases](https://github.com/econmatrix007/health-ledger/releases) has a ZIP of the app. Unzip it and serve the `app` folder from any static web host.
* **Clone:** `git clone https://github.com/econmatrix007/health-ledger.git`

The app is one HTML file (`app/index.html`) with no build step and no dependencies. To run it locally on a Mac:

```bash
cd health-ledger/app
python3 -m http.server 8000
# then open http://localhost:8000 in Safari or Chrome
```

## Support the project

The Daily Health Ledger is free and always will be. If it helps you, you can [sponsor it on GitHub](https://github.com/sponsors/econmatrix007). Donations are gifts to the developer: they are **not tax-deductible** and do not buy support, features, or medical services.

## License

MIT. See [LICENSE](LICENSE). Fonts: Goldman and Source Serif 4, SIL Open Font License (`app/fonts`).
