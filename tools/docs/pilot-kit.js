// 30-day pilot plan plus a patient feedback form (printable).
const { d, P, H1, H2, B, NL, box, table, doc, save } = require('./common');
const OUT = process.argv[2] || 'pilot-kit.docx';
const line = () => P('_____________________________________________________________________________________');
const scale = q => [q, '1', '2', '3', '4', '5'];

const plan = [
  box('**Goal.** Before wider release, learn whether 2 to 3 patients can set up the ledger, keep it current for 30 days, sync across their devices, and bring something useful to a visit, and fix what gets in the way.'),
  H1('Who'),
  B('**Clinician lead:** the nurse practitioner, who picks 2 to 3 patients already asked to keep home logs.'),
  B('**Developer:** fixes problems and answers setup questions (by phone or email; patients never post health details publicly).'),
  B('**Patients:** at least one who uses only an iPhone, and one who uses a Mac plus an iPhone or iPad, so sync gets a real test.'),
  H1('Timeline'),
  table(['When', 'What happens', 'Who'], [
    ['Day 0 (visit)', 'Hand over the Patient Setup Guide and a completed settings sheet. Patient installs the app and enters medicines in the room if possible.', 'NP, patient'],
    ['Day 3', 'Short check-in call: installed? medicines entered? any confusion?', 'Developer'],
    ['Day 10', 'Patient saves a sync file and loads it on a second device (if they have one).', 'Patient'],
    ['Day 14', 'Mid-point call; fix the top two problems and publish an update.', 'Developer'],
    ['Day 30 (visit)', 'Patient brings the Doctor-visit report. NP notes whether it helped. Patient completes the feedback form.', 'NP, patient'],
    ['Day 35', 'Review feedback; decide go / fix / stop for wider release.', 'NP, developer'],
  ], [16, 64, 20]),
  H1('What to measure'),
  table(['Measure', 'Target to proceed'], [
    ['Set up (installed + medicines + thresholds) within 1 week', 'All patients'],
    ['Days with a morning weight or BP logged, of 30', '20 or more'],
    ['Successful sync between two devices (multi-device patients)', 'Yes, with no lost entries'],
    ['NP rates the visit report "useful" or "very useful"', 'Yes'],
    ['Patient overall rating (feedback form, 1 to 5)', '4 or higher'],
    ['Serious confusion (wrong medicine logged, alert misread as advice)', 'None'],
  ], [70, 30]),
  H1('Stop rules'),
  P('Pause the pilot and contact the patient if any patient treats an alert as medical advice, changes a medicine because of the app, or loses data they relied on.'),
];

const form = [
  new d.Paragraph({ pageBreakBefore: true, children: [] }),
  H1('Patient feedback form (day 30)'),
  P('Thank you for trying the Daily Health Ledger. Please circle a number: **1 = strongly disagree, 5 = strongly agree.** Do not write any health details you would not want shared with the developer.'),
  table(['Statement', '1', '2', '3', '4', '5'], [
    scale('Installing the app was easy.'), scale('Entering my medicines was easy.'), scale('The morning check-in fits my routine.'),
    scale('Ticking off medicines helped me stay on track.'), scale('The charts help me understand my trends.'),
    scale('Syncing between my devices worked (skip if one device).'), scale('The visit report was useful at my appointment.'),
    scale('I understood that alerts are reminders, not medical advice.'), scale('I would keep using the ledger.'), scale('I would recommend it to someone in my situation.'),
  ], [60, 8, 8, 8, 8, 8]),
  H2('Which devices did you use?'),
  P('☐ iPhone     ☐ iPad     ☐ Mac (Safari)     ☐ Mac (Chrome or Edge)'),
  H2('About how many days out of 30 did you log something?'),
  P('☐ Fewer than 10     ☐ 10 to 19     ☐ 20 to 25     ☐ 26 or more'),
  H2('What was the most confusing or annoying part?'), line(), line(),
  H2('What one thing would make it more useful?'), line(), line(),
  H2('Anything else?'), line(),
];

save(doc('Daily Health Ledger: 30-Day Pilot Kit', 'Plan for the nurse practitioner pilot and a patient feedback form · November 2026', [...plan, ...form]), OUT);
