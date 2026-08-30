import { ExternalLink } from "lucide-react"
import { aeoChecklist } from "@/data/aeo"

const Guide = () => {
  return (
    <section className="section checklist-guide">
      <div className="container">
        <div className="section-header">
          <span className="section-label">03 / How to Check</span>

          <h2 className="section-title">어떻게 체크하나요</h2>

          <p className="section-description">
            각 진단 항목은 아래 세부 체크리스트를 기준으로 확인합니다.
          </p>
        </div>

        {aeoChecklist.map((category) => (
          <div className="guide-category" key={category.key}>
            <div className="guide-category-header">
              <span className="guide-category-tag">
                {category.range} · {category.weight}점
              </span>

              <h3 className="guide-category-title">{category.label}</h3>

              <p>{category.description}</p>
            </div>

            <div className="guide-card-list">
              {category.rules.map((rule) => (
                <article className="guide-card" key={rule.id}>
                  <span className="guide-card-heading">
                    {rule.id} · Weight {rule.weight}
                  </span>

                  <h4 className="guide-card-title">{rule.title}</h4>

                  <p>{rule.summary}</p>

                  <ul className="guide-how-list">
                    {rule.checks.map((check) => (
                      <li key={check}>{check}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        ))}

        <div className="guide-cta">
          <p>17개 항목을 하나씩 체크하며 점검할 수 있는 인쇄용 체크리스트를 제공합니다.</p>
          <a
            href="/aeo-checklist.html"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            AEO 항목 직접 체크하기
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Guide
