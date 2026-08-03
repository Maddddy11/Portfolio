'use client'
import { useState, useRef, useEffect, FormEvent } from 'react'
import DiffPreview from './DiffPreview'
import * as jsonpatch from 'fast-json-patch'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Proposal {
  patches: jsonpatch.Operation[]
  summary: string
  file: string
  sha: string
  currentContent: string
}

const FILES = [
  'projects.json',
  'publications.json',
  'experience.json',
  'achievements.json',
  'news.json',
  'profile.json',
  'hero.json',
]

export default function EditChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(FILES[0])
  const [loading, setLoading] = useState(false)
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [applying, setApplying] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(e: FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg: Message = { role: 'user', content: input.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)
    setProposal(null)
    setSuccessMsg('')

    try {
      const res = await fetch('/api/admin/edit/propose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, file: selectedFile }),
      })
      const data = await res.json()

      if (!res.ok) {
        setMessages(m => [...m, { role: 'assistant', content: `Error: ${data.error}` }])
      } else {
        setProposal(data)
        setMessages(m => [...m, {
          role: 'assistant',
          content: data.patches.length > 0
            ? `I've prepared ${data.patches.length} change(s): ${data.summary}\n\nReview the diff on the right, then click **Apply** to commit.`
            : data.summary,
        }])
      }
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Network error. Please try again.' }])
    }

    setLoading(false)
  }

  async function applyProposal() {
    if (!proposal || applying) return
    setApplying(true)

    try {
      const res = await fetch('/api/admin/edit/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patches: proposal.patches,
          file: proposal.file,
          sha: proposal.sha,
          currentContent: proposal.currentContent,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setMessages(m => [...m, { role: 'assistant', content: `Apply failed: ${data.error}` }])
      } else {
        setSuccessMsg(`Committed to GitHub. Vercel redeploy triggered.`)
        setProposal(null)
        setMessages(m => [...m, { role: 'assistant', content: 'Changes applied and committed.' }])
      }
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Network error during apply.' }])
    }

    setApplying(false)
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] md:h-screen flex flex-col md:flex-row">
      {/* Chat panel */}
      <div className="flex-1 flex flex-col border-r border-border min-w-0">
        {/* Header */}
        <div className="flex items-center gap-4 px-5 py-3 border-b border-border bg-surface">
          <div className="flex-1">
            <p className="font-mono text-xs text-soviet uppercase tracking-widest">// CONTENT EDITOR</p>
          </div>
          <select
            value={selectedFile}
            onChange={e => { setSelectedFile(e.target.value); setProposal(null); setMessages([]) }}
            className="font-mono text-xs bg-void border border-border text-paper px-2 py-1.5 focus:outline-none focus:border-soviet"
          >
            {FILES.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 && (
            <div className="text-center mt-16">
              <p className="font-mono text-xs text-ash">Describe a change to <span className="text-amber">{selectedFile}</span></p>
              <p className="font-mono text-xs text-ash/50 mt-1">e.g. &quot;Update the tagline in hero.json to say X&quot;</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-soviet/20 border border-soviet/30 text-paper font-sans'
                  : 'bg-surface border border-border text-paper/90 font-mono text-xs'
              }`}>
                {msg.content.split('\n').map((line, j) => (
                  <p key={j}>{line || <br />}</p>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-surface border border-border px-4 py-3">
                <span className="font-mono text-xs text-ash animate-pulse">processing…</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Action buttons */}
        {proposal && proposal.patches.length > 0 && (
          <div className="px-5 py-3 border-t border-border bg-surface flex items-center gap-3">
            {successMsg ? (
              <p className="font-mono text-xs text-amber">{successMsg}</p>
            ) : (
              <>
                <button
                  onClick={applyProposal}
                  disabled={applying}
                  className="bg-soviet text-paper font-mono text-xs uppercase tracking-widest px-5 py-2 hover:bg-glow transition-colors disabled:opacity-50"
                >
                  {applying ? 'APPLYING…' : 'APPLY CHANGES'}
                </button>
                <button
                  onClick={() => setProposal(null)}
                  className="font-mono text-xs text-ash hover:text-paper transition-colors"
                >
                  DISCARD
                </button>
              </>
            )}
          </div>
        )}

        {/* Input */}
        <form onSubmit={sendMessage} className="border-t border-border p-4 flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe the change you want to make…"
            className="flex-1 bg-void border border-border text-paper font-mono text-sm px-4 py-2.5 focus:outline-none focus:border-soviet placeholder:text-ash/40"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-soviet text-paper font-mono text-xs uppercase tracking-widest px-4 hover:bg-glow transition-colors disabled:opacity-50"
          >
            SEND
          </button>
        </form>
      </div>

      {/* Diff panel */}
      <div className="hidden md:flex flex-1 flex-col bg-void">
        {proposal && proposal.patches.length > 0 ? (
          <DiffPreview currentContent={proposal.currentContent} patches={proposal.patches} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-mono text-xs text-ash/40">Diff will appear here after a proposal</p>
          </div>
        )}
      </div>
    </div>
  )
}
