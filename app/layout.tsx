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
    default: 'Mayank Hete — AI Governance & Security',
    template: '%s | Mayank Hete',
  },
  description:
    'Computer Science student at Symbiosis Institute of Technology, Pune, focused on AI governance, data protection technology, and AI security. 5× peer-reviewed researcher.',
  keywords: ['Mayank Hete', 'AI Governance', 'Data Protection', 'AI Security', 'EU AI Act', 'GDPR', 'DPDP Act', 'SIT Pune', 'LLM'],
  authors: [{ name: 'Mayank Hete', url: 'https://linkedin.com/in/mayankhete' }],
  creator: 'Mayank Hete',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Mayank Hete',
    title: 'Mayank Hete — AI Governance & Security',
    description: 'Computer Science student at SIT Pune focused on AI governance, data protection technology, and AI security.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Mayank Hete' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mayank Hete — AI Governance & Security',
    description: 'Computer Science student at SIT Pune focused on AI governance, data protection technology, and AI security.',
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
import { VisitorTracker } from '@/components/VisitorTracker'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${bebasNeue.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased bg-paper text-void`}>
        <VisitorTracker />
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
