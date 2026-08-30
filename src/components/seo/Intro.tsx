import { seoIntro } from "@/data/seo"

const Intro = () => {
  return (
    <section className="section checklist-intro">
      <div className="container">
        <div className="section-header">
          <span className="section-label">01 / What &amp; Why</span>

          <h1 className="section-title">SEO란 무엇인가</h1>

          <p className="section-description">{seoIntro.lead}</p>
        </div>

        <div className="checklist-why-grid">
          {seoIntro.whyCards.map((card) => (
            <article className="checklist-why-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>

        <p className="checklist-score-note">{seoIntro.scoreNote}</p>
      </div>
    </section>
  )
}

export default Intro
