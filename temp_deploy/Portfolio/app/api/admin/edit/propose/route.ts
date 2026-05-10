import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { getFileContent } from '@/lib/github'
import { getGroq } from '@/lib/groq'
import { ContentFileMap, type ContentKey } from '@/lib/schemas'
import * as jsonpatch from 'fast-json-patch'

const CONTENT_FILES = Object.keys(ContentFileMap)

const SYSTEM_PROMPT = `You are a content editor for a personal portfolio website. You help the admin update portfolio content stored in JSON files.

When the admin describes a change, you must:
1. Understand what they want to change
2. Return ONLY a valid JSON object with two fields:
   - "patches": an array of RFC 6902 JSON Patch operations (op, path, value)
   - "summary": a brief human-readable description of what will change

The JSON files you can edit are: ${CONTENT_FILES.join(', ')}

Rules:
- Use RFC 6902 operations: "add", "remove", "replace"
- Paths must use "/" notation (e.g., "/0/title" for first array item's title)
- Never invent data — only use what the admin provides
- If the requested change is ambiguous, ask for clarification in the summary field and return an empty patches array
- Keep the summary under 80 characters`

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { messages, file } = await req.json()

  if (!file || !CONTENT_FILES.includes(file)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  const fileKey = file.replace('.json', '') as ContentKey
  let currentContent: string
  let sha: string

  try {
    const result = await getFileContent(`content/${file}`)
    currentContent = result.content
    sha = result.sha
  } catch {
    return NextResponse.json({ error: 'Failed to read file from GitHub' }, { status: 500 })
  }

  const parsedCurrent = JSON.parse(currentContent)

  const groq = getGroq()
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Current ${file} content:\n\`\`\`json\n${currentContent}\n\`\`\`` },
      ...messages,
    ],
    temperature: 0.2,
  })

  const raw = response.choices[0].message.content ?? '{}'
  let parsed: { patches: jsonpatch.Operation[]; summary: string }

  try {
    parsed = JSON.parse(raw)
    if (!Array.isArray(parsed.patches)) throw new Error('patches must be array')
  } catch {
    return NextResponse.json({ error: 'LLM returned invalid JSON' }, { status: 500 })
  }

  // Validate patches without applying
  const testDoc = JSON.parse(JSON.stringify(parsedCurrent))
  try {
    const result = jsonpatch.applyPatch(testDoc, parsed.patches, true, false)
    const patched = result.newDocument ?? testDoc
    // Validate against schema
    const { schema } = ContentFileMap[fileKey]
    schema.parse(patched)
  } catch (err) {
    return NextResponse.json(
      { error: `Patch validation failed: ${(err as Error).message}` },
      { status: 422 },
    )
  }

  return NextResponse.json({
    patches: parsed.patches,
    summary: parsed.summary,
    file,
    sha,
    currentContent,
  })
}
