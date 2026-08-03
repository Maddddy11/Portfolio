import fs from 'fs/promises'
import path from 'path'
import {
  ContentFileMap,
  type Project,
  type Publication,
  type Experience,
  type Achievement,
  type NewsItem,
  type Profile,
  type Hero,
  type Meta,
} from './schemas'

const CONTENT_DIR = path.join(process.cwd(), 'content')

async function readContent<T>(key: keyof typeof ContentFileMap): Promise<T> {
  const { schema, file } = ContentFileMap[key]
  const raw = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8')
  return schema.parse(JSON.parse(raw)) as T
}

export async function getProjects(): Promise<Project[]> {
  const projects = await readContent<Project[]>('projects')
  return projects.sort((a, b) => a.display_order - b.display_order)
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find(p => p.slug === slug) ?? null
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects()
  return projects.filter(p => p.featured)
}

export async function getPublications(): Promise<Publication[]> {
  const pubs = await readContent<Publication[]>('publications')
  return pubs.sort((a, b) => a.display_order - b.display_order)
}

export async function getExperience(): Promise<Experience[]> {
  const exp = await readContent<Experience[]>('experience')
  return exp.sort((a, b) => a.display_order - b.display_order)
}

export async function getAchievements(): Promise<Achievement[]> {
  const ach = await readContent<Achievement[]>('achievements')
  return ach.sort((a, b) => a.display_order - b.display_order)
}

export async function getNews(publishedOnly = true): Promise<NewsItem[]> {
  const news = await readContent<NewsItem[]>('news')
  const filtered = publishedOnly ? news.filter(n => n.published) : news
  return filtered.sort((a, b) => a.display_order - b.display_order)
}

export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  const news = await getNews()
  return news.find(n => n.slug === slug) ?? null
}

export async function getProfile(): Promise<Profile> {
  return readContent<Profile>('profile')
}

export async function getHero(): Promise<Hero> {
  return readContent<Hero>('hero')
}

export async function getMeta(): Promise<Meta> {
  return readContent<Meta>('meta')
}

export async function getRawFile(filename: string): Promise<string> {
  return fs.readFile(path.join(CONTENT_DIR, filename), 'utf-8')
}
