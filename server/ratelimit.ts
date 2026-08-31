// IP당 슬라이딩 윈도우 레이트리밋 (인메모리).
const WINDOW_MS = 60_000
const MAX_REQUESTS = 12

const hits = new Map<string, number[]>()

export function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  if (hits.size > 5000) hits.clear() // 메모리 방어

  return recent.length > MAX_REQUESTS
}
