import { lookup } from "node:dns/promises"
import { isIP } from "node:net"

// SSRF 방어: 대상 URL이 공인 http(s) 주소인지 확인한다.
// crawl 시작 시 + 리다이렉트 홉마다 호출한다.
// 주의: DNS 재바인딩(TOCTOU)은 완전 차단하지 않는다. 강화하려면 해석된 IP로 직접 연결해야 한다.

const BLOCKED_HOSTNAMES = new Set(["localhost", "localhost.localdomain", "ip6-localhost"])

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number)
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return true
  const [a, b] = parts
  if (a === 0 || a === 10 || a === 127) return true
  if (a === 169 && b === 254) return true // link-local / cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true
  if (a === 192 && b === 168) return true
  if (a === 100 && b >= 64 && b <= 127) return true // CGNAT
  return false
}

function isPrivateIPv6(ip: string): boolean {
  const v = ip.toLowerCase()
  if (v === "::1" || v === "::") return true
  if (v.startsWith("fc") || v.startsWith("fd")) return true // ULA fc00::/7
  if (v.startsWith("fe80")) return true // link-local
  if (v.startsWith("::ffff:")) return isPrivateIPv4(v.slice(7))
  return false
}

export function isBlockedIp(ip: string): boolean {
  const kind = isIP(ip)
  if (kind === 4) return isPrivateIPv4(ip)
  if (kind === 6) return isPrivateIPv6(ip)
  return true
}

export class SsrfError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "SsrfError"
  }
}

// DNS 해석 실패 등 — 차단이 아니라 "접속 불가"로 다뤄야 한다
export class LookupError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LookupError"
  }
}

export async function assertPublicUrl(rawUrl: string): Promise<void> {
  let u: URL
  try {
    u = new URL(rawUrl)
  } catch {
    throw new SsrfError("URL을 해석할 수 없습니다")
  }

  if (u.protocol !== "http:" && u.protocol !== "https:") {
    throw new SsrfError("http 또는 https 주소만 진단할 수 있습니다")
  }

  const host = u.hostname.toLowerCase()
  if (
    BLOCKED_HOSTNAMES.has(host) ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".localhost")
  ) {
    throw new SsrfError("내부 호스트는 진단할 수 없습니다")
  }

  if (isIP(host)) {
    if (isBlockedIp(host)) throw new SsrfError("사설 IP는 진단할 수 없습니다")
    return
  }

  let records: { address: string }[]
  try {
    records = await lookup(host, { all: true })
  } catch {
    throw new LookupError("도메인을 찾을 수 없습니다")
  }
  if (records.length === 0) throw new LookupError("도메인을 찾을 수 없습니다")
  for (const record of records) {
    if (isBlockedIp(record.address)) {
      throw new SsrfError("사설망으로 해석되는 도메인입니다")
    }
  }
}
