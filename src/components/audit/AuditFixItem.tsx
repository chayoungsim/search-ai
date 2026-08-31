import { SEVERITY_LABEL, STATUS_LABEL, getRule } from "@/data/audit"
import type { RuleResult } from "@/data/audit"
import { fixExamples } from "@/data/auditExamples"

interface AuditFixItemProps {
  result: RuleResult
}

const AuditFixItem = ({ result }: AuditFixItemProps) => {
  const lookup = getRule(result.ruleId)
  if (!lookup) return null

  const { rule, categoryLabel } = lookup
  const example = fixExamples[rule.id]

  return (
    <li>
      <details className="audit-fix-item">
        <summary className="audit-fix-item-summary">
          <span className={`audit-status audit-status--${result.status}`}>
            {STATUS_LABEL[result.status]}
          </span>

          <span className="audit-fix-item-title">
            <span className="audit-fix-item-id">{rule.id}</span>
            {rule.title}
          </span>

          <span className={`audit-severity audit-severity--${result.severity}`}>
            {SEVERITY_LABEL[result.severity]}
          </span>
        </summary>

        <div className="audit-fix-item-body">
          <p className="audit-fix-item-meta">
            {categoryLabel} · Weight {rule.weight}
          </p>

          {result.evidence && result.evidence.length > 0 && (
            <div className="audit-fix-block audit-fix-evidence">
              <h4>이 사이트에서 발견한 내용</h4>
              <ul className="audit-fix-checks">
                {result.evidence.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {result.hint && (
            <div className="audit-fix-block">
              <h4>권장 조치</h4>
              <p>{result.hint}</p>
            </div>
          )}

          <div className="audit-fix-block">
            <h4>왜 중요한가</h4>
            <p>{rule.summary}</p>
          </div>

          <div className="audit-fix-block">
            <h4>확인 기준</h4>
            <ul className="audit-fix-checks">
              {rule.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </div>

          {example && (
            <div className="audit-fix-block">
              <h4>수정 예시</h4>

              <div className="audit-example">
                <div className="audit-example-col audit-example-col--bad">
                  <span className="audit-example-label">
                    {example.badLabel ?? "수정 전"}
                  </span>
                  <pre
                    className={`audit-example-code lang-${example.lang ?? "text"}`}
                  >
                    <code>{example.bad}</code>
                  </pre>
                </div>

                <div className="audit-example-col audit-example-col--good">
                  <span className="audit-example-label">
                    {example.goodLabel ?? "수정 후"}
                  </span>
                  <pre
                    className={`audit-example-code lang-${example.lang ?? "text"}`}
                  >
                    <code>{example.good}</code>
                  </pre>
                </div>
              </div>

              {example.note && (
                <p className="audit-example-note">{example.note}</p>
              )}
            </div>
          )}
        </div>
      </details>
    </li>
  )
}

export default AuditFixItem
