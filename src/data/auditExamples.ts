// 자동진단 결과 화면에서 "수정 필요 항목" 아코디언에 붙는 Before/After 예시.
// 영향도가 높은 핵심 rule ~20개에만 작성하고, 나머지 항목은 rule.summary + rule.checks[] 만 노출한다.
// key = src/data/{seo,aeo,geo}.ts 의 rule id.

export interface FixExample {
  bad: string;
  good: string;
  badLabel?: string; // 기본 "수정 전"
  goodLabel?: string; // 기본 "수정 후"
  note?: string;
  lang?: "html" | "json" | "text";
}

export const fixExamples: Record<string, FixExample> = {
  // ── SEO ──────────────────────────────────────
  S01: {
    lang: "html",
    bad: `<!-- 페이지 안에 http 리소스가 섞여 있음 -->
<img src="http://example.com/logo.png" alt="로고" />
<script src="http://example.com/app.js"></script>`,
    good: `<!-- 모든 리소스를 https로, 서버에서 http→https 301 리다이렉트 -->
<img src="https://example.com/logo.png" alt="로고" />
<script src="https://example.com/app.js"></script>`,
    note: "HTTP로 접근하면 301로 HTTPS에 넘기고, 페이지 안의 mixed content도 모두 https로 바꿉니다.",
  },
  S02: {
    lang: "text",
    badLabel: "잘못된 robots.txt",
    goodLabel: "올바른 robots.txt",
    bad: `User-agent: *
Disallow: /`,
    good: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /cart/

Sitemap: https://example.com/sitemap.xml`,
    note: "전체 차단(Disallow: /)은 색인에서 사이트가 통째로 빠지게 만듭니다. 비공개 경로만 선별 차단하세요.",
  },
  S03: {
    lang: "html",
    bad: `<!-- 정식 페이지인데 noindex가 남아 있음 -->
<meta name="robots" content="noindex, nofollow" />`,
    good: `<!-- 색인 허용 + 대표 URL 지정 -->
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://example.com/products/geo-audit" />`,
    note: "개발 중 넣어둔 noindex가 배포본에 남아 있는 경우가 많습니다. canonical로 중복 URL도 정리하세요.",
  },
  S04: {
    lang: "html",
    badLabel: "sitemap 없음",
    goodLabel: "sitemap.xml + robots 연결",
    bad: `<!-- sitemap.xml 파일이 없고 robots.txt에서도 안내하지 않음 -->`,
    good: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-08-31</lastmod>
  </url>
</urlset>`,
    note: "canonical URL만, 200 응답 페이지만 담고 lastmod를 실제 수정일로 유지합니다.",
  },
  S09: {
    lang: "html",
    bad: `<title>홈</title>
<!-- 다른 페이지도 전부 "홈" 또는 회사명만 -->`,
    good: `<title>GEO 자동진단 도구 | SEARCH+AI</title>
<!-- 페이지마다 고유하게, 핵심 주제를 앞쪽에 -->`,
    note: "제목은 검색 결과에서 가장 먼저 읽히는 요소입니다. 페이지별로 다르게, 핵심 키워드를 앞에 둡니다.",
  },
  S10: {
    lang: "html",
    bad: `<!-- meta description 없음 (검색엔진이 본문을 임의로 잘라 노출) -->`,
    good: `<meta name="description"
  content="URL만 입력하면 SEO·AEO·GEO 항목을 자동 점검하고 점수와 개선안을 보여주는 무료 진단 도구입니다." />`,
    note: "순위에 직접 반영되진 않지만 클릭률을 좌우합니다. 페이지 내용과 검색 의도를 1~2문장으로 요약하세요.",
  },
  S11: {
    lang: "html",
    bad: `<div class="title">GEO 자동진단</div>
<div class="sub">사용 방법</div>
<h3>1단계</h3>`,
    good: `<h1>GEO 자동진단</h1>
  <h2>사용 방법</h2>
    <h3>1단계 · URL 입력</h3>`,
    note: "제목은 div가 아니라 h1~h3로, 건너뛰지 않고 계층 순서대로. h1은 페이지당 1개.",
  },
  S12: {
    lang: "html",
    bad: `<div class="header">...</div>
<div class="nav">...</div>
<div class="main">...</div>
<div class="footer">...</div>`,
    good: `<header>...</header>
<nav aria-label="주요 메뉴">...</nav>
<main>...</main>
<footer>...</footer>`,
    note: "시맨틱 태그를 쓰면 검색엔진과 스크린 리더가 페이지 구조를 정확히 해석합니다.",
  },
  S15: {
    lang: "html",
    bad: `<img src="/chart.png" />
<img src="/deco-line.svg" />`,
    good: `<img src="/chart.png" alt="2026년 분기별 AI 인용률 추이 그래프" />
<img src="/deco-line.svg" alt="" />`,
    note: "정보성 이미지에는 내용을 설명하는 alt를, 장식 이미지에는 빈 alt(alt=\"\")를 지정합니다.",
  },
  S16: {
    lang: "json",
    badLabel: "구조화 데이터 없음",
    goodLabel: "JSON-LD 추가",
    bad: `<!-- <head>에 JSON-LD가 전혀 없음 -->`,
    good: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SEARCH+AI",
  "url": "https://example.com",
  "sameAs": ["https://www.linkedin.com/company/searchai"]
}
</script>`,
    note: "페이지 유형에 맞는 스키마(Organization, Article, Product 등)를 하나 이상 넣습니다.",
  },
  S17: {
    lang: "json",
    bad: `{
  "@context": "https://schema.org",
  "@type": "Organiztion",   // 오타
  "name": "SEARCH+AI",
  "logo": 12345               // URL이 아닌 값
}`,
    good: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SEARCH+AI",
  "logo": "https://example.com/logo.png"
}`,
    note: "@type 철자, 필수 property, 값 타입을 Rich Results Test로 검증한 뒤 배포합니다.",
  },

  // ── AEO ──────────────────────────────────────
  A01: {
    lang: "html",
    bad: `<h2>서비스 소개</h2>
<p>저희는 다양한 최적화 솔루션을 제공합니다.</p>`,
    good: `<h2>GEO 자동진단이란 무엇인가요?</h2>
<p>GEO 자동진단은 URL만 입력하면 생성형 AI 노출에 필요한 항목을
   자동으로 점검해 점수로 보여주는 도구입니다.</p>`,
    note: "핵심 질문(\"~란?\", \"어떻게~?\")에 정면으로 답하는 문단이 페이지에 실제로 있어야 합니다.",
  },
  A04: {
    lang: "html",
    bad: `<p>GEO는 요즘 많이들 이야기하는 개념인데, 상황에 따라
   다르게 쓰이기도 하고 여러 관점이 있습니다.</p>`,
    good: `<p><strong>GEO(생성형 엔진 최적화)는 ChatGPT·Perplexity 같은 생성형 AI가
   답변에 우리 콘텐츠를 인용하도록 만드는 최적화 작업입니다.</strong>
   전통적 SEO가 검색 순위를 다룬다면 GEO는 AI 답변 안 인용을 목표로 합니다.</p>`,
    note: "정의형 질문에는 첫 문장에서 한 문장으로 명확히 답합니다. 애매한 표현은 0점 처리됩니다.",
  },
  A06: {
    lang: "text",
    badLabel: "결론이 뒤에",
    goodLabel: "두괄식",
    bad: `여러 방법을 검토하고 장단점을 따져본 결과,
그리고 팀 내부 논의를 거쳐,
최종적으로 서버사이드 렌더링을 권장합니다.`,
    good: `서버사이드 렌더링(SSR)을 권장합니다.
이유는 크롤러가 자바스크립트 실행 없이 본문을 읽을 수 있기 때문입니다.
(이하 근거 상세)`,
    note: "결론 → 이유 → 상세 순서. 한 문단에는 하나의 핵심 의미만 담습니다.",
  },
  A08: {
    lang: "html",
    bad: `<h2>기능</h2>
<h2>요금</h2>
<h2>지원</h2>`,
    good: `<h2>어떤 기능을 제공하나요?</h2>
<h2>요금은 얼마인가요?</h2>
<h2>도입 후 지원은 어떻게 되나요?</h2>`,
    note: "heading을 실제 사용자 질문 형태로 쓰면 AI가 heading 단위로 Q&A를 추출하기 쉬워집니다.",
  },
  A09: {
    lang: "html",
    bad: `<p>설치는 저장소를 클론하고 의존성을 설치한 다음
   환경변수를 설정하고 개발 서버를 실행하면 됩니다.</p>`,
    good: `<ol>
  <li>저장소를 클론합니다.</li>
  <li>의존성을 설치합니다: <code>npm install</code></li>
  <li>환경변수(.env)를 설정합니다.</li>
  <li>개발 서버를 실행합니다: <code>npm run dev</code></li>
</ol>`,
    note: "단계·비교·목록형 정보는 문장으로 풀지 말고 ol/ul/table 로 구조화합니다.",
  },
  A10: {
    lang: "html",
    bad: `<h2>자주 묻는 질문</h2>
<p>궁금한 점은 고객센터로 문의해 주세요.</p>`,
    good: `<section>
  <h2>자주 묻는 질문</h2>
  <h3>진단에 로그인이 필요한가요?</h3>
  <p>아니요. URL만 입력하면 바로 진단됩니다.</p>
  <h3>결과는 저장되나요?</h3>
  <p>서버에 저장하지 않습니다. 새로고침하면 초기화됩니다.</p>
</section>`,
    note: "FAQ는 스키마 존재 여부보다 실제 사용자 질문에 유용하게 답하는 Q&A 구조인지가 중요합니다.",
  },

  // ── GEO ──────────────────────────────────────
  G02: {
    lang: "json",
    bad: `<!-- 회사 정보가 본문 텍스트로만 있고 스키마가 없음 -->`,
    good: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SEARCH+AI",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/searchai",
    "https://github.com/searchai"
  ]
}
</script>`,
    note: "AI가 엔티티(주체)를 정확히 식별하도록 Organization/Product/Article 스키마로 명시합니다.",
  },
  G05: {
    lang: "text",
    badLabel: "근거 없는 주장",
    goodLabel: "Claim → Evidence → Source",
    bad: `우리 방식은 업계에서 가장 빠릅니다.`,
    good: `자체 벤치마크에서 평균 응답 시간 1.2초를 기록했습니다(2026-08, 100회 측정).
측정 방법과 원시 데이터: /benchmark 문서 참고.`,
    note: "중요한 주장마다 수치·측정 조건·출처 링크를 붙여야 AI가 사실로 신뢰하고 인용합니다.",
  },
  G07: {
    lang: "html",
    bad: `<p>한 연구에 따르면 AI 검색 사용자가 빠르게 늘고 있다고 합니다.</p>`,
    good: `<p>AI 검색 사용자는 전년 대비 크게 증가했습니다
   (<a href="https://example.org/report-2026">2026 검색 트렌드 리포트</a>, example.org).</p>`,
    note: "출처 표시·링크·발행처·데이터 출처를 명시해 주장의 근거를 추적 가능하게 만듭니다.",
  },
  G12: {
    lang: "html",
    bad: `<p>요금제는 무료는 진단 1회, 프로는 무제한에 리포트가 제공되고
   엔터프라이즈는 전담 지원이 붙습니다.</p>`,
    good: `<table>
  <thead><tr><th>요금제</th><th>진단</th><th>리포트</th><th>지원</th></tr></thead>
  <tbody>
    <tr><td>무료</td><td>월 1회</td><td>-</td><td>-</td></tr>
    <tr><td>프로</td><td>무제한</td><td>PDF</td><td>이메일</td></tr>
    <tr><td>엔터프라이즈</td><td>무제한</td><td>PDF·API</td><td>전담</td></tr>
  </tbody>
</table>`,
    note: "표·정의·단계로 구조화하면 AI가 문장 단위로 정확히 추출해 답변에 사용합니다.",
  },
  G13: {
    lang: "html",
    bad: `<article>
  <h1>2026년 GEO 전략</h1>
  <p>...본문...</p>
</article>`,
    good: `<article>
  <h1>2026년 GEO 전략</h1>
  <p class="byline">작성 홍길동 · SEARCH+AI 리서치 ·
     <time datetime="2026-08-31">2026-08-31</time> 발행</p>
  <p>...본문...</p>
  <section><h2>참고 자료</h2><ul><li><a href="...">출처 1</a></li></ul></section>
</article>`,
    note: "작성자·발행일·참고 자료가 함께 있어야 AI가 인용할 때 출처를 명확히 밝힐 수 있습니다.",
  },
};
