import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import * as fs from 'fs'
import * as path from 'path'
import * as jsonpatch from 'fast-json-patch'

const CONTENT_DIR = path.join(process.cwd(), 'content')
const VALID_FILES = ['projects.json', 'publications.json', 'experience.json', 'achievements.json', 'news.json', 'profile.json', 'hero.json']

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { patches, file, currentContent } = await req.json()

  if (!file || !currentContent || !Array.isArray(patches)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!VALID_FILES.includes(file)) {
    return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
  }

  const filePath = path.join(CONTENT_DIR, file)
  if (!filePath.startsWith(CONTENT_DIR)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  let patched: unknown
  try {
    const doc = JSON.parse(currentContent)
    const result = jsonpatch.applyPatch(doc, patches, true, false)
    patched = result.newDocument ?? doc
    // Validate it's valid JSON
    JSON.stringify(patched)
  } catch (err) {
    return NextResponse.json(
      { error: `Apply failed: ${(err as Error).message}` },
      { status: 422 },
    )
  }

  const newContent = JSON.stringify(patched, null, 2) + '\n'

  try {
    fs.writeFileSync(filePath, newContent, 'utf-8')
    console.log(`[v0] Updated ${file}`)
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to write file: ${(err as Error).message}` },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, newContent })
}
