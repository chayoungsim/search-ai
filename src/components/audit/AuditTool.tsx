import { useState } from "react"
import { isValidUrl } from "@/data/audit"
import type { AuditResult } from "@/data/audit"
import { fetchAudit } from "@/data/auditClient"
import AuditInput from "./AuditInput"
import AuditProgress from "./AuditProgress"
import AuditReport from "./AuditReport"

type Phase = "input" | "analyzing" | "result"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const AuditTool = () => {
  const [phase, setPhase] = useState<Phase>("input")
  const [url, setUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [done, setDone] = useState(false)

  const runAudit = async (raw: string) => {
    setError(null)
    setUrl(raw)
    setResult(null)
    setDone(false)
    setPhase("analyzing")

    try {
      // 분석중 화면이 깜빡이지 않도록 최소 노출 시간을 함께 기다린다
      const [audit] = await Promise.all([fetchAudit(raw), delay(1200)])
      setResult(audit)
      setDone(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "진단 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      )
      setPhase("input")
    }
  }

  const handleSubmit = (raw: string) => {
    if (!isValidUrl(raw)) {
      setError("올바른 URL 형식이 아닙니다. 예: https://example.com")
      return
    }
    void runAudit(raw)
  }

  const handleProgressDone = () => {
    if (result) setPhase("result")
  }

  const handleRestart = () => {
    setResult(null)
    setError(null)
    setDone(false)
    setPhase("input")
  }

  return (
    <section className="section audit-tool">
      <div className="container">
        {phase === "input" && (
          <AuditInput onSubmit={handleSubmit} error={error} />
        )}

        {phase === "analyzing" && (
          <AuditProgress url={url} done={done} onDone={handleProgressDone} />
        )}

        {phase === "result" && result && (
          <AuditReport result={result} onRestart={handleRestart} />
        )}
      </div>
    </section>
  )
}

export default AuditTool
