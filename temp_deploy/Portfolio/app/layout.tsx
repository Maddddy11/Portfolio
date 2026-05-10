import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Mayank Hete — Agentic AI & Post-Quantum Cryptography',
    template: '%s | Mayank Hete',
  },
  description:
    'Final-year CS engineer at Symbiosis Institute of Technology, Pune. Building at the intersection of Agentic AI, Post-Quantum Cryptography, and ML governance. 3× SCI-indexed researcher.',
  keywords: ['Mayank Hete', 'Agentic AI', 'Post-Quantum Cryptography', 'PQC', 'Machine Learning', 'SIT Pune', 'CRYSTALS-Dilithium', 'Multi-agent LLM'],
  authors: [{ name: 'Mayank Hete', url: 'https://linkedin.com/in/mayankhete' }],
  creator: 'Mayank Hete',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Mayank Hete',
    title: 'Mayank Hete — Agentic AI & Post-Quantum Cryptography',
    description: 'Final-year CS engineer at SIT Pune. 3× SCI-indexed researcher. Building at the frontier of Agentic AI and PQC.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Mayank Hete' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mayank Hete — Agentic AI & PQC',
    description: 'Final-year CS engineer at SIT Pune. 3× SCI-indexed researcher.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

import BootSequence from '@/components/ui/BootSequence'
import TerminalDrawer from '@/components/ui/TerminalDrawer'
import PageDecorations from '@/components/ui/PageDecorations'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${bebasNeue.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased bg-paper text-void`}>
        <BootSequence />
        <TerminalDrawer />
        <PageDecorations />
        <div className="fixed inset-0 grid-bg opacity-60 pointer-events-none z-0"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
