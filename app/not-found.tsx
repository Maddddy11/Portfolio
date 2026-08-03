import Link from 'next/link'
import { Bebas_Neue, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-soviet flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 halftone mix-blend-multiply opacity-50" />
      
      <div className="relative z-10 bg-ink p-8 md:p-16 border-8 border-paper shadow-[16px_16px_0px_0px_#000000] rotate-2 max-w-4xl w-full text-center">
        <p className="font-mono text-paper font-bold tracking-widest uppercase mb-4 animate-pulse-slow">
          // SYSTEM FAULT 404
        </p>
        
        <h1 className="font-display text-7xl md:text-[10rem] text-soviet leading-none uppercase tracking-tighter mb-6 drop-shadow-[8px_8px_0px_#F4F0E6]">
          DIRECTORY<br />NOT FOUND
        </h1>
        
        <p className="font-sans text-xl md:text-2xl font-bold text-paper mb-12 max-w-xl mx-auto uppercase">
          The requested path does not exist in the current construct. Return to the active sector immediately.
        </p>
        
        <Link 
          href="/"
          className="inline-block bg-paper text-ink font-display text-3xl uppercase tracking-widest px-12 py-6 border-4 border-ink shadow-[8px_8px_0px_0px_#E52E2D] hover:bg-soviet hover:text-paper hover:shadow-[0px_0px_0px_0px_#E52E2D] hover:translate-y-2 hover:translate-x-2 transition-all"
        >
          RETURN TO HOME
        </Link>
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-4 bg-ink z-10" />
      <div className="absolute top-8 left-8 w-4 h-16 bg-ink z-10" />
      
      <div className="absolute bottom-8 right-8 w-16 h-4 bg-ink z-10" />
      <div className="absolute bottom-8 right-8 w-4 h-16 bg-ink z-10" />
    </div>
  )
}
