import { buildAuditResult, normalizeUrl } from "@/data/audit"
import type { AuditResult } from "@/data/audit"
import { crawlPage, fetchText } from "./crawl"
import { parseHtml } from "./parse"
import { runChecks } from "./checks"
import { getCached, setCached } from "./cache"
import type { CheckContext, RobotsInfo, SitemapInfo } from "./types"

function parseRobots(raw: string): RobotsInfo {
  const disallow: string[] = []
  const sitemaps: string[] = []
  let inStar = false

  for (const lineRaw of raw.split(/\r?\n/)) {
    const line = lineRaw.replace(/#.*$/, "").trim()
    if (!line) continue
    const idx = line.indexOf(":")
    if (idx < 0) continue
    const key = line.slice(0, idx).trim().toLowerCase()
    const value = line.slice(idx + 1).trim()

    if (key === "user-agent") inStar = value === "*"
    else if (key === "sitemap" && value) sitemaps.push(value)
    else if (key === "disallow" && inStar && value) disallow.push(value)
  }

  return { exists: true, raw, disallow, allowAll: !disallow.includes("/"), sitemaps }
}

export async function runAudit(rawUrl: string): Promise<AuditResult> {
  const normalized = normalizeUrl(rawUrl)

  const cached = getCached(normalized)
  if (cached) return cached

  const crawl = await crawlPage(normalized)
  const page = parseHtml(crawl.html)
  const origin = new URL(crawl.finalUrl).origin

  const robotsRes = await fetchText(`${origin}/robots.txt`)
  const robots: RobotsInfo | null = robotsRes.ok
    ? parseRobots(robotsRes.text)
    : robotsRes.status === 404
      ? { exists: false, raw: "", disallow: [], allowAll: true, sitemaps: [] }
      : null

  const sitemapUrl = robots?.sitemaps[0] ?? `${origin}/sitemap.xml`
  const sitemapRes = await fetchText(sitemapUrl)
  const sitemap: SitemapInfo | null =
    sitemapRes.status === 0
      ? null
      : {
          exists: sitemapRes.ok,
          valid: /<(urlset|sitemapindex)[\s>]/i.test(sitemapRes.text),
        }

  const ctx: CheckContext = {
    inputUrl: normalized,
    finalUrl: crawl.finalUrl,
    origin,
    statusCode: crawl.statusCode,
    redirectChain: crawl.redirectChain,
    headers: crawl.headers,
    html: crawl.html,
    page,
    robots,
    sitemap,
  }

  const outcomes = runChecks(ctx)
  const result = buildAuditResult(outcomes, crawl.finalUrl)
  setCached(normalized, result)
  return result
}
