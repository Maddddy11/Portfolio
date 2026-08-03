'use client'
import { useState, useEffect, useCallback } from 'react'

const FILES = [
  'projects.json',
  'publications.json',
  'experience.json',
  'achievements.json',
  'profile.json',
  'hero.json',
]

export default function JsonEditor() {
  const [selectedFile, setSelectedFile] = useState(FILES[0])
  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [jsonError, setJsonError] = useState('')

  const loadFile = useCallback(async (file: string) => {
    setLoading(true)
    setError('')
    setSuccess('')
    setJsonError('')
    try {
      const res = await fetch(`/api/admin/edit/load?file=${encodeURIComponent(file)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to load file')
      } else {
        const formatted = JSON.stringify(JSON.parse(data.content), null, 2)
        setContent(formatted)
        setOriginalContent(formatted)
      }
    } catch {
      setError('Network error loading file')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadFile(selectedFile)
  }, [selectedFile, loadFile])

  function handleChange(val: string) {
    setContent(val)
    setSuccess('')
    try {
      JSON.parse(val)
      setJsonError('')
    } catch (e) {
      setJsonError((e as Error).message)
    }
  }

  function formatJson() {
    try {
      setContent(JSON.stringify(JSON.parse(content), null, 2))
      setJsonError('')
    } catch {
      // error already showing
    }
  }

  function resetToOriginal() {
    setContent(originalContent)
    setJsonError('')
    setSuccess('')
  }

  async function save() {
    if (jsonError || saving || !isDirty) return
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/admin/edit/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: selectedFile, content }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Save failed')
      } else {
        setSuccess(`Saved ${selectedFile}`)
        setOriginalContent(content)
      }
    } catch {
      setError('Network error — save failed')
    }
    setSaving(false)
  }

  const isDirty = content !== originalContent

  return (
    <div className="h-[calc(100vh-3.5rem)] md:h-screen flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-surface flex-wrap">
        <p className="font-mono text-xs text-soviet uppercase tracking-widest shrink-0">// JSON EDITOR</p>
        <select
          value={selectedFile}
          onChange={e => setSelectedFile(e.target.value)}
          className="font-mono text-xs bg-void border border-border text-paper px-2 py-1.5 focus:outline-none focus:border-soviet"
        >
          {FILES.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <div className="flex-1" />
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={formatJson}
            disabled={loading || !!jsonError}
            className="font-mono text-xs text-ash hover:text-paper transition-colors px-3 py-1.5 border border-border hover:border-paper disabled:opacity-40"
          >
            FORMAT
          </button>
          <button
            onClick={resetToOriginal}
            disabled={!isDirty || loading}
            className="font-mono text-xs text-ash hover:text-paper transition-colors px-3 py-1.5 border border-border hover:border-paper disabled:opacity-40"
          >
            RESET
          </button>
          <button
            onClick={save}
            disabled={!!jsonError || !isDirty || saving || loading}
            className="bg-soviet text-paper font-mono text-xs uppercase tracking-widest px-5 py-1.5 hover:bg-glow transition-colors disabled:opacity-50"
          >
            {saving ? 'SAVING…' : 'SAVE'}
          </button>
        </div>
      </div>

      {/* Status bar */}
      {(jsonError || error || success) && (
        <div className={`px-5 py-2 border-b border-border font-mono text-xs ${
          jsonError || error ? 'bg-soviet/10 text-soviet' : 'bg-surface text-amber'
        }`}>
          {jsonError ? `JSON Error: ${jsonError}` : error ? `Error: ${error}` : `✓ ${success}`}
        </div>
      )}

      {/* Hint bar */}
      {!jsonError && !error && !success && isDirty && (
        <div className="px-5 py-1.5 border-b border-border font-mono text-xs text-ash/60 bg-void">
          Unsaved changes — click SAVE when ready
        </div>
      )}

      {/* Editor area */}
      <div className="flex-1 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs text-ash animate-pulse">loading {selectedFile}…</span>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={e => handleChange(e.target.value)}
            spellCheck={false}
            className="absolute inset-0 w-full h-full bg-void text-paper font-mono text-xs p-5 resize-none focus:outline-none leading-relaxed"
          />
        )}
      </div>

      {/* Footer info */}
      <div className="px-5 py-2 border-t border-border bg-surface flex items-center justify-between">
        <span className="font-mono text-xs text-ash/50">{selectedFile}</span>
        <span className="font-mono text-xs text-ash/50">
          {content.split('\n').length} lines · {new Blob([content]).size} bytes
        </span>
      </div>
    </div>
  )
}
