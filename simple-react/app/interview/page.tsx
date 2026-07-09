'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { VoiceClient, VoiceProvider, VoiceAgent } from '@ear3/voice'

export default function InterviewPage() {
  const router = useRouter()

  const client = useMemo(
    () =>
      new VoiceClient({
        interviewId: process.env.NEXT_PUBLIC_EAR3_INTERVIEW_ID!,
        publishableKey: process.env.NEXT_PUBLIC_EAR3_PUBLISHABLE_KEY!,
      }),
    [],
  )

  useEffect(() => {
    const onComplete = (sessionId: string) => {
      router.push(`/done?session=${sessionId}`)
    }
    const onError = (err: { message: string }) => {
      alert(`Interview failed: ${err.message}`)
    }
    client.on('complete', onComplete)
    client.on('error', onError)
    client.connect()
    return () => {
      client.off('complete', onComplete)
      client.off('error', onError)
      client.disconnect()
    }
  }, [client, router])

  return (
    <main
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '32px 16px',
      }}
    >
      <VoiceProvider client={client}>
        <VoiceAgent />
      </VoiceProvider>
    </main>
  )
}
