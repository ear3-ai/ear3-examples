# ear3-examples

[![typecheck](https://github.com/ear3-ai/ear3-examples/actions/workflows/typecheck.yml/badge.svg)](https://github.com/ear3-ai/ear3-examples/actions/workflows/typecheck.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node 20+](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](./.nvmrc)

Focused, runnable examples for building with [Ear3](https://ear3.ai) —
the voice-interview platform. Each folder is a standalone project you
can clone, `npm install`, and run in under a minute.

Not to be confused with [`ear3-templates`](https://github.com/ear3-templates) —
those are production-ready starters. **Examples show one concept
each**; templates get you to production.

## What's in here

| Example                                 | Shows                                                                        | Stack             |
| --------------------------------------- | ---------------------------------------------------------------------------- | ----------------- |
| [`simple-iframe`](./simple-iframe)      | Minimal `<Ear3InterviewIframe>` embed — 30-second integration                | Next.js 14        |
| [`simple-react`](./simple-react)        | Minimal `<Ear3Interview>` native RTVI component — no iframe, full UI control | Next.js 14        |
| [`simple-webhook`](./simple-webhook)    | Full flow — iframe embed + signed webhook handler with `@ear3/server`          | Next.js 14        |

More examples on the roadmap: vanilla JS iframe (no React), Rehearse CLI
for text-mode interview validation, Vue/Svelte adaptations. See
[ear3.ai/developer](https://ear3.ai/developer) for the roadmap.
Contributions welcome (see [Contributing](#contributing)).

## Grab just one example

```bash
npx degit ear3-ai/ear3-examples/simple-iframe my-app
cd my-app
npm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_EAR3_PUBLISHABLE_KEY + NEXT_PUBLIC_EAR3_INTERVIEW_ID
npm run dev
```

Or clone the whole thing:

```bash
git clone https://github.com/ear3-ai/ear3-examples
cd ear3-examples/simple-iframe
npm install && npm run dev
```

## Getting Ear3 credentials

Every example needs a `publishableKey` (`pk_test_...`) and an
`interviewId`. Grab both from
[app.ear3.ai](https://app.ear3.ai/settings/api-keys).

Full setup guide: [ear3.ai/developer/sdk/quickstart](https://ear3.ai/developer/sdk/quickstart).

## Contributing

Found a bug in an example? Want to add one for a framework we don't
cover (Vue, Svelte, Remix, SvelteKit, Astro)?

- Open an issue with what you'd like to see
- Or open a PR — new examples should be minimal, focused on one
  concept, and include a README explaining what and why

Each example is MIT-licensed. Copy freely.

## License

MIT — see [LICENSE](./LICENSE).
