# Changelog

All notable changes to `ear3-examples` are documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This repo doesn't follow semver — each example is standalone and
versioned in its own `package.json`.

## Unreleased

- Nothing pending yet.

## 2026-07-01 — initial release

Repo bootstrap. Three examples covering the two React integration
paths (iframe vs native RTVI component) plus the end-to-end
server-side webhook flow.

### Added

- `simple-iframe` — minimal `<Ear3InterviewIframe>` embed in Next.js 14
- `simple-react` — minimal `<Ear3Interview>` native RTVI component
- `simple-webhook` — full flow with `@ear3/node` webhook handler
- CI: per-example typecheck matrix on push + PR
- Dependabot: weekly updates for each example and root
- CONTRIBUTING guide, SECURITY policy, PR + issue templates
- MIT-licensed under [Ear3](https://ear3.ai)
