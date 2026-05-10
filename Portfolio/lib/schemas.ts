import { z } from 'zod'

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  body_md: z.string(),
  tech_stack: z.array(z.string()),
  tags: z.array(z.string()),
  repo_url: z.string().nullable(),
  demo_url: z.string().nullable(),
  image: z.string().nullable(),
  featured: z.boolean(),
  display_order: z.number(),
})
export type Project = z.infer<typeof ProjectSchema>

export const PublicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  venue: z.string(),
  venue_short: z.string(),
  location: z.string(),
  authors: z.string(),
  abstract: z.string(),
  pdf_url: z.string().nullable(),
  published_date: z.string(),
  bibtex: z.string(),
  display_order: z.number(),
})
export type Publication = z.infer<typeof PublicationSchema>

export const ExperienceSchema = z.object({
  id: z.string(),
  organization: z.string(),
  role: z.string(),
  location: z.string(),
  type: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  description_md: z.string(),
  tech: z.array(z.string()),
  display_order: z.number(),
})
export type Experience = z.infer<typeof ExperienceSchema>

export const AchievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  year: z.number(),
  date: z.string(),
  category: z.enum(['hackathon', 'leadership', 'certification', 'recognition']),
  description_md: z.string(),
  image: z.string().nullable(),
  url: z.string().nullable(),
  display_order: z.number(),
})
export type Achievement = z.infer<typeof AchievementSchema>

export const NewsItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  published_date: z.string(),
  published: z.boolean(),
  body_md: z.string(),
  image: z.string().nullable(),
  image_caption: z.string().nullable(),
  display_order: z.number(),
})
export type NewsItem = z.infer<typeof NewsItemSchema>

export const ProfileSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  bio_short: z.string(),
  bio_long: z.string(),
  location: z.string(),
  coordinates: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  linkedin: z.string().nullable(),
  github: z.string(),
  status: z.string(),
  role: z.string(),
  seeking: z.array(z.string()),
  education: z.object({
    institution: z.string(),
    degree: z.string(),
    expected: z.string(),
    cgpa: z.string(),
    coursework: z.array(z.string()).optional(),
  }),
  skills: z.record(z.array(z.string())),
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string().optional(),
    year: z.number(),
    url: z.string().nullable().optional(),
  })),
})
export type Profile = z.infer<typeof ProfileSchema>

export const HeroSchema = z.object({
  photo: z.string(),
  photo_caption: z.string(),
  display_name_line1: z.string(),
  display_name_line2: z.string(),
  tagline: z.string(),
  status_lines: z.array(z.string()),
  cta_primary: z.object({ label: z.string(), href: z.string() }),
  cta_secondary: z.object({ label: z.string(), href: z.string() }),
  cta_tertiary: z.object({ label: z.string(), href: z.string() }),
  ticker_items: z.array(z.string()),
  stats: z.array(z.object({
    value: z.number(),
    suffix: z.string(),
    label: z.string(),
  })),
})
export type Hero = z.infer<typeof HeroSchema>

export const MetaSchema = z.object({
  site_name: z.string(),
  site_url: z.string(),
  default_title: z.string(),
  default_description: z.string(),
  og_image: z.string(),
  twitter_handle: z.string().nullable(),
  github: z.string(),
  linkedin: z.string().nullable(),
  email: z.string(),
  nav_links: z.array(z.object({ label: z.string(), href: z.string() })),
})
export type Meta = z.infer<typeof MetaSchema>

export const VisitorChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(2000),
})

export const VisitorChatRequestSchema = z.object({
  messages: z.array(VisitorChatMessageSchema).max(20),
})

export const ContentFileMap = {
  projects: { schema: z.array(ProjectSchema), file: 'projects.json' },
  publications: { schema: z.array(PublicationSchema), file: 'publications.json' },
  experience: { schema: z.array(ExperienceSchema), file: 'experience.json' },
  achievements: { schema: z.array(AchievementSchema), file: 'achievements.json' },
  news: { schema: z.array(NewsItemSchema), file: 'news.json' },
  profile: { schema: ProfileSchema, file: 'profile.json' },
  hero: { schema: HeroSchema, file: 'hero.json' },
  meta: { schema: MetaSchema, file: 'meta.json' },
} as const

export type ContentKey = keyof typeof ContentFileMap
