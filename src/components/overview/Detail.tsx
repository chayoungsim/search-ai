import { detailSections } from "@/data/content";

const Detail = () => {
  return (
    <section className="detail-section">
      <div className="container">
        {detailSections.map((section) => (
          <article className="detail" id={section.id} key={section.id}>
            <div className="detail-index">
              {section.index}
              <strong>{section.strong}</strong>
            </div>

            <div className="detail-content">
              <h3>
                {section.heading[0]}
                <br />
                {section.heading[1]}
              </h3>

              <p>{section.description}</p>

              <h4>{section.featureTitle}</h4>

              <ul className="feature-grid">
                {section.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Detail