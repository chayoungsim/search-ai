import { geoIntro } from "@/data/geo"

const Intro = () => {
  return (
    <section className="section checklist-intro">
      <div className="container">
        <div className="section-header">
          <span className="section-label">01 / What &amp; Why</span>

          <h1 className="section-title">GEO란 무엇인가</h1>

          <p className="section-description">{geoIntro.lead}</p>
        </div>

        <div className="checklist-why-grid">
          {geoIntro.whyCards.map((card) => (
            <article className="checklist-why-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>

        <p className="checklist-score-note">{geoIntro.scoreNote}</p>
      </div>
    </section>
  )
}

export default Intro
