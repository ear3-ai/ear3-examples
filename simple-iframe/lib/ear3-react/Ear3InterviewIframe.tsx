'use client'

// Vendored from @ear3/react — see types.ts note.

import { useEffect, useRef, useState } from 'react'
import type {
  Ear3InterviewProps,
  Ear3SessionError,
  Ear3SessionResult,
  Ear3CompletionEvent,
} from './types'
import { createSession } from './client'

const DEFAULT_IFRAME_STYLE = {
  width: '100%',
  height: '100%',
  minHeight: 600,
  border: 0,
  borderRadius: 12,
  display: 'block',
} as const

export function Ear3InterviewIframe(props: Ear3InterviewProps) {
  const {
    interviewId,
    publishableKey,
    metadata,
    apiBase,
    style,
    className,
    loadingFallback,
    errorFallback,
    onSessionCreated,
    onComplete,
    onError,
  } = props

  const [session, setSession] = useState<Ear3SessionResult | null>(null)
  const [error, setError] = useState<Ear3SessionError | null>(null)

  const callbacksRef = useRef({ onSessionCreated, onComplete, onError })
  callbacksRef.current = { onSessionCreated, onComplete, onError }

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    setSession(null)
    setError(null)

    createSession({
      interviewId,
      publishableKey,
      metadata,
      apiBase,
      signal: controller.signal,
    })
      .then((result) => {
        if (cancelled) return
        setSession(result)
        callbacksRef.current.onSessionCreated?.(result)
      })
      .catch((err: Error & { status?: number }) => {
        if (cancelled || err.name === 'AbortError') return
        const sessionError: Ear3SessionError = {
          status: err.status ?? 0,
          message: err.message,
        }
        setError(sessionError)
        callbacksRef.current.onError?.(sessionError)
      })

    return () => {
      cancelled = true
      controller.abort()
    }
    // metadata intentionally excluded — recreating the object each parent
    // render would tear down the iframe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId, publishableKey, apiBase])

  useEffect(() => {
    if (!session) return

    function handleMessage(event: MessageEvent) {
      const data = event.data
      if (
        data &&
        typeof data === 'object' &&
        data.type === 'ear3:complete' &&
        data.sessionId === session!.sessionId
      ) {
        callbacksRef.current.onComplete?.(data as Ear3CompletionEvent)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [session])

  if (error) {
    return errorFallback ? (
      <>{errorFallback(error)}</>
    ) : (
      <div role="alert" style={{ padding: 16, color: '#b91c1c' }}>
        Failed to load interview: {error.message}
      </div>
    )
  }

  if (!session) {
    return loadingFallback ? (
      <>{loadingFallback}</>
    ) : (
      <div style={{ padding: 16, color: '#6b7280' }}>Preparing interview…</div>
    )
  }

  return (
    <iframe
      src={session.sessionUrl}
      title="Ear3 interview"
      allow="microphone; camera; autoplay; clipboard-read; clipboard-write; compute-pressure; display-capture"
      style={{ ...DEFAULT_IFRAME_STYLE, ...style }}
      className={className}
    />
  )
}
