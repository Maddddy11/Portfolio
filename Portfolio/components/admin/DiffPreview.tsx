'use client'
import { useMemo } from 'react'
import * as jsonpatch from 'fast-json-patch'

interface Props {
  currentContent: string
  patches: jsonpatch.Operation[]
}

export default function DiffPreview({ currentContent, patches }: Props) {
  const { patchedContent, error } = useMemo(() => {
    try {
      const doc = JSON.parse(currentContent)
      const result = jsonpatch.applyPatch(JSON.parse(JSON.stringify(doc)), patches, false, false)
      return { patchedContent: JSON.stringify(result.newDocument ?? doc, null, 2), error: null }
    } catch (e) {
      return { patchedContent: null, error: (e as Error).message }
    }
  }, [currentContent, patches])

  if (error) {
    return (
      <div className="bg-soviet/10 border border-soviet p-4">
        <p className="font-mono text-xs text-soviet">PATCH ERROR: {error}</p>
      </div>
    )
  }

  const currentLines = currentContent.split('\n')
  const patchedLines = (patchedContent ?? '').split('\n')

  const maxLen = Math.max(currentLines.length, patchedLines.length)
  const diffLines: { left: string; right: string; changed: boolean }[] = []

  for (let i = 0; i < maxLen; i++) {
    const left = currentLines[i] ?? ''
    const right = patchedLines[i] ?? ''
    diffLines.push({ left, right, changed: left !== right })
  }

  const changedCount = diffLines.filter(l => l.changed).length

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
        <p className="font-mono text-xs text-ash uppercase tracking-wider">DIFF PREVIEW</p>
        <p className="font-mono text-xs text-amber">{changedCount} line{changedCount !== 1 ? 's' : ''} changed</p>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 divide-x divide-border text-xs font-mono">
          <div className="px-2 py-1 bg-soviet/5 text-ash/60">BEFORE</div>
          <div className="px-2 py-1 bg-amber/5 text-ash/60">AFTER</div>
          {diffLines.map((line, i) => (
            <>
              <div
                key={`l-${i}`}
                className={`px-3 py-0.5 whitespace-pre overflow-x-auto ${
                  line.changed ? 'bg-soviet/10 text-paper' : 'text-ash/70'
                }`}
              >
                <span className="select-none text-ash/30 mr-3">{i + 1}</span>
                {line.left}
              </div>
              <div
                key={`r-${i}`}
                className={`px-3 py-0.5 whitespace-pre overflow-x-auto ${
                  line.changed ? 'bg-amber/10 text-paper' : 'text-ash/70'
                }`}
              >
                <span className="select-none text-ash/30 mr-3">{i + 1}</span>
                {line.right}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
