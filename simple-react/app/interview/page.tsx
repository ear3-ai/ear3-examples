'use client'

import { Ear3Interview } from '@ear3/react'
import { useRouter } from 'next/navigation'

export default function InterviewPage() {
  const router = useRouter()

  return (
    <main
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '32px 16px',
      }}
    >
      <Ear3Interview
        interviewId={process.env.NEXT_PUBLIC_EAR3_INTERVIEW_ID!}
        publishableKey={process.env.NEXT_PUBLIC_EAR3_PUBLISHABLE_KEY!}
        onComplete={(event) => {
          router.push(`/done?session=${event.sessionId}`)
        }}
        onError={(err) => {
          alert(`Interview failed: ${err.message}`)
        }}
      />
    </main>
  )
}
