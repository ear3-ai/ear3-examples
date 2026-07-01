# Contributing to ear3-examples

Thanks for wanting to help! This repo is small on purpose — each
example is intentionally minimal, focused on **one concept**. That
constraint is a feature, not a bug.

## What we want

- **New examples** covering frameworks we don't yet have (Vue, Svelte,
  Remix, SvelteKit, Astro, vanilla JS, Expo/React Native, iOS, Android).
- **Fixes** to typos, broken links, outdated deps, or `.env.example`
  keys that no longer match the dashboard UI.
- **README improvements** — clearer setup steps, better trade-off
  explanations, more accurate cost / latency numbers.

## What we don't want

- **Multi-purpose examples.** If one example demonstrates auth AND
  webhooks AND analytics, split it into three focused ones.
- **Framework-specific dependencies** in the shared root — keep each
  example self-contained.
- **Force-added integrations** (Sentry, PostHog, LaunchDarkly, etc.).
  Users bring their own; examples show Ear3, not third-party wiring.

## Ground rules for a new example

1. **One concept per example.** Name it after that concept.
2. **README first.** Every example has a README with:
   - What it shows (1–2 sentences)
   - What it does *not* show + pointers to sibling examples
   - `Run it` section with copy-paste commands
   - `Trade-offs` section vs the alternatives
3. **`.env.example` for every secret.** Never commit real keys.
4. **Working typecheck.** `npm run typecheck` must pass with no errors.
5. **Prod-safe defaults.** If the example writes anywhere, gate it
   behind an env flag so a curious user doesn't accidentally send data.

## Local dev

```bash
git clone https://github.com/ear3-ai/ear3-examples
cd ear3-examples/<example-name>
npm install
cp .env.example .env.local
# fill in credentials from https://app.ear3.ai/settings/api-keys
npm run dev
```

## Sending a PR

1. Fork + branch off `main`
2. Keep the diff small and focused — one example or one fix per PR
3. Update the root `README.md` table to include your new example
4. Open the PR — we typically review same-day

## License

By contributing, you agree that your contributions are MIT-licensed —
same as the rest of the repo.
