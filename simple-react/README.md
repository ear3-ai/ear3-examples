# simple-react

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fear3-ai%2Fear3-examples&project-name=ear3-simple-react&repository-name=ear3-simple-react&root-directory=simple-react&env=NEXT_PUBLIC_EAR3_PUBLISHABLE_KEY,NEXT_PUBLIC_EAR3_INTERVIEW_ID&envDescription=Grab%20both%20from%20app.ear3.ai%2Fsettings%2Fapi-keys)

Ear3 voice interview embedded as a **native React component** — the
RTVI client runs directly in your React tree, no iframe.

**What this shows:** the `<Ear3Interview>` component from `@ear3/react`.
Under the hood it uses `@pipecat-ai/client-js` +
`@pipecat-ai/daily-transport` to talk to the same Pipecat Cloud worker
that powers the iframe path — you just get full UI control and the mic
permission prompt in your own origin.

**What this does *not* show:** iframe embedding (see
`../simple-iframe`), webhook handling (see `../simple-webhook`).

## Run it

```bash
npm install
cp .env.example .env.local
# fill in NEXT_PUBLIC_EAR3_PUBLISHABLE_KEY + NEXT_PUBLIC_EAR3_INTERVIEW_ID
npm run dev
# open http://localhost:3000
```

## What you'll see

- `/` — landing with "Start" button
- `/interview` — `<Ear3Interview>` mounts, connects to Pipecat Cloud
  via WebRTC, renders default UI (status, transcript, connect/disconnect)
- `/done?session=…` — thank-you page

## Files that matter

| File                              | What it does                                             |
| --------------------------------- | -------------------------------------------------------- |
| `app/interview/page.tsx`          | Mounts `<Ear3Interview>` — the whole native integration  |
| `app/page.tsx`                    | Landing with CTA to `/interview`                         |
| `app/done/page.tsx`               | Thank-you after `onComplete` fires                       |

## Trade-offs vs iframe

- **Bundle add:** ~150 KB (Pipecat client + Daily transport)
- **Mic permission prompt:** appears in **your** origin (better UX)
- **UI control:** full — swap out the default UI via `renderControls`
- **Pipeline upgrades:** package bump required (Ear3-managed iframe
  users get updates automatically)

Want a custom voice UI (own waveform, own transcript panel)? See
`renderControls` in the [Native component docs](https://ear3.ai/developer/sdk/native-component).

## Where to go next

- **Iframe version** — [`../simple-iframe`](../simple-iframe)
- **Server-side webhook flow** — [`../simple-webhook`](../simple-webhook)
- **Full docs** — [ear3.ai/developer](https://ear3.ai/developer)
