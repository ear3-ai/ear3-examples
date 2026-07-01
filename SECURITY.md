# Security Policy

## Reporting a vulnerability

If you've found a security issue in an Ear3 SDK, in one of these
examples, or on `app.ear3.ai`, please report it privately.

- **Email:** security@ear3.ai
- **Response time:** within 48h on business days

Please **do not** open a public GitHub issue for vulnerabilities.

## What we consider a vulnerability

- Anything that lets an attacker mint valid publishable-key sessions
  they shouldn't have access to
- Signature bypass on the webhook verification path
- Cross-workspace data leaks
- Any bug that leaks secret keys (`sk_…`) or webhook signing keys
  (`whsec_…`)

## What's out of scope

- Rate-limit tuning ("I can DDoS your API") — talk to us via normal
  support, not the security channel
- Missing headers on marketing pages
- Third-party dependency CVEs with no known exploitation path (we
  auto-update via Dependabot)

## Coordinated disclosure

We aim to publish a fix + advisory within 90 days of a confirmed
report. If your finding requires a longer embargo (regulatory or
customer-notification reasons), tell us in the initial email.
