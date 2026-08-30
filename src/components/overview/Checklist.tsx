import { checkCards } from "@/data/content";
const Checklist = () => {
  return (
    <section className="section checklist">
      <div className="container">
        <div className="section-header">
          <span className="section-label">06 / Practical</span>

          <h2 className="section-title">
            웹사이트를 만들 때
            <br />
            무엇을 준비해야 할까요?
          </h2>

          <p className="section-description">
            SEO만 고려한 웹사이트에서 한 단계 더 나아가 검색엔진과 AI 모두가
            이해하기 쉬운 구조를 만들어야 합니다.
          </p>
        </div>

        <div className="check-grid">
          {checkCards.map((card) => (
            <article className="check-card" key={card.title}>
              <h3>{card.title}</h3>

              <ul>
                {card.items.map((item) => (
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

export default Checklist