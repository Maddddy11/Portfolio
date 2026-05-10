'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const STATUS_LINES = [
  'SYSTEM: ONLINE',
  'ROLE: research_engineer',
  'STATUS: available_q1_2027',
  'LOCATION: 18.5204°N, 73.8567°E',
  'LAST_DEPLOY: auto',
]

const TICKER_ITEMS = [
  'AVAILABLE FOR: research_internships',
  '///',
  'ai_ml_engineering',
  '///',
  'pqc_security',
  '///',
  'start_date: jan_2027',
  '///',
  'contact: mayankrajeshhete@gmail.com',
  '///',
]

const STATS = [
  { value: 3,    suffix: '×',      label: 'SCI Papers' },
  { value: 4,    suffix: '+',      label: 'Projects' },
  { value: 7.89, suffix: '',       label: 'CGPA' },
  { value: 16,   suffix: '-Agent', label: 'Pipeline' },
]

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [statusIdx, setStatusIdx] = useState(0)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentChar, setCurrentChar] = useState(0)
  const [countersVisible, setCountersVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Mouse parallax
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    function handleMouseMove(e: MouseEvent) {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const rx = ((e.clientY - cy) / cy) * -4
      const ry = ((e.clientX - cx) / cx) * 6
      scene!.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    function handleMouseLeave() {
      scene!.style.transform = 'rotateX(0deg) rotateY(0deg)'
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Typewriter status block
  useEffect(() => {
    if (statusIdx >= STATUS_LINES.length) return
    const line = STATUS_LINES[statusIdx]
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 32)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line])
        setStatusIdx(i => i + 1)
        setCurrentChar(0)
      }, 180)
      return () => clearTimeout(t)
    }
  }, [statusIdx, currentChar])

  // Stat counter observer
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCountersVisible(true)
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const partialLine = statusIdx < STATUS_LINES.length
    ? STATUS_LINES[statusIdx].slice(0, currentChar)
    : null

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-transparent pt-[88px]">
      {/* Top ticker */}
      <div className="border-b-8 border-ink bg-soviet overflow-hidden py-3 shrink-0 relative z-10 group cursor-crosshair">
        <div className="ticker-track flex gap-10 font-mono text-base text-paper uppercase tracking-widest font-bold group-hover:[animation-play-state:paused] transition-all duration-300">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={item === '///' ? 'text-ink' : 'group-hover:text-ink transition-colors hover:bg-paper hover:px-2'}>{item}</span>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 w-full py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Left col — 3 of 5 */}
            <div className="lg:col-span-3">
              <div>
                {/* Label */}
                <div className="inline-block bg-ink text-paper px-3 py-1 font-mono text-xs uppercase tracking-widest mb-6 animate-fade-up animation-delay-100">
                  PORTFOLIO // {new Date().getFullYear()}
                </div>

                {/* Name */}
                <h1
                  className="font-display text-[6rem] md:text-[8rem] lg:text-[10rem] uppercase leading-[0.85] tracking-tighter mb-8 animate-fade-up animation-delay-200"
                >
                  <span className="block text-soviet drop-shadow-[4px_4px_0px_#000000]">MAYANK</span>
                  <span className="block text-ink drop-shadow-[4px_4px_0px_#E52E2D]">HETE</span>
                </h1>

                {/* Tagline */}
                <div
                  className="bg-ink border-4 border-soviet p-4 shadow-[8px_8px_0px_0px_#E52E2D] inline-block mb-8 animate-fade-up animation-delay-300"
                >
                  <p className="font-sans text-xl text-paper font-bold max-w-md">
                    BUILDING AGENTIC SYSTEMS FOR HIGH-STAKES DOMAINS.
                  </p>
                </div>

                {/* Terminal status block */}
                <div
                  className="border-4 border-ink bg-paper p-4 font-mono text-sm font-bold mb-8 max-w-sm shadow-[8px_8px_0px_0px_#000000] animate-fade-up animation-delay-400"
                >
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b-4 border-ink">
                    <div className="w-3 h-3 bg-soviet animate-pulse-slow border-2 border-ink" />
                    <span className="text-ink">mayank@portfolio:~$</span>
                  </div>
                  {displayedLines.map((line, i) => (
                    <div key={i} className="text-ink mb-1">
                      <span className="text-soviet mr-2">›</span>{line}
                    </div>
                  ))}
                  {partialLine !== null && (
                    <div className="text-ink">
                      <span className="text-soviet mr-2">›</span>
                      {partialLine}
                      <span className="cursor-blink" />
                    </div>
                  )}
                  {statusIdx >= STATUS_LINES.length && (
                    <div className="mt-1 text-ink/50">
                      <span className="text-soviet mr-2">›</span>
                      <span className="cursor-blink" />
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div
                  className="flex flex-wrap gap-4 animate-fade-up animation-delay-500 mt-12"
                >
                  <Link href="/projects"
                    className="bg-soviet text-paper border-4 border-ink font-display text-xl uppercase tracking-widest px-8 py-4 hover:bg-ink hover:text-paper hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000000] transition-all">
                    VIEW PROJECTS
                  </Link>
                  <Link href="/contact"
                    className="bg-paper text-ink border-4 border-ink font-display text-xl uppercase tracking-widest px-8 py-4 hover:bg-soviet hover:text-paper hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000000] transition-all">
                    GET IN TOUCH
                  </Link>
                  <a href="https://github.com/Rancidcake" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center border-4 border-ink bg-paper text-ink font-mono text-lg font-bold uppercase px-6 hover:bg-ink hover:text-paper transition-all">
                    GITHUB ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right col — 2 of 5 */}
            <div className="lg:col-span-2 hidden lg:block relative pt-14">
              {/* Photo */}
              <div className="relative overflow-hidden border-8 border-ink shadow-[16px_16px_0px_0px_#E52E2D] rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="halftone relative bg-paper">
                  <Image
                    src="/images/hero/mayank-profile.jpg"
                    alt="Mayank Hete"
                    width={520}
                    height={650}
                    className="photo-film w-full object-cover object-top grayscale contrast-125"
                    priority
                  />
                  <div className="absolute inset-0 bg-soviet mix-blend-multiply opacity-40 pointer-events-none" />
                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-12 h-2 bg-paper border border-ink" />
                  <div className="absolute top-4 left-4 w-2 h-12 bg-paper border border-ink" />
                  <div className="absolute bottom-12 right-4 w-12 h-2 bg-ink" />
                  <div className="absolute bottom-12 right-4 w-2 h-12 bg-ink" />
                </div>
                {/* EXIF strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-ink border-t-4 border-paper px-4 py-3">
                  <p className="font-mono text-sm text-paper tracking-widest font-bold">
                    FILE 003/047 · HANOI VN
                  </p>
                </div>
              </div>

              {/* Floating stat badge */}
              <div className="absolute -left-12 top-1/3 border-4 border-ink bg-soviet px-6 py-4 shadow-[8px_8px_0px_0px_#000000] -rotate-6">
                <p className="font-mono text-sm text-paper font-bold uppercase tracking-widest border-b-2 border-ink pb-1 mb-2">SCI 2026</p>
                <p className="font-display text-6xl text-ink leading-none">3×</p>
                <p className="font-mono text-sm font-bold text-ink mt-1 uppercase">Papers</p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-0 border-8 border-ink mt-24 bg-ink shadow-[16px_16px_0px_0px_#E52E2D]">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="bg-paper border-r-4 border-b-4 border-ink last:border-r-0 px-8 py-8 text-center hover:bg-soviet group transition-colors">
                <p className="font-display text-6xl md:text-8xl text-ink group-hover:text-paper mb-2">
                  {countersVisible ? <CountUp to={value} decimals={value % 1 !== 0 ? 2 : 0} /> : '0'}
                  {suffix}
                </p>
                <p className="font-sans font-bold text-lg text-ink group-hover:text-paper uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="border-t-8 border-ink bg-soviet overflow-hidden py-3 shrink-0 relative z-10 group cursor-crosshair">
        <div className="ticker-track flex gap-10 font-mono text-base font-bold text-paper uppercase tracking-widest group-hover:[animation-play-state:paused] transition-all duration-300" style={{ animationDirection: 'reverse' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={item === '///' ? 'text-ink' : 'group-hover:text-ink transition-colors hover:bg-paper hover:px-2'}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const duration = 1400
    const start = performance.now()
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(parseFloat((eased * to).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [to, decimals])
  return <>{val.toFixed(decimals)}</>
}
