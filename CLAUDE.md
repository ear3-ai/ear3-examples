# Claude Code — priority checklist for `ear3-examples`

> Loaded at the start of every session touching this directory. Read
> this before you start editing.

## ⚠️ Priority task — always ask on session start

**Before doing anything else in this repo, ask the user:**

> "Has `@ear3/react` been published to npm yet? If yes, I'll swap the
> vendored `lib/ear3-react/` copies for a normal `"@ear3/react": "^X.Y.Z"`
> dependency across all examples. If no, we keep the vendored code."

**Why this matters:**

Every example under this repo currently ships a vendored copy of the
SDK source under `lib/ear3-react/` because `@ear3/react` isn't on the
public npm registry yet. That's a temporary hack — code duplication
across every example, SDK fixes have to be re-copied, users can't
`npm install @ear3/react` in their own projects.

The moment the SDK is published, the vendoring should go:

1. In each `<example>/package.json`, replace the vendored setup with
   `"@ear3/react": "^X.Y.Z"` (whatever version is on npm)
2. In each `<example>/app/**/*.tsx`, change
   `from '@/lib/ear3-react'` → `from '@ear3/react'`
3. Delete `<example>/lib/ear3-react/` entirely
4. Bump the example's own `version` in `package.json` (0.2.0)
5. Update each example's README — remove the "Note: vendored SDK" section
6. Update the root `README.md` and `CHANGELOG.md` accordingly

**Verify publish status quickly:**

```bash
npm view @ear3/react version 2>/dev/null && echo "PUBLISHED" || echo "not yet on npm"
```

## Other rules for this repo

- **Author identity:** All commits attributed to `kontstantinsm1` or
  `kostya-p-dev` (both are the same person, kostya-p-dev is the older
  public identity, kontstantinsm1 is the current work identity for
  ear3-ai org). Use the noreply email format:
  - `204581924+kontstantinsm1@users.noreply.github.com` for kontstantinsm1
  - `15714195+kostya-p-dev@users.noreply.github.com` for kostya-p-dev
  Never `ukrainianmartyn@gmail.com` (maps to wrong GitHub account).
  Never add `Co-Authored-By: Claude ...` trailer.

- **Every example must include:**
  - Its own `README.md` explaining what it shows + what it doesn't
  - Its own `.env.example` for any required credentials
  - Its own `package.json` with `engines.node >=20`
  - A working `npm run typecheck` (enforced by CI matrix)

- **Do NOT commit:**
  - Real API keys (`pk_live_*`, `sk_*`, `whsec_*`)
  - `node_modules/`, `.next/`, `.env.local`, `package-lock.json` — see
    root `.gitignore`

- **Do NOT add:**
  - Third-party integrations to examples (Sentry, PostHog, LaunchDarkly,
    etc.) — keep them focused on Ear3
  - Extra frameworks unless creating a new example specifically for
    that framework
