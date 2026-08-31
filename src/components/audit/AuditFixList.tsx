import { auditAreas, getRule } from "@/data/audit"
import type { RuleResult } from "@/data/audit"
import AuditFixItem from "./AuditFixItem"

interface AuditFixListProps {
  items: RuleResult[]
}

const AuditFixList = ({ items }: AuditFixListProps) => {
  if (items.length === 0) {
    return (
      <div className="audit-fix-list">
        <h2 className="audit-fix-list-title">수정이 필요한 항목</h2>
        <p className="audit-fix-empty">
          수정이 필요한 항목이 없습니다. 현재 기준을 잘 충족하고 있습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="audit-fix-list">
      <h2 className="audit-fix-list-title">
        수정이 필요한 항목
        <span className="audit-fix-list-count">{items.length}</span>
      </h2>

      <p className="audit-fix-list-lead">
        영향도가 큰 항목부터 정렬했습니다. 각 항목을 펼치면 왜 중요한지, 무엇을
        확인해야 하는지, 수정 예시를 볼 수 있습니다.
      </p>

      {auditAreas.map((area) => {
        const areaItems = items.filter(
          (item) => getRule(item.ruleId)?.areaKey === area.key,
        )
        if (areaItems.length === 0) return null

        return (
          <section className="audit-fix-group" key={area.key}>
            <h3 className="audit-fix-group-title">
              {area.label}
              <span className="audit-fix-group-count">{areaItems.length}건</span>
            </h3>

            <ul className="audit-fix-items">
              {areaItems.map((item) => (
                <AuditFixItem key={item.ruleId} result={item} />
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

export default AuditFixList
