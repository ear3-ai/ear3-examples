import Link from 'next/link'

export default function DonePage({
  searchParams,
}: {
  searchParams: { session?: string }
}) {
  const sessionId = searchParams.session

  return (
    <main
      style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: '96px 24px 48px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
        Thanks for taking the interview
      </h1>
      <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24, lineHeight: 1.55 }}>
        The server will receive a signed <code>interview.completed</code>{' '}
        webhook shortly — check your logs.
      </p>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>Session id:</p>
      <code
        style={{
          display: 'inline-block',
          padding: '6px 12px',
          background: 'rgba(0,0,0,0.05)',
          borderRadius: 6,
          fontSize: 13,
          marginBottom: 32,
        }}
      >
        {sessionId ?? '(not provided)'}
      </code>
      <div>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: 8,
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          ← Back to start
        </Link>
      </div>
    </main>
  )
}
