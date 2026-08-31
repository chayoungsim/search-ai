import { createHash } from "node:crypto"
import type { AuditResult } from "@/data/audit"

// 동일 URL 진단 결과를 24시간 캐시한다. 인메모리 → 서버 인스턴스별로 독립.
const TTL_MS = 24 * 60 * 60 * 1000
const MAX_ENTRIES = 200

interface Entry {
  result: AuditResult
  expires: number
}

const store = new Map<string, Entry>()

const keyOf = (url: string): string =>
  createHash("sha1").update(url).digest("hex")

export function getCached(url: string): AuditResult | null {
  const key = keyOf(url)
  const entry = store.get(key)
  if (!entry) return null
  if (Date.now() > entry.expires) {
    store.delete(key)
    return null
  }
  return entry.result
}

export function setCached(url: string, result: AuditResult): void {
  if (store.size >= MAX_ENTRIES) {
    const oldest = store.keys().next().value
    if (oldest !== undefined) store.delete(oldest)
  }
  store.set(keyOf(url), { result, expires: Date.now() + TTL_MS })
}
