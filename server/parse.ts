import { parse } from "node-html-parser"
import type { JsonLdBlock, ParsedPage } from "./types"

export function parseHtml(html: string): ParsedPage {
  const root = parse(html, {
    lowerCaseTagName: true,
    comment: false,
    blockTextElements: { script: true, style: false, pre: true },
  })

  const metas: Record<string, string> = {}
  for (const m of root.querySelectorAll("meta")) {
    const key = (
      m.getAttribute("name") ??
      m.getAttribute("property") ??
      ""
    ).toLowerCase()
    const content = m.getAttribute("content")
    if (key && content != null) metas[key] = content
  }

  const titleEl = root.querySelector("title")
  const title = titleEl ? titleEl.text.replace(/\s+/g, " ").trim() || null : null

  const headings = root
    .querySelectorAll("h1, h2, h3, h4, h5, h6")
    .map((h) => ({
      level: Number(h.tagName.slice(1)),
      text: h.text.replace(/\s+/g, " ").trim(),
    }))

  const jsonLd: JsonLdBlock[] = root
    .querySelectorAll('script[type="application/ld+json"]')
    .map((s) => {
      const raw = s.text.trim()
      try {
        return { raw, parsed: JSON.parse(raw) as unknown, error: null }
      } catch (e) {
        return {
          raw,
          parsed: null,
          error: e instanceof Error ? e.message : "JSON 파싱 실패",
        }
      }
    })

  const images = root.querySelectorAll("img").map((img) => ({
    src: img.getAttribute("src") ?? "",
    alt: img.getAttribute("alt") ?? null,
  }))

  const links = root.querySelectorAll("a[href]").map((a) => ({
    href: a.getAttribute("href") ?? "",
    text: a.text.replace(/\s+/g, " ").trim(),
    rel: a.getAttribute("rel") ?? null,
  }))

  const canonical =
    root.querySelector('link[rel="canonical"]')?.getAttribute("href")?.trim() ??
    null

  const lang = root.querySelector("html")?.getAttribute("lang")?.trim() || null

  const paragraphs = root
    .querySelectorAll("p")
    .map((p) => p.text.replace(/\s+/g, " ").trim())
    .filter((t) => t.length > 0)

  return {
    root,
    lang,
    title,
    metas,
    headings,
    jsonLd,
    images,
    links,
    canonical,
    paragraphs,
  }
}
