'use client'
import { useEffect, useRef, useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function VisitorChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: "Hi! I'm Mayank's AI assistant. Ask me anything about his research, projects, or background.",
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/visitor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const data = await res.json()
      const reply = res.ok ? data.reply : (data.error || 'Something went wrong.')
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 md:w-96 flex flex-col border border-border bg-void shadow-2xl max-h-[500px]">
          <div className="border-b border-border px-4 py-3 flex items-center justify-between bg-surface">
            <div>
              <p className="font-sans font-medium text-xs uppercase text-soviet tracking-widest">ASK ABOUT MAYANK</p>
              <p className="font-mono text-xs text-ash">AI Assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="font-mono text-ash hover:text-soviet text-lg leading-none">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] text-xs px-3 py-2 leading-relaxed font-sans ${
                  msg.role === 'user'
                    ? 'bg-soviet text-paper'
                    : 'bg-surface border border-border text-paper/80'
                }`}>
                  {msg.role === 'assistant' && <span className="font-mono text-soviet mr-1">&gt;</span>}
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border px-3 py-2">
                  <span className="font-mono text-xs text-ash animate-pulse">&gt; …</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-border p-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask something…"
              className="flex-1 bg-transparent font-mono text-xs text-paper placeholder:text-ash focus:outline-none"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-soviet text-paper font-mono text-xs px-3 py-1.5 hover:bg-glow transition-colors disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="bg-soviet text-paper font-sans font-medium text-xs uppercase tracking-widest px-4 py-2.5 hover:bg-glow transition-colors flex items-center gap-2"
        aria-label="Open chat"
      >
        <span className="text-base leading-none">◎</span>
        {open ? 'CLOSE' : 'ASK ABOUT MAYANK'}
      </button>
    </div>
  )
}
