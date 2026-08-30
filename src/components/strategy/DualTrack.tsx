import { strategyTrackRows } from "@/data/strategy"

const DualTrack = () => {
  return (
    <section className="section strategy-track">
      <div className="container">
        <div className="section-header">
          <span className="section-label">03 / Dual Track Workflow</span>

          <h2 className="section-title">이해관계자별 이중 트랙 워크플로우</h2>

          <p className="section-description">
            컨설팅 진행 시 개발팀과 마케팅팀의 과제를 체계적으로 분리하여
            동시 병행(Parallel Work)으로 프로젝트 속도를 극대화합니다.
          </p>
        </div>

        <div className="track-table-wrap">
          <table className="track-table">
            <thead>
              <tr>
                <th>구분</th>
                <th>
                  💻 개발팀 Track{" "}
                  <span className="role-badge role-badge--dev">
                    Technical Fix
                  </span>
                </th>
                <th>
                  ✍️ 마케팅·콘텐츠팀 Track{" "}
                  <span className="role-badge role-badge--mkt">
                    Content &amp; Intent
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {strategyTrackRows.map((row) => (
                <tr key={row.label}>
                  <td>
                    <strong>{row.label}</strong>
                  </td>
                  <td>{row.dev}</td>
                  <td>{row.marketing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default DualTrack
