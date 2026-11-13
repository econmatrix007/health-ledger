// Shared styling for the Health Ledger Word documents (Yale blue, serif, US Letter).
const fs = require('fs');
const d = require('docx');
const BLUE = '00356B', OX = '800020', MUTED = '5A5A5A', TINT = 'E8EEF6', PAPER = 'FAF7F0';
const FONT = 'Georgia';
const APP_URL = process.env.APP_URL || 'https://OWNER.github.io/health-ledger/';
const W = 12240 - 2 * 1260; // content width in DXA (0.875" margins)

const styles = {
  default: { document: { run: { font: FONT, size: 21 }, paragraph: { spacing: { after: 100, line: 276, lineRule: d.LineRuleType.AUTO } } } },
  paragraphStyles: [
    { id: 'Title', name: 'Title', basedOn: 'Normal', run: { font: FONT, size: 40, bold: true, color: BLUE }, paragraph: { spacing: { before: 0, after: 60 }, keepNext: true } },
    { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 28, bold: true, color: BLUE }, paragraph: { spacing: { before: 260, after: 100 }, keepNext: true, outlineLevel: 0 } },
    { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 23, bold: true, color: OX }, paragraph: { spacing: { before: 180, after: 60 }, keepNext: true, outlineLevel: 1 } },
  ],
};
const numbering = { config: [
  { reference: 'bul', levels: [{ level: 0, format: d.LevelFormat.BULLET, text: '•', alignment: d.AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } } } }] },
  ...Array.from({ length: 12 }, (_, i) => ({ reference: 'num' + i, levels: [{ level: 0, format: d.LevelFormat.DECIMAL, text: '%1.', alignment: d.AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } } } }] })),
] };

// Inline markup: **bold**, _italic_
function runs(text, base = {}) {
  return text.split(/(\*\*[^*]+\*\*|_[^_]+_)/).filter(Boolean).map(t =>
    t.startsWith('**') ? new d.TextRun({ ...base, text: t.slice(2, -2), bold: true })
    : t.startsWith('_') && t.endsWith('_') ? new d.TextRun({ ...base, text: t.slice(1, -1), italics: true })
    : new d.TextRun({ ...base, text: t }));
}
const P = (t, o = {}) => new d.Paragraph({ children: runs(t, o.run || {}), spacing: o.spacing, alignment: o.align, keepNext: o.keepNext });
const H1 = t => new d.Paragraph({ heading: d.HeadingLevel.HEADING_1, children: [new d.TextRun(t)] });
const H2 = t => new d.Paragraph({ heading: d.HeadingLevel.HEADING_2, children: [new d.TextRun(t)] });
const B = t => new d.Paragraph({ numbering: { reference: 'bul', level: 0 }, children: runs(t), spacing: { after: 50 } });
let numRef = 0;
const NL = items => { const r = 'num' + (numRef++ % 12); return items.map(t => new d.Paragraph({ numbering: { reference: r, level: 0 }, children: runs(t), spacing: { after: 60 } })); };
const RULE = () => new d.Paragraph({ border: { bottom: { style: d.BorderStyle.SINGLE, size: 6, color: 'C9C2B2', space: 4 } }, spacing: { after: 120 } });

function box(text, fill = TINT, edge = BLUE) {
  const lines = Array.isArray(text) ? text : [text];
  return new d.Table({ width: { size: W, type: d.WidthType.DXA }, columnWidths: [W], rows: [new d.TableRow({ children: [new d.TableCell({
    width: { size: W, type: d.WidthType.DXA }, shading: { fill, type: d.ShadingType.CLEAR, color: 'auto' },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    borders: { left: { style: d.BorderStyle.SINGLE, size: 24, color: edge }, top: { style: d.BorderStyle.NONE }, bottom: { style: d.BorderStyle.NONE }, right: { style: d.BorderStyle.NONE } },
    children: lines.map(l => P(l)) })] })] });
}

function table(head, rows, widths) {
  const tot = widths.reduce((a, b) => a + b, 0); widths = widths.map(w => Math.round(w * W / tot));
  widths[widths.length - 1] += W - widths.reduce((a, b) => a + b, 0);
  const bd = { style: d.BorderStyle.SINGLE, size: 4, color: 'D8D2C4' };
  const cell = (t, i, hdr) => new d.TableCell({ width: { size: widths[i], type: d.WidthType.DXA },
    shading: hdr ? { fill: BLUE, type: d.ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 }, borders: { top: bd, bottom: bd, left: bd, right: bd },
    children: [new d.Paragraph({ spacing: { after: 0 }, children: runs(t, hdr ? { bold: true, color: 'FFFFFF', size: 19 } : { size: 19 }) })] });
  return new d.Table({ width: { size: W, type: d.WidthType.DXA }, columnWidths: widths,
    rows: [new d.TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, i, true)) }), ...rows.map(r => new d.TableRow({ cantSplit: true, children: r.map((t, i) => cell(t, i, false)) }))] });
}

function img(path, widthIn, caption) {
  const { execSync } = require('child_process');
  const dims = execSync(`python3 -c "from PIL import Image;i=Image.open('${path}');print(i.width,i.height)"`).toString().trim().split(' ').map(Number);
  const w = widthIn * 96, h = Math.round(w * dims[1] / dims[0]);
  const out = [new d.Paragraph({ alignment: d.AlignmentType.CENTER, keepNext: !!caption, spacing: { before: 80, after: caption ? 20 : 120, line: 240, lineRule: d.LineRuleType.AUTO },
    children: [new d.ImageRun({ type: 'png', data: fs.readFileSync(path), transformation: { width: w, height: h } })] })];
  if (caption) out.push(P(caption, { align: d.AlignmentType.CENTER, run: { size: 17, italics: true, color: MUTED }, spacing: { after: 140 } }));
  return out;
}

function doc(title, sub, children) {
  const footer = new d.Footer({ children: [new d.Paragraph({ alignment: d.AlignmentType.CENTER, children: [
    new d.TextRun({ text: 'Daily Health Ledger · not medical advice · in an emergency call 911 · page ', size: 16, color: MUTED }),
    new d.TextRun({ children: [d.PageNumber.CURRENT], size: 16, color: MUTED })] })] });
  return new d.Document({ creator: 'Daily Health Ledger', title, styles, numbering, sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1260, right: 1260 } } },
    footers: { default: footer },
    children: [new d.Paragraph({ style: 'Title', children: [new d.TextRun(title)] }), P(sub, { run: { color: MUTED, size: 22 } }), RULE(), ...children] }] });
}
async function save(docObj, path) { fs.writeFileSync(path, await d.Packer.toBuffer(docObj)); console.log('wrote', path); }

module.exports = { d, P, H1, H2, B, NL, RULE, box, table, img, doc, save, APP_URL, BLUE, OX, MUTED };
