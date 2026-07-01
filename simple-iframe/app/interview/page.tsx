'use client'

import { Ear3InterviewIframe } from '@/lib/ear3-react'
import { useRouter } from 'next/navigation'

export default function InterviewPage() {
  const router = useRouter()

  return (
    <main
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '32px 16px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Ear3InterviewIframe
        interviewId={process.env.NEXT_PUBLIC_EAR3_INTERVIEW_ID!}
        publishableKey={process.env.NEXT_PUBLIC_EAR3_PUBLISHABLE_KEY!}
        style={{ flex: 1, minHeight: 600 }}
        onComplete={(event) => {
          router.push(`/done?session=${event.sessionId}`)
        }}
        onError={(err) => {
          alert(`Interview failed to load: ${err.message}`)
        }}
      />
    </main>
  )
}
