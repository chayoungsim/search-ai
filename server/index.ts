import { Hono } from "hono"
import type { StatusCode } from "hono/utils/http-status"
import { isValidUrl } from "../src/data/audit"
import { runAudit } from "./runAudit"
import { CrawlError } from "./crawl"
import { SsrfError } from "./ssrf"
import { rateLimited } from "./ratelimit"

const app = new Hono()

app.get("/api/audit", async (c) => {
  const url = c.req.query("url")?.trim() ?? ""

  const ip =
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
    c.req.header("x-real-ip") ||
    "unknown"

  if (rateLimited(ip)) {
    return c.json(
      { error: { code: "RATE_LIMITED", message: "요청이 많습니다. 잠시 후 다시 시도해 주세요." } },
      429,
    )
  }

  if (!url || !isValidUrl(url)) {
    return c.json(
      { error: { code: "INVALID_URL", message: "올바른 URL 형식이 아닙니다." } },
      400,
    )
  }

  try {
    const result = await runAudit(url)
    return c.json(result)
  } catch (e) {
    if (e instanceof SsrfError) {
      return c.json({ error: { code: "BLOCKED_PRIVATE_HOST", message: e.message } }, 403)
    }
    if (e instanceof CrawlError) {
      const status: StatusCode =
        e.code === "BLOCKED_PRIVATE_HOST" ? 403 : e.code === "NON_HTML" ? 415 : 502
      return c.json({ error: { code: e.code, message: e.message } }, status)
    }
    console.error("[audit] unexpected error:", e)
    return c.json(
      { error: { code: "INTERNAL", message: "진단 중 오류가 발생했습니다." } },
      500,
    )
  }
})

export default app
