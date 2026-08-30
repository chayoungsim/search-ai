import { Link } from "react-router"

const Cta = () => {
  return (
    <section className="cta">
      <div className="container">
        <h2>
          지금 바로 <span>진단</span>을 시작하세요.
        </h2>

        <p>
          우리 사이트가 SEO·AEO·GEO 관점에서 어디쯤 와 있는지 확인하고,
          5단계 프로세스에 맞는 컨설팅을 상담받아 보세요.
        </p>

        <div className="cta-actions">
          <Link to="/audit" className="cta-button">
            무료 진단
          </Link>
          <Link to="/contact" className="cta-button cta-button-secondary">
            상담 신청
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Cta
