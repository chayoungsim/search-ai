// 프론트 → /api/audit 호출 래퍼. 서버(server/index.ts, Hono)가 응답한다.

import type { AuditResult } from "@/data/audit"

export class AuditError extends Error {
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = "AuditError"
    this.code = code
  }
}

const ERROR_MESSAGE: Record<string, string> = {
  INVALID_URL: "올바른 URL 형식이 아닙니다. 예: https://example.com",
  BLOCKED_PRIVATE_HOST: "내부망·사설 주소는 진단할 수 없습니다.",
  TARGET_UNREACHABLE: "해당 사이트에 접속할 수 없습니다. 주소를 다시 확인해 주세요.",
  NON_HTML: "HTML 페이지가 아니어서 진단할 수 없습니다.",
  RATE_LIMITED: "요청이 많습니다. 잠시 후 다시 시도해 주세요.",
}

interface ErrorBody {
  error?: { code?: string; message?: string }
}

export async function fetchAudit(url: string): Promise<AuditResult> {
  let res: Response
  try {
    res = await fetch(`/api/audit?url=${encodeURIComponent(url)}`, {
      headers: { accept: "application/json" },
    })
  } catch {
    throw new AuditError(
      "NETWORK",
      "진단 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    )
  }

  const body: unknown = await res.json().catch(() => null)

  if (!res.ok) {
    const errBody = (body ?? {}) as ErrorBody
    const code = errBody.error?.code ?? "UNKNOWN"
    const message =
      ERROR_MESSAGE[code] ??
      errBody.error?.message ??
      "진단 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
    throw new AuditError(code, message)
  }

  return body as AuditResult
}
