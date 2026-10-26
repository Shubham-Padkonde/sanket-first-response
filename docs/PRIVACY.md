# Privacy and threat model

## Data flow

No application endpoint receives incident contents. The static host serves HTML, JavaScript, CSS and an icon. Normal host access logs may contain visitor IP and request metadata. External official sites receive a visitor only when the visitor opens them; Sanket does not prefill or send incident fields to them.

## Threats and controls

| Threat | Implemented control | Residual limitation |
|---|---|---|
| Shared device reveals a draft | Memory by default; explicit warning before persistent storage; clear control | Opt-in localStorage is unencrypted; browser profiles/extensions may read it |
| Export reveals details | Masked default removes provider, narrative and original file names; short references fully hidden | Amount, time, channel, last 4 reference characters and file hashes remain potentially identifying |
| Full export distributed accidentally | Confirmation names sensitive fields | Users control downloaded copies; clearing browser data does not delete downloads |
| User pastes malicious markup | All user content inserted as text; no HTML interpolation | Browser or dependency compromise is outside the app's control |
| Outdated emergency guidance | Source links, review date, deterministic rule tests | Requires recurring human editorial maintenance; no automatic authority feed |
| Huge file exhausts device memory | 5-file, 10 MiB per file, 30 MiB combined limits; sequential hashing | Older devices may still struggle; low-memory testing pending |
| Remote access on current device | Isolation instruction comes before account security; use trusted device | App cannot detect compromise or disable an attacker |
| Fraudster imitates this app | Explicit independent-prototype notice and direct official links | This prototype cannot prevent cloning or impersonation |

The sharing copy is **masked, not anonymous**. Do not publish real incident exports, evidence or identity documents in the repository. The application is not a secure evidence vault. It provides no guarantee of fund recovery, confidentiality against device compromise, or forensic admissibility.
