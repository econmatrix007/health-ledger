// Patient setup guide: install, medicines, settings, daily routine, sync, backup, troubleshooting.
const { d, P, H1, H2, B, NL, box, table, img, doc, save, APP_URL } = require('./common');
const OUT = process.argv[2] || 'patient-setup-guide.docx';
const I = f => __dirname + '/img/' + f;
const side = (left, right) => new d.Table({ width: { size: 9720, type: d.WidthType.DXA }, columnWidths: [4860, 4860],
  borders: d.TableBorders.NONE, rows: [new d.TableRow({ children: [left, right].map(c => new d.TableCell({ width: { size: 4860, type: d.WidthType.DXA }, children: c })) })] });

const body = [
  box(['**Your link:** ' + APP_URL, 'The ledger is free. Your entries stay on your own devices; nobody else can see them unless you show or send them.']),
  P('**Please read.** The Daily Health Ledger is a record-keeping tool, not a medical device. It does not give medical advice. Follow your care team\'s instructions, and **call 911 in an emergency**.', { spacing: { before: 120 } }),

  H1('Step 1. Open and install the app'),
  H2('iPhone or iPad'),
  ...NL(['Open **Safari** and go to the link above.', 'Tap the **Share** button (the square with an arrow pointing up).', 'Scroll down and tap **Add to Home Screen**, then **Add**.', 'Open the ledger from its new icon from now on. It works without an internet connection.']),
  H2('Mac'),
  ...NL(['**Safari** (macOS Sonoma or later): open the link, then choose **File › Add to Dock**.', '**Chrome or Edge:** open the link and click the **install** icon at the right end of the address bar.', 'Open the ledger from the Dock or Launchpad from now on.']),
  box('Each device keeps its own copy. Step 6 shows how to keep them in step.', 'F6EEE8', '800020'),

  H1('Step 2. The welcome screen'),
  P('The first time you open the ledger it explains what the app is and is not. Type your name if you want it on printed reports, choose pounds or kilograms, and tap **I understand: set up my medicines**. (To look around first, choose **Explore with sample data**. Erase the sample later from Settings & Data.)'),
  ...img(I('01-welcome.png'), 5.2, 'The welcome screen and disclaimer.'),

  H1('Step 3. Enter your medicines'),
  P('On **Settings & Data › My medicines**, add each medicine as it appears on the pharmacy label.'),
  B('Pick **Morning** or **Evening**. A twice-daily medicine goes in **twice**: once Morning, once Evening.'),
  B('Open **Notes for the Medicine Guide** to record what your doctor, nurse practitioner, or pharmacist tells you: what it is for, how to take it, and what to watch for.'),
  B('**Dose changed?** Tap **Change dose** on that line. The old dose ends yesterday and the new one starts today, so your history stays correct.'),
  B('**Stopped a medicine?** Tap **Stop** and enter the last day you took it. Use the × only for a mistake.'),
  B('Type any general cautions from your care team (for example, "No ibuprofen") in the box below the list. They appear at the top of the Medicine Guide tab.'),
  ...img(I('02b-med-editor.png'), 6.4, 'My medicines on the Settings & Data tab.'),

  H1('Step 4. Enter your numbers'),
  P('Still on **Settings & Data**, fill in **Targets & alert thresholds** with the numbers your care team gives you, then tap **Save settings**. Your clinician may give you a filled-in settings sheet. The ledger starts with general defaults, which may not be right for you.'),
  table(['Setting', 'My number'], [['Weight gain alert, 1 day / 7 days', ''], ['High BP (top / bottom number)', ''], ['Low BP (top number)', ''], ['Pulse low / high', ''], ['Oxygen (SpO₂) low', ''], ['Fluid limit per day (mL)', ''], ['Sodium target per day (mg)', ''], ['Other targets', '']], [60, 40]),

  H1('Step 5. Your daily routine'),
  side([...img(I('g-iphone-morning.png'), 2.6, 'Morning Check-in on iPhone.')], [...img(I('g-iphone-meds.png'), 2.6, 'Medicines on iPhone.')]),
  ...NL(['**Morning Check-in:** weigh after you get up and use the bathroom, then tap **Save**.',
         '**Medicines:** tick each dose as you take it. The time fills in by itself.',
         '**Blood pressure:** after the wait your care team recommends, sit quietly for 5 minutes, then enter BP, pulse and SpO₂. If it reads high, tap the 15-minute timer and recheck.',
         '**Through the day:** add drinks on **Meals & Fluids**, meals if you track food, and exercise on **Exercise**.',
         '**Notes:** write down symptoms and questions for your next visit as they come up.']),
  P('The **Dashboard** shows today\'s numbers, any alerts, and your trends over 7, 30 or 90 days.'),

  H1('Step 6. Use it on more than one device'),
  P('Your Mac, iPhone and iPad each keep their own copy. A single **sync file** in iCloud Drive carries your entries between them.'),
  H2('One-time setup'),
  ...NL(['On any device, open the **Files** app (iPhone/iPad) or **Finder** (Mac) and go to **iCloud Drive**.', 'Create a folder named **Health Ledger**.', 'Make sure every device is signed in to the same Apple Account with iCloud Drive turned on.']),
  H2('Every time you switch devices'),
  P('**A. When you finish on a device:** Settings & Data › **Save sync file**.'),
  B('On iPhone or iPad, choose **Save to Files › iCloud Drive › Health Ledger**, and tap **Replace** if asked.'),
  B('On a Mac in Safari, the file lands in Downloads. Drag it into iCloud Drive › Health Ledger and replace the old one. (Shortcut: in Safari › Settings › General, set **File download location** to the Health Ledger folder.)'),
  P('**B. When you start on another device:** Settings & Data › **Load sync file**, and pick the file in iCloud Drive › Health Ledger.', { spacing: { before: 100 } }),
  P('Loading **merges** the file with what is already on that device, so nothing you logged there is lost. The badge at the top right tells you when you have changes that are not in the sync file yet; tap it to jump to these buttons.'),
  box('**Mac with Chrome or Edge:** tap **Link a sync file (auto-sync)** once and choose the file in the Health Ledger folder. From then on the ledger reads and writes it automatically while it is open.'),
  ...img(I('g-sync-card.png'), 6.2, 'The Sync section on Settings & Data.'),

  H1('Step 7. Backups and appointments'),
  B('**Backup:** Export backup (JSON) now and then and keep it in iCloud Drive. Your sync file also works as a backup.'),
  B('**For your appointment:** tap **Doctor-visit report**, then print it or save it as a PDF. **Export daily log (CSV)** gives a spreadsheet if your care team wants one.'),
  B('**Questions:** the Notes tab collects your open questions; tap **Copy question list** before your visit.'),

  H1('Troubleshooting'),
  table(['Problem', 'What to do'], [
    ['My entries from the iPhone are not on the Mac', 'Save a sync file on the iPhone, then Load sync file on the Mac. Check both devices use the same Apple Account.'],
    ['iPhone saved "health-ledger-sync 2.json"', 'Either file works: Load picks up everything. Delete the older one to keep things tidy.'],
    ['Something I deleted came back', 'A sync file made before you deleted it still had it. Delete it again, then save a fresh sync file right away.'],
    ['Everything is gone on one device', 'Safari website data was cleared or the home-screen app was removed. Open the ledger and Load sync file (or your latest backup).'],
    ['The numbers on the alerts seem wrong for me', 'Check Settings & Data › Targets & alert thresholds against what your care team gave you.'],
    ['I need help', 'Ask the person who gave you this guide, or visit the project page linked at the bottom of the app. Please do not post health details publicly.'],
  ], [38, 62]),
  box('**Safety reminder.** An alert, or the lack of one, is not a diagnosis. Call your care team about anything that worries you, and **call 911 for chest pain, fainting, stroke signs, or severe shortness of breath.**', 'F6EEE8', '800020'),
];

save(doc('Daily Health Ledger: Patient Setup Guide', 'Install it, enter your medicines, and keep your iPhone, iPad and Mac in sync · November 2026', body), OUT);
