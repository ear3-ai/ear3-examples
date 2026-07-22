import { Ear3 } from '@ear3/server'
import { NextResponse } from 'next/server'

const ear3 = new Ear3(process.env.EAR3_SECRET_KEY!)

interface InterviewCompletedData {
  sessionId: string
  interviewId: string
  metadata: Record<string, unknown> | null
}

export async function POST(req: Request) {
  // 1. Grab the RAW body — do NOT parse as JSON before verifying.
  //    The signature is computed over the exact bytes Ear3 sent; any
  //    whitespace change (which JSON.parse + JSON.stringify would do)
  //    breaks it.
  const rawBody = await req.text()

  // 2. Read the signature header.
  const signature = req.headers.get('ear3-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing Ear3-Signature header' }, { status: 400 })
  }

  // 3. Verify + parse in one call.
  //    - HMAC-SHA256 constant-time compare
  //    - Rejects timestamps older than 5 min (replay protection)
  //    - Throws on invalid signature — return 400 so Ear3 marks the
  //      delivery as failed and eventually retries (roadmapped)
  let event
  try {
    event = ear3.webhooks.constructEvent<InterviewCompletedData>(
      rawBody,
      signature,
      process.env.EAR3_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('[ear3 webhook] signature check failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // 4. Handle the event. Switch on `type` — new event types may be
  //    added, so handle unknown gracefully.
  switch (event.type) {
    case 'interview.completed':
      console.log('[ear3 webhook] interview completed:', {
        sessionId: event.data.sessionId,
        interviewId: event.data.interviewId,
        metadata: event.data.metadata,
      })
      // → your business logic:
      //   - mark user's onboarding step as done
      //   - trigger a downstream job (insights, notifications)
      //   - update your own DB
      break

    case 'interview.failed':
      console.warn('[ear3 webhook] interview failed:', event.data)
      break

    case 'session.expired':
      console.warn('[ear3 webhook] session expired before completion:', event.data)
      break

    default:
      // Unknown event type — log + ack. Do NOT return an error, or Ear3
      // will keep retrying and think your endpoint is broken.
      console.log('[ear3 webhook] unknown event type:', event.type)
  }

  // 5. Ack with 2xx. Ear3 counts anything 200-299 as successful delivery.
  return new NextResponse(null, { status: 200 })
}
