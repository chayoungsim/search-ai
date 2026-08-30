import { comparisonCards } from "@/data/content";

const Comparison = () => {
  return (
    <section className="section comparison">
      <div className="container">
        <div className="section-header">
          <span className="section-label">01 / Overview</span>

          <h2 className="section-title">SEO · AEO · GEO</h2>

          <p className="section-description">
            서로 다른 최적화 전략처럼 보이지만 궁극적인 목표는 하나입니다.
            사용자가 원하는 정보를 더 쉽게 발견하고 이해할 수 있도록 만드는
            것입니다.
          </p>
        </div>

        <div className="comparison-grid">
          {comparisonCards.map((card) => (
            <article className="comparison-card" key={card.title}>
              <span className="card-number">{card.number}</span>

              <h3 className="card-title">{card.title}</h3>

              <p className="card-subtitle">{card.subtitle}</p>

              <p className="card-description">{card.description}</p>

              <ul className="card-list">
                {card.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Comparison