import { Octokit } from '@octokit/rest'

let _octokit: Octokit | null = null

function getOctokit(): Octokit {
  if (!_octokit) {
    _octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  }
  return _octokit
}

function getRepoConfig() {
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH ?? 'main'
  if (!owner || !repo) throw new Error('GITHUB_OWNER and GITHUB_REPO must be set')
  return { owner, repo, branch }
}

export async function getFileContent(filePath: string): Promise<{ content: string; sha: string }> {
  const octokit = getOctokit()
  const { owner, repo, branch } = getRepoConfig()

  const response = await octokit.repos.getContent({ owner, repo, path: filePath, ref: branch })
  const data = response.data as { content: string; sha: string }

  const decoded = Buffer.from(data.content, 'base64').toString('utf-8')
  return { content: decoded, sha: data.sha }
}

export async function commitFile(
  filePath: string,
  content: string,
  message: string,
  sha: string,
): Promise<void> {
  const octokit = getOctokit()
  const { owner, repo, branch } = getRepoConfig()

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message,
    content: Buffer.from(content).toString('base64'),
    sha,
    branch,
  })
}

export async function uploadImage(
  filePath: string,
  base64Content: string,
  message: string,
): Promise<void> {
  const octokit = getOctokit()
  const { owner, repo, branch } = getRepoConfig()

  let sha: string | undefined
  try {
    const existing = await octokit.repos.getContent({ owner, repo, path: filePath, ref: branch })
    sha = (existing.data as { sha: string }).sha
  } catch {
    // file does not exist yet, no sha needed
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message,
    content: base64Content,
    ...(sha ? { sha } : {}),
    branch,
  })
}
