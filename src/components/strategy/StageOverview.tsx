import { strategyStages } from "@/data/strategy"

const StageOverview = () => {
  return (
    <section className="section strategy-overview">
      <div className="container">
        <div className="section-header">
          <span className="section-label">01 / 5-Step Overview</span>

          <h2 className="section-title">최적화 프로세스</h2>
        </div>

        <div className="stage-nav">
          {strategyStages.map((stage) => (
            <article className="stage-nav-item" key={stage.id}>
              <span className="stage-nav-num">Stage {stage.id}</span>
              <h3 className="stage-nav-title">{stage.navTitle}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StageOverview
