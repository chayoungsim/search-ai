import { GRADE_LABEL } from "@/data/audit"
import type { AreaResult } from "@/data/audit"

interface AuditAreaCardProps {
  area: AreaResult
}

const AuditAreaCard = ({ area }: AuditAreaCardProps) => {
  return (
    <article className="audit-area-card">
      <header className="audit-area-card-head">
        <div>
          <h3 className="audit-area-card-name">{area.label}</h3>
          <p className="audit-area-card-fullname">{area.fullName}</p>
        </div>

        <span
          className={`audit-grade audit-grade--${area.grade.toLowerCase()}`}
        >
          {area.grade}
        </span>
      </header>

      <p className="audit-area-card-score">
        <span className="audit-area-card-num">{area.score}</span>
        <span className="audit-area-card-num-unit">/ 100</span>
        <span className="audit-area-card-weight">
          측정 {area.measuredCount}/{area.ruleCount} · {area.overallWeight}%
        </span>
      </p>

      <div className="audit-meter-bar audit-area-card-bar">
        <span
          className="audit-meter-fill"
          style={{ width: `${area.score}%` }}
        />
      </div>

      <ul className="audit-area-card-cats">
        {area.categories.map((cat) => (
          <li key={cat.key}>
            <span className="audit-area-card-cat-label">{cat.label}</span>
            <span className="audit-area-card-cat-count">
              {cat.measuredCount === 0
                ? "측정 예정"
                : `${cat.passCount} / ${cat.measuredCount} 통과`}
            </span>
          </li>
        ))}
      </ul>

      <p className="audit-area-card-grade-label">{GRADE_LABEL[area.grade]}</p>
    </article>
  )
}

export default AuditAreaCard
