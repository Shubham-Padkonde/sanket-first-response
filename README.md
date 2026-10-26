# Sanket / संकेत

**Cyber-fraud first response in English and Hindi.** A browser-local prototype for Hack for Social Cause (VBYLD 2027), theme: **Digital Safety & Cyber Fraud Awareness**.

**[Try the public demo](https://shubham-padkonde.github.io/sanket-first-response/)** - no account required.

Sanket helps a person choose an immediate next step, prepare an incident summary and reach India's official reporting channels. It is an independent student-project prototype, not a government service. It does not detect scams with AI, submit complaints, freeze funds or guarantee recovery.

## Run in 30 seconds

Requirements: Node.js 20 or newer and a modern browser. No installation of packages is needed.

```sh
git clone https://github.com/Shubham-Padkonde/sanket-first-response.git
cd sanket-first-response
npm start
```

Open http://127.0.0.1:4173. Do not open index.html with a file URL: module loading and offline caching require HTTP/HTTPS. No API keys, login or backend are required. `.env.example` documents the optional `PORT` variable. This project does not load `.env` automatically. Set `PORT` in your shell only if changing the local port.

```sh
npm test
npm run check
```

## Implemented

- Four situation flags: loss of money, exposed credentials, remote access and suspicious communication. Flags can combine; financial loss always retains immediate reporting.
- English/Hindi interface, readable action plan, keyboard controls and responsive layout.
- Official links to 1930, cybercrime.gov.in and Chakshu, appropriate to the selected situation.
- In-memory incident preparation; optional browser persistence with explicit shared-device warning.
- Masked TXT export and explicitly confirmed full JSON export.
- Browser SHA-256 fingerprints for up to five evidence files. File contents never leave the browser and are not saved by Sanket.
- Three fictional awareness exercises with explanations.
- A service worker caches only application assets after first load. Calls still require phone service; official reporting requires internet.
- Sixteen automated tests, including all 15 non-empty combinations of situation flags, privacy defaults, validation and corrupt-storage recovery.

## Two-minute demonstration

1. Open the home screen. The 1930 route appears immediately.
2. Select **Try a sample incident**. This loads a clearly fictional INR 2,500 UPI scenario.
3. Add **Someone has remote access**. The plan first isolates the compromised device, then retains the reporting route.
4. Switch to **हिन्दी** and back to English.
5. Open **My incident**. Download the masked copy and verify that the provider, narrative and filenames are withheld.
6. Add `data/sample-evidence.txt` as a fingerprint. No file upload occurs.
7. Open **Practice** and answer one scenario.
8. Clear the sample. Do not call helplines or submit test incidents to official services.

## Deploy

Serve `dist/` using any HTTPS static host. All asset paths are relative, including the service-worker scope, so a repository subpath works. GitHub Pages can deploy the contents of `dist/` to a Pages branch. The optional private Sites preview is separate from the public repository and is not the repository URL required by the competition.

## Documentation

- [Technical design and architecture](docs/TECHNICAL_DESIGN.md)
- [Evidence and sources](docs/SOURCES.md)
- [Pilot, evaluation and rollout](docs/PILOT_PLAN.md)
- [Privacy and threat model](docs/PRIVACY.md)
- [Verification record](docs/TEST_REPORT.md)
- [AI-use and originality disclosure](docs/AI_DISCLOSURE.md)
- [Synthetic scenarios](data/scenarios.json)
- [MIT license](LICENSE)

## Maturity and limitations

This is a functional prototype with synthetic sample data. No field trial, police partnership, banking integration, recovery success rate or fraud-detection accuracy is claimed. Language review by native speakers and testing with intended beneficiaries are pending. The export is a preparation aid and is not an official complaint or a forensic authenticity certificate. The local persistence option is unencrypted. Downloaded files can contain personal data and remain after browser data is cleared. Guidance must be periodically checked against official sources.

## Contributing

Open an issue with reproducible steps and synthetic data only. Never put real victim details, phone numbers, receipts or credentials in issues. Changes to response guidance must include official source links and corresponding tests. Before public outreach, arrange a language and cyber-safety review.

## AI disclosure

The initial implementation, documentation and submission drafts were generated with substantial assistance from OpenAI Codex. There is no AI service in the running application. See the detailed disclosure; the submitting team must review and accurately update it before submission.
