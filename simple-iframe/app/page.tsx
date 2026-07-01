import Link from 'next/link'

export default function LandingPage() {
  return (
    <main
      style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: '96px 24px 48px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
        Ear3 · simple-embed
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: '#475569', marginBottom: 32 }}>
        Minimal example. When you click below, the next page mounts an
        {' '}
        <code style={{ padding: '2px 5px', background: 'rgba(230,92,0,0.08)', color: '#E65C00', borderRadius: 4, fontSize: 13 }}>
          &lt;Ear3InterviewIframe&gt;
        </code>{' '}
        pointing at your interview id.
      </p>
      <Link
        href="/interview"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: '#E65C00',
          color: 'white',
          borderRadius: 8,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Start the interview →
      </Link>
    </main>
  )
}
