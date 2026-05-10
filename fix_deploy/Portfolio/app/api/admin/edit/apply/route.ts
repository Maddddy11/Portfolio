import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { commitFile } from '@/lib/github'
import { ContentFileMap, type ContentKey } from '@/lib/schemas'
import * as jsonpatch from 'fast-json-patch'

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { patches, file, sha, currentContent, commitMessage } = await req.json()

  if (!file || !sha || !currentContent || !Array.isArray(patches)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const fileKey = file.replace('.json', '') as ContentKey

  if (!(fileKey in ContentFileMap)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  let patched: unknown
  try {
    const doc = JSON.parse(currentContent)
    const result = jsonpatch.applyPatch(doc, patches, true, false)
    patched = result.newDocument ?? doc
    const { schema } = ContentFileMap[fileKey]
    schema.parse(patched)
  } catch (err) {
    return NextResponse.json(
      { error: `Apply failed: ${(err as Error).message}` },
      { status: 422 },
    )
  }

  const newContent = JSON.stringify(patched, null, 2) + '\n'
  const message = commitMessage ?? `content: update ${file} via admin chatbot`

  try {
    await commitFile(`content/${file}`, newContent, message, sha)
  } catch (err) {
    return NextResponse.json(
      { error: `GitHub commit failed: ${(err as Error).message}` },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, newContent })
}
