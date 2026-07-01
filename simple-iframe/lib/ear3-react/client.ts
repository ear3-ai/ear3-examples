// Vendored from @ear3/react — see types.ts note.

import type { Ear3SessionResult } from './types'

export const DEFAULT_API_BASE = 'https://app.ear3.ai'

export interface CreateSessionParams {
  interviewId: string
  publishableKey: string
  metadata?: Record<string, unknown>
  apiBase?: string
  signal?: AbortSignal
}

export async function createSession(
  params: CreateSessionParams,
): Promise<Ear3SessionResult> {
  const apiBase = (params.apiBase || DEFAULT_API_BASE).replace(/\/$/, '')

  const response = await fetch(`${apiBase}/api/v2/sdk/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      interviewId: params.interviewId,
      publishableKey: params.publishableKey,
      metadata: params.metadata,
    }),
    signal: params.signal,
  })

  const payload = await response
    .json()
    .catch(() => ({ error: 'Invalid response from Ear3' }))

  if (!response.ok) {
    const error = new Error(
      payload?.error || `Ear3 session creation failed (${response.status})`,
    ) as Error & { status: number }
    error.status = response.status
    throw error
  }

  return {
    sessionId: payload.sessionId,
    sessionUrl: payload.sessionUrl,
    expiresAt: payload.expiresAt ?? null,
  }
}
