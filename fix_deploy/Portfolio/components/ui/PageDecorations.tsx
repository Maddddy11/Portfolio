'use client'

export default function PageDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden mix-blend-multiply opacity-40">
      {/* Corner Coordinates */}
      <div className="absolute top-24 left-6 font-mono text-[10px] text-soviet font-bold tracking-tighter vertical-text">
        LAT: 18.5204° N // LON: 73.8567° E
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-soviet font-bold text-right">
        SYSTEM_VER: 4.2.0-SOVIET-BRUTALIST<br />
        SECURE_CONNECTION_ESTABLISHED
      </div>

      {/* Axis Lines */}
      <div className="absolute top-0 left-12 w-px h-screen bg-soviet/10" />
      <div className="absolute top-32 left-0 w-screen h-px bg-soviet/10" />

      {/* Stamp */}
      <div className="absolute top-1/2 -right-12 -rotate-90 origin-center border-4 border-soviet px-4 py-1 text-soviet font-display text-4xl opacity-20 uppercase tracking-[0.5em]">
        Top Secret // For Research Only
      </div>
      
      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  )
}
