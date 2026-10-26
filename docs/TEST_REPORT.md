# Verification record

Date: 26 October 2026. Prototype v1.0.

## Automated checks

`npm run check` runs JavaScript syntax checks and Node's built-in test runner. Sixteen tests passed during the initial build. The tests cover all 15 nonempty combinations of response flags, financial-reporting priority, remote-access precedence, Hindi advice coverage, empty and invalid inputs, future dates, masked/default export behavior, short-reference masking, explicit full export and corrupt browser-state handling.

These are functional checks, not a penetration test, accessibility audit or clinical/financial validation. CI reruns them on pushes and pull requests.

## Browser checks

Observed in the desktop browser: home navigation, fictional sample loading, multi-selection response changes, Hindi/English switching, incident preparation, masked-download confirmation, and explicit absence of an official submission. The service worker reached its ready state. Interface screenshots use synthetic data only. A ready cache is not a physical offline-reload test.

## Pending evaluation

Native Hindi review; screen-reader review; low-memory/mobile-device testing; physical offline reload test; pilot participant testing; a professional review of cyber-response guidance. No recovery outcomes have been measured.
