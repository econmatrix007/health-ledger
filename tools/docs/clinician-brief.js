// Clinician brief: what the Health Ledger is, what it is not, and a settings sheet to hand a patient.
const { P, H1, H2, B, box, table, doc, save, APP_URL } = require('./common');
const OUT = process.argv[2] || 'clinician-brief.docx';

const body = [
  box(['**In one line.** A free, private web app your patients can install on an iPhone, iPad or Mac to log weight, BP, pulse, SpO₂, medicines, fluids, food and exercise, then bring a printed trend report or CSV to visits.',
       `**Link:** ${APP_URL}`]),
  H1('What patients track'),
  table(['Domain', 'What the patient logs', 'What the patient sees'], [
    ['Weight', 'Morning weight, same routine daily', 'Trend, 1-day and 7-day gain alerts at thresholds you set'],
    ['Blood pressure, pulse', 'Seated reading at a set time after morning medicines; optional recheck after 15 to 20 minutes; extra readings', 'Final daily reading, 7/30/90-day trends, AM vs later-day comparison, effect of exercise on readings'],
    ['SpO₂', 'Daily reading', 'Trend and low-value alert'],
    ['Medicines', 'Patient-entered list; each dose ticked with time', '14-day adherence grid; dose changes keep history'],
    ['Fluids and diet', 'Fluid intake; meals with optional sodium, calories, carbs, fiber, protein, saturated fat, potassium', 'Fluid vs limit, sodium vs target, nutrition vs targets you set'],
    ['Exercise', 'Activity, minutes, effort (RPE), pulse before and after', 'Weekly minutes vs a month-by-month plan'],
    ['Symptoms and notes', 'Symptom checklist; visit questions; lab results', 'Open questions list for the next appointment'],
  ], [16, 42, 42]),
  H1('What it does not do'),
  B('It is **not a medical device**. It does not diagnose, interpret, or recommend treatment.'),
  B('It contains **no drug-interaction or dosing logic**. Patients type in their own medicines and whatever notes you or their pharmacist give them.'),
  B('Alerts compare the patient\'s entries with the thresholds entered on the Settings tab. Defaults are generic (for example, BP 140/90, SpO₂ below 92%, sodium 2,300 mg/day, fluids 2,000 mL/day) and should be replaced with yours.'),
  B('It does not send data to you or to anyone. There is no portal, no remote monitoring, and no EHR connection.'),
  H1('Privacy and data handling'),
  P('The app is a static web page. Entries stay in the browser on the patient\'s device. To use several devices, the patient saves a sync file to their own iCloud Drive. The developer never receives health information, so the app is not a HIPAA business associate, and recommending it does not share data with a third party. Patients decide what to show you: a printed report, a CSV export, or the screen itself. Please confirm with your practice\'s compliance lead before recommending any app as a matter of policy.'),
  H1('Using it at visits'),
  B('**Printed report:** Settings & Data › Doctor-visit report produces a printable summary of the dashboard, trends, weekly and monthly averages.'),
  B('**CSV export:** one row per day (weights, BP readings, SpO₂, fluids, sodium, doses taken, exercise minutes, symptoms, nutrition) for anyone who wants to chart it.'),
  B('**Questions list:** the Notes tab gathers the patient\'s open questions for the visit.'),
  H2('Good fits'),
  P('Patients already asked to keep home logs: heart failure with daily weights and fluid limits, hypertension titration, home BP monitoring, cardiac rehab, post-discharge follow-up. Patients comfortable with a smartphone or tablet.'),
  H2('Less suitable'),
  P('Patients who need clinician-monitored remote data, those who share a device with others, and those unlikely to keep a backup (a cleared browser erases that device\'s copy).'),
];

// Page 2: a settings sheet to complete for the patient.
const sheet = [
  new (require('docx').Paragraph)({ pageBreakBefore: true, children: [] }),
  H1('Patient settings sheet'),
  P('Complete for the patient. They enter these on **Settings & Data › Targets & alert thresholds** and **My medicines**. Leave a line blank to keep the generic default or to hide that target.'),
  P('Patient: ______________________________    Date: ______________    Clinician: ______________________________'),
  table(['Setting', 'Generic default', 'For this patient'], [
    ['Weight gain alert, 1 day', '2 lb', ''], ['Weight gain alert, 7 days', '5 lb', ''],
    ['High BP: systolic ≥ / diastolic ≥', '140 / 90', ''], ['Low BP: systolic <', '90', ''],
    ['Pulse low < / high >', '50 / 110', ''], ['SpO₂ low <', '92%', ''],
    ['Fluid limit, mL/day', '2,000', ''], ['Sodium target, mg/day', '2,300', ''],
    ['Calories / protein / fiber goals', 'blank', ''], ['Saturated fat max, g', 'blank', ''],
    ['Carbohydrate floor, g (e.g., SGLT2 inhibitors)', 'blank', ''], ['Potassium flag above, mg (food)', 'blank', ''],
    ['Minutes after AM medicines before BP check', '2 hours', ''],
    ['Exercise plan (sessions/week × minutes, by month)', '3 × 40, then 3 × 45, 4 × 45, 5 × 45', ''],
  ], [44, 22, 34]),
  H2('General cautions to enter (shown at the top of the patient\'s Medicine Guide)'),
  P('__________________________________________________________________________________________'),
  P('__________________________________________________________________________________________'),
  P('__________________________________________________________________________________________'),
  H2('When to call the office'),
  P('__________________________________________________________________________________________'),
  P('__________________________________________________________________________________________'),
  box('Patients set up the app with the companion **Patient Setup Guide**. Feedback during the pilot is welcome; see the pilot feedback form.', 'F6EEE8', '800020'),
];

save(doc('Daily Health Ledger: Clinician Brief', 'A free, private home-logging app for patients on Mac, iPhone and iPad · November 2026', [...body, ...sheet]), OUT);
