# Regenerating the Word/PDF documents
Requires Node with the `docx` package (`npm install docx`) and LibreOffice for PDFs.
```bash
cd tools/docs
APP_URL="https://YOUR-USER.github.io/health-ledger/" node clinician-brief.js ../../docs/clinician-brief.docx
APP_URL="https://YOUR-USER.github.io/health-ledger/" node patient-guide.js ../../docs/patient-setup-guide.docx
node pilot-kit.js ../../docs/pilot-kit.docx
cd ../../docs && soffice --headless --convert-to pdf *.docx
```
Screenshots live in `tools/docs/img/` (taken from the app with sample data only).
