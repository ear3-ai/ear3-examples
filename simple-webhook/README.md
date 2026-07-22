# simple-webhook

The full end-to-end Ear3 flow in a single Next.js app: `<Ear3InterviewIframe>`
(`@ear3/embed`) on the client + `/api/webhooks/ear3` on the server
verifying signed `interview.completed` events with `@ear3/server`.

**What this shows:**

- Embedding the interview via `<Ear3InterviewIframe>`
- Registering a webhook endpoint that receives signed events from Ear3
- Verifying the HMAC-SHA256 signature (`Ear3-Signature: t=…,v1=…`) so
  you know the event actually came from Ear3
- Reading the raw request body (Next.js `req.text()`) — critical, because
  JSON parsing before verification breaks the signature

**What this does *not* show:** the native RTVI component (see
`../simple-react`).

## Run it

```bash
npm install
cp .env.example .env.local
# fill in:
#   NEXT_PUBLIC_EAR3_PUBLISHABLE_KEY
#   NEXT_PUBLIC_EAR3_INTERVIEW_ID
#   EAR3_SECRET_KEY        (server-only, sk_test_...)
#   EAR3_WEBHOOK_SECRET    (server-only, whsec_...)
npm run dev
# open http://localhost:3000
```

## Point Ear3 at your webhook

Localhost isn't reachable from Ear3's servers. Two options:

- **ngrok:** `ngrok http 3000` → copy the https URL → register
  `<https-url>/api/webhooks/ear3` in the Ear3 dashboard
- **Vercel preview:** push a branch, use the preview URL

Subscribe the endpoint to `interview.completed`.

## Files that matter

| File                                          | What it does                                                     |
| --------------------------------------------- | ---------------------------------------------------------------- |
| `app/interview/page.tsx`                      | Mounts `<Ear3InterviewIframe>`                                   |
| `app/api/webhooks/ear3/route.ts`              | Verifies + handles the signed webhook — **the main event**       |
| `app/page.tsx`                                | Landing with CTA                                                 |
| `app/done/page.tsx`                           | Client-side confirmation (source of truth is the webhook)        |

## The webhook flow

```
Respondent finishes interview
        ↓
Ear3 backend signs the event:
        HMAC-SHA256(EAR3_WEBHOOK_SECRET, `${unix_ts}.${rawBody}`)
        ↓
Ear3 POSTs to <your-url>/api/webhooks/ear3 with:
        Ear3-Signature: t=<unix_ts>,v1=<hex_sig>
        ↓
Your route.ts:
  1. rawBody = await req.text()          ← critical: raw bytes, not JSON.parse
  2. ear3.webhooks.constructEvent(rawBody, signature, whsec)
        - verifies signature with constant-time compare
        - rejects timestamps older than 5 min
        - returns typed event
  3. switch on event.type → your business logic
        ↓
  return new Response(null, { status: 200 })
```

## Trade-offs vs `simple-iframe`

Same client-side, more moving parts server-side. Trade the extra plumbing
for **server-side source of truth** — you don't have to trust the browser
to tell you when the interview is done.

## Where to go next

- **Iframe-only, no server** — [`../simple-iframe`](../simple-iframe)
- **Native RTVI component** — [`../simple-react`](../simple-react)
- **Full docs** — [ear3.ai/developer](https://ear3.ai/developer)
