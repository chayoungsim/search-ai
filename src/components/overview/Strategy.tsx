import { strategyFlow } from "@/data/content";

const Strategy = () => {
  return (
    <section className="section strategy" id="strategy">
      <div className="container">
        <div className="section-header">
          <span className="section-label">05 / Strategy</span>

          <h2 className="section-title">
            세 가지 전략은
            <br />
            연결되어 있습니다.
          </h2>

          <p className="section-description">
            SEO, AEO, GEO는 서로 경쟁하는 개념이 아닙니다. 하나의 콘텐츠를
            여러 검색 환경에서 활용할 수 있도록 함께 설계하는 것이
            중요합니다.
          </p>
        </div>

        <div className="strategy-flow">
          {strategyFlow.map((item) => (
            <article className="strategy-item" key={item.title}>
              <span>{item.label}</span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Strategy