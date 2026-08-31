import { Link } from "react-router"
import { ArrowRight, RotateCcw } from "lucide-react"
import { GRADE_DESCRIPTION, GRADE_LABEL } from "@/data/audit"
import type { AuditResult } from "@/data/audit"

interface AuditScoreSummaryProps {
  result: AuditResult
  onRestart: () => void
}

const AuditScoreSummary = ({ result, onRestart }: AuditScoreSummaryProps) => {
  const { hostname, overall, fixItems } = result
  const failCount = fixItems.filter((item) => item.status === "fail").length
  const warningCount = fixItems.filter((item) => item.status === "warning").length

  return (
    <div className="audit-summary">
      <div className="audit-summary-head">
        <p className="section-label">진단 결과</p>
        <p className="audit-summary-host">{hostname}</p>
      </div>

      <div className="audit-summary-score">
        <span className="audit-score">
          {overall.score}
          <span className="audit-score-unit">/ 100</span>
        </span>

        <span
          className={`audit-grade audit-grade--${overall.grade.toLowerCase()}`}
        >
          {overall.grade}
          <span className="audit-grade-label">{GRADE_LABEL[overall.grade]}</span>
        </span>
      </div>

      <div className="audit-meter-bar audit-summary-bar">
        <span
          className="audit-meter-fill"
          style={{ width: `${overall.score}%` }}
        />
      </div>

      <p className="audit-summary-desc">{GRADE_DESCRIPTION[overall.grade]}</p>

      <p className="audit-summary-counts">
        수정 필요 <strong>{fixItems.length}</strong>건
        <span aria-hidden="true"> · </span>
        실패 {failCount}
        <span aria-hidden="true"> · </span>
        주의 {warningCount}
      </p>

      <p className="audit-summary-measured">
        전체 {result.measured.total}개 항목 중{" "}
        <strong>{result.measured.count}개</strong>를 자동 측정했습니다. 나머지는
        수동 확인을 권장합니다.
      </p>

      <div className="audit-summary-actions">
        <Link to="/contact" className="cta-button">
          개선 상담 신청
          <ArrowRight size={16} aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="cta-button cta-button-secondary"
          onClick={onRestart}
        >
          <RotateCcw size={14} aria-hidden="true" />
          다른 URL 진단
        </button>
      </div>
    </div>
  )
}

export default AuditScoreSummary
