import { geoChecklist } from "@/data/geo"

const Diagnostics = () => {
  return (
    <section className="section checklist-diagnostics">
      <div className="container">
        <div className="section-header">
          <span className="section-label">02 / Diagnostic Areas</span>

          <h2 className="section-title">무엇을 진단하나요</h2>

          <p className="section-description">
            GEO 영역은 Entity Clarity · Evidence/Provenance · Citation
            Readiness · Topical Coverage · Freshness/Consistency · AI
            Visibility 6개 카테고리, 총 22개 세부 항목(G01~G22)으로
            진단합니다.
          </p>
        </div>

        <div className="comparison-grid">
          {geoChecklist.map((category) => (
            <article className="comparison-card" key={category.key}>
              <span className="card-number">{category.range}</span>

              <h3 className="card-title">{category.label}</h3>

              <p className="card-subtitle">Weight {category.weight}점</p>

              <p className="card-description">{category.description}</p>

              <ul className="card-list">
                {category.rules.map((rule) => (
                  <li key={rule.id}>
                    {rule.id} · {rule.title}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Diagnostics
