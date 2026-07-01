// Vendored from @ear3/react — will swap back to the npm package once
// it's published. Do not edit here; edit stacy/sdk/ear3-react/src and
// re-copy.

import type { CSSProperties, ReactNode } from 'react'

export interface Ear3SessionResult {
  sessionId: string
  sessionUrl: string
  expiresAt: string | null
}

export interface Ear3SessionError {
  status: number
  message: string
}

export interface Ear3CompletionEvent {
  type: 'ear3:complete'
  sessionId: string
}

export interface Ear3InterviewProps {
  interviewId: string
  publishableKey: string
  metadata?: Record<string, unknown>
  apiBase?: string
  style?: CSSProperties
  className?: string
  loadingFallback?: ReactNode
  errorFallback?: (error: Ear3SessionError) => ReactNode
  onSessionCreated?: (session: Ear3SessionResult) => void
  onComplete?: (event: Ear3CompletionEvent) => void
  onError?: (error: Ear3SessionError) => void
}
