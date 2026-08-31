import { auditAreas, getRule } from "@/data/audit"
import type { RuleStatus } from "@/data/audit"

interface AuditNaListProps {
  statuses: Record<string, RuleStatus>
}

const AuditNaList = ({ statuses }: AuditNaListProps) => {
  const naIds = Object.entries(statuses)
    .filter(([, status]) => status === "na")
    .map(([id]) => id)

  if (naIds.length === 0) return null

  return (
    <details className="audit-na-list">
      <summary className="audit-na-summary">
        자동 판정 예정 항목
        <span className="audit-na-count">{naIds.length}</span>
      </summary>

      <p className="audit-na-lead">
        아래 항목은 이번 버전에서 자동으로 측정하지 않아 점수에 반영되지
        않았습니다. 각 영역 가이드를 참고해 수동으로 확인해 주세요.
      </p>

      {auditAreas.map((area) => {
        const items = naIds.filter((id) => getRule(id)?.areaKey === area.key)
        if (items.length === 0) return null

        return (
          <div className="audit-na-group" key={area.key}>
            <h4>{area.label}</h4>
            <ul>
              {items.map((id) => {
                const rule = getRule(id)?.rule
                if (!rule) return null
                return (
                  <li key={id}>
                    <span className="audit-na-id">{rule.id}</span>
                    <span className="audit-na-rule-title">{rule.title}</span>
                    <span className="audit-na-rule-summary">{rule.summary}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </details>
  )
}

export default AuditNaList
