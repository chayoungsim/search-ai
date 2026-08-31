import { assertPublicUrl, SsrfError } from "./ssrf"

const UA =
  "Mozilla/5.0 (compatible; SearchAI-Audit/1.0; +https://searchai.example/audit)"
const MAX_HOPS = 5
const TIMEOUT_MS = 10_000
const MAX_BYTES = 2_500_000

export type CrawlErrorCode = "TARGET_UNREACHABLE" | "NON_HTML" | "BLOCKED_PRIVATE_HOST"

export class CrawlError extends Error {
  code: CrawlErrorCode

  constructor(code: CrawlErrorCode, message: string) {
    super(message)
    this.name = "CrawlError"
    this.code = code
  }
}

export interface CrawlResult {
  finalUrl: string
  statusCode: number
  headers: Record<string, string>
  html: string
  redirectChain: string[]
}

async function fetchWithTimeout(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: ac.signal, redirect: "manual" })
  } finally {
    clearTimeout(timer)
  }
}

function headersToObject(h: Headers): Record<string, string> {
  const out: Record<string, string> = {}
  h.forEach((value, key) => {
    out[key.toLowerCase()] = value
  })
  return out
}

function concat(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((n, c) => n + c.byteLength, 0)
  const out = new Uint8Array(total)
  let offset = 0
  for (const c of chunks) {
    out.set(c, offset)
    offset += c.byteLength
  }
  return out
}

async function readCapped(res: Response): Promise<string> {
  const reader = res.body?.getReader()
  if (!reader) return res.text()

  const chunks: Uint8Array[] = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) {
      total += value.byteLength
      chunks.push(value)
      if (total > MAX_BYTES) {
        await reader.cancel()
        break
      }
    }
  }
  return new TextDecoder("utf-8").decode(concat(chunks))
}

export async function crawlPage(startUrl: string): Promise<CrawlResult> {
  const chain: string[] = [startUrl]
  let current = startUrl

  for (let hop = 0; hop <= MAX_HOPS; hop += 1) {
    try {
      await assertPublicUrl(current)
    } catch (e) {
      if (e instanceof SsrfError) {
        throw new CrawlError("BLOCKED_PRIVATE_HOST", e.message)
      }
      throw new CrawlError(
        "TARGET_UNREACHABLE",
        e instanceof Error ? e.message : "사이트에 연결할 수 없습니다",
      )
    }

    let res: Response
    try {
      res = await fetchWithTimeout(current, {
        headers: {
          "user-agent": UA,
          accept: "text/html,application/xhtml+xml",
        },
      })
    } catch (e) {
      throw new CrawlError(
        "TARGET_UNREACHABLE",
        e instanceof Error && e.name === "AbortError"
          ? "응답 시간이 초과되었습니다"
          : "사이트에 연결할 수 없습니다",
      )
    }

    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location")
      if (!loc) break
      current = new URL(loc, current).toString()
      chain.push(current)
      continue
    }

    if (res.status >= 400) {
      throw new CrawlError(
        "TARGET_UNREACHABLE",
        `대상 서버가 ${res.status} 응답을 반환했습니다`,
      )
    }

    const headers = headersToObject(res.headers)
    if (!(headers["content-type"] ?? "").includes("html")) {
      throw new CrawlError("NON_HTML", "HTML 페이지가 아닙니다")
    }

    const html = await readCapped(res)
    return {
      finalUrl: current,
      statusCode: res.status,
      headers,
      html,
      redirectChain: chain,
    }
  }

  throw new CrawlError("TARGET_UNREACHABLE", "리다이렉트가 너무 많습니다")
}

// robots.txt / sitemap.xml 같은 부수 리소스 — 실패해도 무시
export async function fetchText(
  url: string,
  depth = 0,
): Promise<{ ok: boolean; status: number; text: string }> {
  try {
    await assertPublicUrl(url)
    const res = await fetchWithTimeout(url, { headers: { "user-agent": UA } })
    if (res.status >= 300 && res.status < 400 && depth < 3) {
      const loc = res.headers.get("location")
      if (loc) return fetchText(new URL(loc, url).toString(), depth + 1)
    }
    const ok = res.status >= 200 && res.status < 300
    const text = ok ? (await res.text()).slice(0, 500_000) : ""
    return { ok, status: res.status, text }
  } catch {
    return { ok: false, status: 0, text: "" }
  }
}
