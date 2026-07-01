import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Ear3 · simple-webhook example',
  description: 'End-to-end Ear3 flow: iframe embed + signed webhook handler',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
          background: '#fafaf9',
          color: '#0f172a',
        }}
      >
        {children}
      </body>
    </html>
  )
}
