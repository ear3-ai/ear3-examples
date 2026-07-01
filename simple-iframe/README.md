# simple-iframe

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fear3-ai%2Fear3-examples%2Ftree%2Fmain%2Fsimple-iframe&env=NEXT_PUBLIC_EAR3_PUBLISHABLE_KEY,NEXT_PUBLIC_EAR3_INTERVIEW_ID&envDescription=Grab%20both%20from%20app.ear3.ai%2Fsettings%2Fapi-keys)

The smallest possible Ear3 voice interview integration: drop
`<Ear3InterviewIframe>` into a Next.js page and you're done.

**What this shows:** the iframe embedding path — Ear3 hosts the
respondent UI on `app.ear3.ai`, this app just mounts it in an iframe
and listens for the completion event.

**What this does *not* show:** webhook handling (see
`../simple-webhook`), the native RTVI component (see
`../simple-react`).

## Run it

```bash
npm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_EAR3_PUBLISHABLE_KEY + NEXT_PUBLIC_EAR3_INTERVIEW_ID
npm run dev
# open http://localhost:3000
```

## What you'll see

- `/` — landing page with a "Start the interview" button
- `/interview` — the iframe mounts; grant mic access + talk to Ear3
- `/done?session=…` — thank-you page with the session id

## Files that matter

| File                              | What it does                                                   |
| --------------------------------- | -------------------------------------------------------------- |
| `app/interview/page.tsx`          | Mounts `<Ear3InterviewIframe>` — this is the whole integration |
| `app/page.tsx`                    | Landing with CTA to `/interview`                               |
| `app/done/page.tsx`               | Thank-you page after `onComplete` fires                        |

## Trade-offs of this approach

- **Bundle add:** ~2 KB (just fetch + iframe)
- **Mic permission prompt:** appears in the `app.ear3.ai` origin
- **UI control:** bounded — themeable via URL params but you can't
  replace the responder UI
- **Pipeline upgrades:** we ship to `app.ear3.ai`, all users get them
  without your redeploy

If you'd rather run the RTVI client in your own React tree with full UI
control, check out [`../simple-react`](../simple-react).

## Where to go next

- **Handle the completion server-side** — [`../simple-webhook`](../simple-webhook)
- **Native RTVI component instead of iframe** — [`../simple-react`](../simple-react)
- **Full docs** — [ear3.ai/developer](https://ear3.ai/developer)
