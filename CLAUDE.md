# Claude Code — priority checklist for `ear3-examples`

> Loaded at the start of every session touching this directory. Read
> this before you start editing.

## SDK packages — real names

The SDK was never published as `@ear3/react` / `@ear3/node` — those
names were placeholders used while the packages were still vendored
locally. The real, published packages are:

- `@ear3/embed` — `<Ear3InterviewIframe>`, iframe embed (used by
  `simple-iframe`, `simple-webhook`)
- `@ear3/voice` — `<Ear3Interview>`, native RTVI component
- `@ear3/server` — `Ear3` server client, webhook verification (used by
  `simple-webhook`)
- `@ear3/voice-ui`, `@ear3/cli` — turnkey UI widget, CLI

All vendored `lib/ear3-react/` copies have been removed and replaced
with real npm dependencies. If you add a new example, install the real
package directly — don't vendor.

**Verify current published versions:**

```bash
npm view @ear3/embed version && npm view @ear3/voice version && npm view @ear3/server version
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
