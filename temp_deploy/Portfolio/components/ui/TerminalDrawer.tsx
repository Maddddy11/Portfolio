'use client'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Log = { id: string; text: string; type: 'cmd' | 'res' }

export default function TerminalDrawer() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState<Log[]>([
    { id: 'boot', text: 'Type `help` for available commands. Press ` or ESC to close.', type: 'res' }
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '`') {
        e.preventDefault()
        setOpen(o => !o)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  const executeCommand = (cmd: string) => {
    const c = cmd.trim().toLowerCase()
    let response = ''

    if (c === 'clear') {
      setLogs([])
      return
    }

    switch (c) {
      case 'help':
        response = 'AVAILABLE COMMANDS: whoami, contact, skills, clear, exit'
        break
      case 'whoami':
        response = 'MAYANK HETE. 3x SCI-Indexed Researcher. Building Agentic Systems & Post-Quantum Cryptography implementations.'
        break
      case 'contact':
        response = 'EMAIL: mayankrajeshhete@gmail.com | GITHUB: github.com/Rancidcake'
        break
      case 'skills':
        response = 'LOADED MODULES: Python, Agentic AI, LangChain, EU AI Act, QKD, Rust.'
        break
      case 'exit':
        setOpen(false)
        response = 'TERMINAL CLOSED.'
        break
      case '':
        response = ''
        break
      default:
        response = `COMMAND NOT FOUND: ${c}. Type 'help' for a list of commands.`
    }

    const newLogs: Log[] = [{ id: Date.now().toString() + 'c', text: `mayank@pizda:~$ ${cmd}`, type: 'cmd' }]
    if (response) {
      newLogs.push({ id: Date.now().toString() + 'r', text: response, type: 'res' })
    }

    setLogs(prev => [...prev, ...newLogs])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
    setInput('')
  }

  return (
    <>
      <button 
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-ink text-paper font-mono text-sm font-bold border-4 border-soviet px-4 py-2 shadow-[4px_4px_0px_0px_#E52E2D] hover:bg-soviet hover:text-ink transition-colors"
      >
        [ &gt;_ ]
      </button>

      <div 
        className={cn(
          'fixed bottom-0 left-0 right-0 h-1/2 md:h-[400px] bg-ink border-t-8 border-soviet z-[100] p-6 shadow-[0px_-8px_0px_0px_#000000] font-mono transition-transform duration-300 flex flex-col',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex items-center justify-between border-b-4 border-soviet pb-2 mb-4 shrink-0">
          <span className="text-soviet font-bold text-lg uppercase tracking-widest">// SECURE TERMINAL</span>
          <button onClick={() => setOpen(false)} className="text-paper hover:text-soviet font-bold">[ CLOSE ]</button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-hide">
          {logs.map((log) => (
            <div key={log.id} className={log.type === 'cmd' ? 'text-paper' : 'text-soviet font-bold'}>
              {log.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-3 shrink-0">
          <span className="text-soviet font-bold">mayank@pizda:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-paper font-mono"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </>
  )
}
