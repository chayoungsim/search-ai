import { strategyStages } from "@/data/strategy"

const StageDetail = () => {
  return (
    <section className="section strategy-detail">
      <div className="container">
        <div className="section-header">
          <span className="section-label">02 / Deep Dive</span>

          <h2 className="section-title">단계별 상세 수행 가이드</h2>
        </div>

        <div className="step-list">
          {strategyStages.map((stage) => (
            <article className="step-card" key={stage.id}>
              <div className="step-badge">
                <span className="step-num">{stage.id}</span>
                <span className="step-label">Stage</span>
              </div>

              <div className="step-main">
                <div className="step-header">
                  <h3 className="step-title">{stage.title}</h3>
                  <span className="step-purpose">{stage.purpose}</span>
                </div>

                <p className="step-desc">{stage.description}</p>

                <div className="task-grid">
                  {stage.tasks.map((task) => (
                    <div className="task-item" key={task.title}>
                      <h4 className="task-item-title">
                        <span aria-hidden="true">{task.icon}</span>
                        {task.title}
                      </h4>
                      <p>{task.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StageDetail
