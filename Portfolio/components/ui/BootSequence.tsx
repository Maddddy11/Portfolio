'use client'
import { useState, useEffect } from 'react'

export default function BootSequence() {
  const [show, setShow] = useState(true)
  const [step, setStep] = useState(0)

  useEffect(() => {
    // Check if we've already booted this session
    if (sessionStorage.getItem('booted')) {
      setShow(false)
      return
    }

    // Progression of the boot sequence
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1200),
      setTimeout(() => setStep(4), 1600),
      setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('booted', 'true')
      }, 2000)
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[99999] bg-ink flex flex-col justify-center px-8 font-mono text-paper text-sm md:text-base cursor-wait">
      <div className="max-w-3xl mx-auto w-full">
        <div className="border-4 border-soviet p-8 relative">
          <div className="absolute top-0 left-0 w-3 h-3 bg-soviet -translate-x-1.5 -translate-y-1.5" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-soviet translate-x-1.5 -translate-y-1.5" />
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-soviet -translate-x-1.5 translate-y-1.5" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-soviet translate-x-1.5 translate-y-1.5" />

          <p className="text-soviet mb-6 animate-pulse-slow font-bold text-xl uppercase tracking-widest">// INITIALIZING PIZDA KERNEL...</p>
          
          <div className="space-y-3 font-bold">
            <p className={`transition-opacity duration-150 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-soviet mr-3">[OK]</span> MOUNTING AGENTIC SYSTEMS...
            </p>
            <p className={`transition-opacity duration-150 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-soviet mr-3">[OK]</span> LOADING EU AI ACT PROTOCOLS...
            </p>
            <p className={`transition-opacity duration-150 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-soviet mr-3">[OK]</span> DECRYPTING POST-QUANTUM KEYS...
            </p>
            <p className={`mt-8 text-paper bg-soviet inline-block px-3 py-1 transition-opacity duration-150 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
              ENTERING SAFE MODE // READY
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
