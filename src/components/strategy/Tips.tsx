import { strategyTips } from "@/data/strategy"

const Tips = () => {
  return (
    <section className="section strategy-tips">
      <div className="container">
        <div className="section-header">
          <span className="section-label">04 / Consulting Tips</span>

          <h2 className="section-title">
            성공적인 컨설팅 진행을 위한 핵심 팁 3가지
          </h2>
        </div>

        <div className="tips-grid">
          {strategyTips.map((tip) => (
            <article className="tip-card" key={tip.title}>
              <span className="tip-icon" aria-hidden="true">
                {tip.icon}
              </span>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tips
