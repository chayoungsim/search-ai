import type { AuditResult } from "@/data/audit"
import AuditScoreSummary from "./AuditScoreSummary"
import AuditAreaCard from "./AuditAreaCard"
import AuditFixList from "./AuditFixList"
import AuditNaList from "./AuditNaList"

interface AuditReportProps {
  result: AuditResult
  onRestart: () => void
}

const AuditReport = ({ result, onRestart }: AuditReportProps) => {
  return (
    <div className="audit-report">
      <AuditScoreSummary result={result} onRestart={onRestart} />

      <div className="audit-report-areas">
        {result.areas.map((area) => (
          <AuditAreaCard key={area.key} area={area} />
        ))}
      </div>

      <AuditFixList items={result.fixItems} />

      <AuditNaList statuses={result.statuses} />
    </div>
  )
}

export default AuditReport
