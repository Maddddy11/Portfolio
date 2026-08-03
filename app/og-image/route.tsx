import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A14',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Red left border */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: '#C1121F' }} />
        {/* Gold bottom bar */}
        <div style={{ position: 'absolute', bottom: 60, left: 60, width: 300, height: 3, background: '#C9A227' }} />

        <div style={{ color: '#C1121F', fontSize: 16, fontFamily: 'monospace', marginBottom: 24, letterSpacing: 4 }}>
          // MAYANK HETE · PORTFOLIO
        </div>

        <div style={{ color: '#F0EBE0', fontSize: 84, fontWeight: 900, lineHeight: 1, letterSpacing: -2, marginBottom: 8 }}>
          MAYANK
        </div>
        <div style={{ color: '#C1121F', fontSize: 84, fontWeight: 900, lineHeight: 1, letterSpacing: -2, marginBottom: 40 }}>
          HETE
        </div>

        <div style={{ color: '#C9A227', fontSize: 28, marginBottom: 16 }}>
          Agentic AI · Post-Quantum Cryptography · ML Governance
        </div>

        <div style={{ color: '#8A8A8A', fontSize: 20, fontFamily: 'monospace' }}>
          Final-year B.Tech CSE · SIT Pune · 3× SCI 2026 Researcher
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
