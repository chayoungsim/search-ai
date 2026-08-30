import { aeoIntro } from "@/data/aeo"

const Intro = () => {
  return (
    <section className="section checklist-intro">
      <div className="container">
        <div className="section-header">
          <span className="section-label">01 / What &amp; Why</span>

          <h1 className="section-title">AEO란 무엇인가</h1>

          <p className="section-description">{aeoIntro.lead}</p>
        </div>

        <div className="checklist-why-grid">
          {aeoIntro.whyCards.map((card) => (
            <article className="checklist-why-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>

        <p className="checklist-score-note">{aeoIntro.scoreNote}</p>
      </div>
    </section>
  )
}

export default Intro
