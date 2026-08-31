import type { HTMLElement } from "node-html-parser"
import type { RuleStatus } from "@/data/audit"

export interface JsonLdBlock {
  raw: string
  parsed: unknown
  error: string | null
}

export interface ParsedPage {
  root: HTMLElement
  lang: string | null
  title: string | null
  metas: Record<string, string> // meta name/property(소문자) → content
  headings: { level: number; text: string }[]
  jsonLd: JsonLdBlock[]
  images: { src: string; alt: string | null }[]
  links: { href: string; text: string; rel: string | null }[]
  canonical: string | null
  paragraphs: string[]
}

export interface RobotsInfo {
  exists: boolean
  raw: string
  disallow: string[] // User-agent: * 기준
  allowAll: boolean // "/" 를 차단하지 않음
  sitemaps: string[]
}

export interface SitemapInfo {
  exists: boolean
  valid: boolean // <urlset> 또는 <sitemapindex> 루트
}

export interface CheckContext {
  inputUrl: string
  finalUrl: string
  origin: string
  statusCode: number
  redirectChain: string[] // [입력URL, ...중간, 최종]
  headers: Record<string, string>
  html: string
  page: ParsedPage
  robots: RobotsInfo | null
  sitemap: SitemapInfo | null
}

export interface CheckOutcome {
  status: RuleStatus // 실제로는 pass | warning | fail
  evidence?: string[]
  hint?: string
}

export type CheckFn = (ctx: CheckContext) => CheckOutcome
