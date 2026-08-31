import type { CheckContext, CheckOutcome } from "../types"

export const pass = (evidence?: string[]): CheckOutcome => ({
  status: "pass",
  evidence,
})

export const warn = (evidence: string[], hint?: string): CheckOutcome => ({
  status: "warning",
  evidence,
  hint,
})

export const fail = (evidence: string[], hint?: string): CheckOutcome => ({
  status: "fail",
  evidence,
  hint,
})

// JSON-LD 안의 모든 스키마 객체(@graph 펼침 포함)를 평탄화
export function collectSchemaObjects(
  ctx: CheckContext,
): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = []

  const visit = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(visit)
      return
    }
    if (node && typeof node === "object") {
      const obj = node as Record<string, unknown>
      if (Array.isArray(obj["@graph"])) {
        ;(obj["@graph"] as unknown[]).forEach(visit)
      }
      if ("@type" in obj) out.push(obj)
    }
  }

  for (const block of ctx.page.jsonLd) {
    if (block.parsed != null) visit(block.parsed)
  }
  return out
}

export function schemaTypes(objs: Record<string, unknown>[]): string[] {
  const types: string[] = []
  for (const o of objs) {
    const t = o["@type"]
    if (typeof t === "string") types.push(t)
    else if (Array.isArray(t)) {
      for (const x of t) if (typeof x === "string") types.push(x)
    }
  }
  return types
}

export function findSchemaOfType(
  objs: Record<string, unknown>[],
  ...wanted: string[]
): Record<string, unknown> | undefined {
  const set = new Set(wanted.map((w) => w.toLowerCase()))
  return objs.find((o) => {
    const t = o["@type"]
    if (typeof t === "string") return set.has(t.toLowerCase())
    if (Array.isArray(t)) return t.some((x) => typeof x === "string" && set.has(x.toLowerCase()))
    return false
  })
}

export function hostOf(href: string, base: string): string | null {
  try {
    return new URL(href, base).hostname.replace(/^www\./, "").toLowerCase()
  } catch {
    return null
  }
}

export function isExternalLink(href: string, base: string): boolean {
  if (/^(mailto:|tel:|javascript:|#)/i.test(href.trim())) return false
  const target = hostOf(href, base)
  const origin = hostOf(base, base)
  return target != null && origin != null && target !== origin
}

const QUESTION_STARTS =
  /^(무엇|어떻게|왜|언제|어디|누가|어느|얼마|how|what|why|when|where|who|which|can |do |does |is |are )/i

export function looksLikeQuestion(text: string): boolean {
  const t = text.trim()
  return t.endsWith("?") || t.endsWith("？") || QUESTION_STARTS.test(t)
}

export function stringField(obj: Record<string, unknown>, key: string): string | null {
  const v = obj[key]
  if (typeof v === "string" && v.trim()) return v.trim()
  if (v && typeof v === "object") {
    const nested = (v as Record<string, unknown>).name ?? (v as Record<string, unknown>).url
    if (typeof nested === "string" && nested.trim()) return nested.trim()
  }
  return null
}

// ── 공유 신호: 최신성 / 출처 (여러 rule에서 재사용) ──────────

export interface FreshnessSignal {
  found: boolean
  labels: string[] // "게시일 2026-08-01" 등
  newestDate: Date | null
}

export function detectFreshness(ctx: CheckContext): FreshnessSignal {
  const candidates: { label: string; value: string }[] = []

  const pub =
    ctx.page.metas["article:published_time"] ?? ctx.page.metas["datepublished"]
  const mod =
    ctx.page.metas["article:modified_time"] ?? ctx.page.metas["datemodified"]
  if (pub) candidates.push({ label: `게시일 ${pub}`, value: pub })
  if (mod) candidates.push({ label: `수정일 ${mod}`, value: mod })

  const article = findSchemaOfType(
    collectSchemaObjects(ctx),
    "Article",
    "NewsArticle",
    "BlogPosting",
    "WebPage",
  )
  for (const key of ["datePublished", "dateModified"]) {
    const v = article?.[key]
    if (typeof v === "string") candidates.push({ label: `스키마 ${key} ${v}`, value: v })
  }

  const timeVal = ctx.page.root
    .querySelector("time[datetime]")
    ?.getAttribute("datetime")
  if (timeVal) candidates.push({ label: `<time> ${timeVal}`, value: timeVal })

  let newest: Date | null = null
  for (const c of candidates) {
    const d = new Date(c.value)
    if (!Number.isNaN(d.getTime()) && (!newest || d > newest)) newest = d
  }

  return {
    found: candidates.length > 0,
    labels: candidates.map((c) => c.label),
    newestDate: newest,
  }
}

export interface AttributionSignal {
  externalCount: number
  citeWords: boolean
  sampleHosts: string[]
}

export function detectAttribution(ctx: CheckContext): AttributionSignal {
  const externals = ctx.page.links.filter((l) =>
    isExternalLink(l.href, ctx.finalUrl),
  )
  const citeWords =
    /출처|참고\s*자료|참고\s*문헌|인용|근거|references?|sources?|cited|according to/i.test(
      ctx.html,
    )
  const sampleHosts = [
    ...new Set(
      externals
        .map((l) => hostOf(l.href, ctx.finalUrl))
        .filter((h): h is string => h != null),
    ),
  ].slice(0, 4)

  return { externalCount: externals.length, citeWords, sampleHosts }
}
