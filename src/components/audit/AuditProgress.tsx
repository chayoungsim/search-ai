import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"

interface AuditProgressProps {
  url: string
  done: boolean
  onDone: () => void
}

const STEPS = ["웹사이트 수집", "SEO 점검", "AEO 점검", "GEO 점검", "결과 정리"]

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false

const toHostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

const AuditProgress = ({ url, done, onDone }: AuditProgressProps) => {
  const [progress, setProgress] = useState(0)

  const hostname = toHostname(url)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const step = reduced ? 20 : 4
    const intervalMs = reduced ? 50 : 140

    const timer = window.setInterval(() => {
      setProgress((prev) => {
        // 응답이 오기 전에는 90%에서 대기, done 이면 100%까지
        const ceiling = done ? 100 : 90
        return prev >= ceiling ? prev : Math.min(prev + step, ceiling)
      })
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [done])

  useEffect(() => {
    if (!done || progress < 100) return
    const timeout = window.setTimeout(onDone, 350)
    return () => window.clearTimeout(timeout)
  }, [done, progress, onDone])

  const activeStep =
    done && progress >= 100
      ? STEPS.length
      : Math.min(
          STEPS.length - 1,
          Math.floor((progress / 100) * STEPS.length),
        )

  return (
    <div className="audit-progress">
      <span className="audit-progress-spinner" aria-hidden="true" />

      <h1 className="audit-progress-title">분석 진행 중...</h1>
      <p className="audit-progress-host">{hostname}</p>

      <div className="audit-progress-meter">
        <div className="audit-progress-bar">
          <span
            className="audit-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="audit-progress-percent" role="status">
          {progress}%
        </span>
      </div>

      <ol className="audit-progress-steps">
        {STEPS.map((label, index) => {
          const state =
            index < activeStep
              ? "done"
              : index === activeStep
                ? "active"
                : "pending"

          return (
            <li key={label} className={`audit-progress-step is-${state}`}>
              <span className="audit-progress-step-icon" aria-hidden="true">
                {state === "done" && <Check size={14} />}
                {state === "active" && (
                  <Loader2 size={14} className="audit-spin" />
                )}
              </span>
              {label}
            </li>
          )
        })}
      </ol>

      <p className="audit-progress-hint">
        실제 페이지를 불러와 점검하므로 몇 초 정도 걸립니다.
      </p>
    </div>
  )
}

export default AuditProgress
