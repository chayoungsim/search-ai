// SEO 진단 체크리스트 데이터
// 원본: docs/SEO 체크리스트.md (Technical SEO 20점 · On-page/Content 14점 · Structured Data 5점, 총 19개 Rule)
// checks[] 배열은 원본 체크리스트의 체크박스 항목을 그대로 옮긴 것이며, summary/description은 신규 작성 카피다.

export interface SeoRule {
  id: string; // "S01"
  title: string; // "HTTPS"
  weight: number; // 2
  summary: string; // 이 항목이 왜 중요한지 1문장
  checks: string[]; // 체크리스트 원문 그대로
}

export interface SeoCategory {
  key: string;
  label: string; // "Technical SEO"
  range: string; // "S01–S08"
  weight: number; // 카테고리 Weight 합산값
  description: string;
  rules: SeoRule[];
}

export interface SeoWhyCard {
  title: string;
  description: string;
}

export interface SeoIntro {
  lead: string;
  whyCards: SeoWhyCard[];
  scoreNote: string;
}

export const seoIntro: SeoIntro = {
  lead: "SEO(Search Engine Optimization, 검색엔진 최적화)는 검색엔진이 웹사이트의 콘텐츠를 원활하게 크롤링하고, 색인하고, 검색 결과에서 사용자에게 적절히 노출할 수 있도록 웹사이트를 개선하는 활동입니다. 아무리 좋은 콘텐츠라도 검색엔진이 발견하지 못하거나 잘못 이해하면 사용자에게 닿을 수 없기 때문에, SEO는 모든 온라인 콘텐츠 전략의 출발점이 됩니다.",
  whyCards: [
    {
      title: "검색엔진과의 신뢰 관계를 만듭니다",
      description:
        "HTTPS, 크롤링 허용, 사이트맵처럼 기술적으로 안정된 사이트만이 검색엔진의 크롤러에게 신뢰받고, 정확하게 색인될 수 있습니다. 기술적 기반이 부실하면 아무리 좋은 콘텐츠도 검색 결과에 노출되지 않습니다.",
    },
    {
      title: "사용자에게 실질적인 가치를 전달합니다",
      description:
        "제목, 헤딩, 콘텐츠 품질을 다듬는 과정은 결국 사용자가 원하는 답을 더 빠르고 명확하게 찾을 수 있도록 돕는 일입니다. SEO 최적화는 검색엔진을 위한 작업이자 동시에 사용자 경험을 개선하는 작업입니다.",
    },
  ],
  scoreNote:
    "SEO는 Overall Score(100점)의 40%를 차지하며, Technical SEO 20점 · On-page/Content 14점 · Structured Data 5점, 총 19개 항목(S01~S19)으로 진단합니다. (Weight 합산 기준 총 39점으로, 원본 체크리스트 문서의 표기치 40점과는 1점 차이가 있습니다.)",
};

export const seoChecklist: SeoCategory[] = [
  {
    key: "technical",
    label: "Technical SEO",
    range: "S01–S08",
    weight: 20,
    description:
      "검색엔진이 사이트에 정상적으로 접근하고, 크롤링하고, 색인할 수 있는지를 확인하는 기술적 기반입니다. HTTPS, 크롤링 허용 여부, 사이트맵, 리다이렉트, 모바일 대응, 페이지 속도, 내부 링크 구조까지 검색엔진과 사용자가 사이트를 문제없이 이용할 수 있는 환경을 만드는 항목들로 구성됩니다.",
    rules: [
      {
        id: "S01",
        title: "HTTPS",
        weight: 2,
        summary:
          "HTTPS와 리다이렉트, Mixed Content 여부는 사용자 데이터를 보호하고 브라우저 경고 없이 신뢰할 수 있는 사이트라는 것을 검색엔진과 사용자 모두에게 보여주는 가장 기본적인 보안 기준입니다.",
        checks: ["HTTPS 적용", "HTTP → HTTPS redirect", "Mixed Content 없음"],
      },
      {
        id: "S02",
        title: "Crawlability",
        weight: 3,
        summary:
          "robots.txt와 크롤러 접근 설정이 올바르지 않으면 검색엔진이 중요한 페이지를 아예 발견하지 못해, 이후의 모든 SEO 노력이 무의미해질 수 있습니다.",
        checks: [
          "robots.txt 존재",
          "중요한 페이지 차단 없음",
          "Googlebot / Bingbot 접근 가능",
          "불필요한 페이지 크롤링 제어",
        ],
      },
      {
        id: "S03",
        title: "Indexability",
        weight: 3,
        summary:
          "noindex, canonical, X-Robots-Tag 설정을 점검해 검색엔진이 의도한 페이지만 정확히 색인하도록 만드는 항목입니다.",
        checks: [
          "noindex 여부 확인",
          "X-Robots-Tag 확인",
          "canonical 확인",
          "indexable 상태",
        ],
      },
      {
        id: "S04",
        title: "Sitemap",
        weight: 2,
        summary:
          "정상적인 sitemap.xml은 검색엔진이 사이트의 전체 페이지 구조와 최신 상태를 빠르게 파악하도록 돕는 지도 역할을 합니다.",
        checks: [
          "sitemap.xml 존재",
          "정상 XML",
          "canonical URL 포함",
          "broken URL 없음",
          "lastmod 정보 적절",
        ],
      },
      {
        id: "S05",
        title: "URL / Redirect",
        weight: 2,
        summary:
          "리다이렉트 체인이나 404, soft 404가 방치되면 크롤링 예산이 낭비되고 사용자 경험도 나빠지므로, URL 상태와 canonical 일치 여부를 꾸준히 점검해야 합니다.",
        checks: [
          "HTTP 200",
          "redirect chain 없음",
          "404 없음",
          "soft 404 없음",
          "canonical과 실제 URL 일치",
        ],
      },
      {
        id: "S06",
        title: "Mobile",
        weight: 2,
        summary:
          "대부분의 검색 트래픽이 모바일에서 발생하는 만큼, viewport 설정과 반응형 레이아웃, 콘텐츠 동등성은 모바일 우선 색인 시대의 필수 조건입니다.",
        checks: [
          "viewport 설정",
          "responsive layout",
          "mobile content parity",
          "horizontal overflow 없음",
        ],
      },
      {
        id: "S07",
        title: "Performance",
        weight: 3,
        summary:
          "LCP, INP, CLS 같은 Core Web Vitals와 이미지·리소스 최적화는 검색 순위 요소이자 실제 사용자가 페이지를 얼마나 쾌적하게 경험하는지를 좌우합니다.",
        checks: [
          "LCP",
          "INP",
          "CLS",
          "이미지 최적화",
          "JS / CSS 과도한 blocking 없음",
        ],
      },
      {
        id: "S08",
        title: "Internal Architecture",
        weight: 3,
        summary:
          "내부 링크 구조와 페이지 depth, anchor text는 검색엔진이 사이트 내에서 어떤 페이지가 중요한지 이해하고 link equity를 배분하는 기준이 됩니다.",
        checks: [
          "내부 링크 존재",
          "orphan page 없음",
          "주요 페이지 depth 과도하지 않음",
          "anchor text 명확",
          "중요 페이지로 link equity 전달",
        ],
      },
    ],
  },
  {
    key: "onpage",
    label: "On-page / Content",
    range: "S09–S15",
    weight: 14,
    description:
      "실제로 노출되는 페이지 콘텐츠와 마크업이 검색 의도에 부합하는지 평가하는 영역입니다. 제목, 메타 설명, 헤딩 구조, 시맨틱 마크업은 물론 콘텐츠가 키워드 및 사용자 의도와 얼마나 일치하는지, 실질적인 가치를 담고 있는지를 함께 점검합니다.",
    rules: [
      {
        id: "S09",
        title: "Title",
        weight: 2,
        summary:
          "title 태그는 검색 결과에서 가장 먼저 노출되는 요소로, 페이지별로 고유하고 핵심 주제를 담아야 클릭과 색인 모두에서 유리합니다.",
        checks: [
          "title 존재",
          "페이지별 고유 title",
          "핵심 주제 반영",
          "과도한 keyword stuffing 없음",
        ],
      },
      {
        id: "S10",
        title: "Meta Description",
        weight: 1,
        summary:
          "메타 설명은 순위에 직접 반영되지는 않지만, 검색 결과에서 클릭 여부를 좌우하는 요약문이므로 페이지 내용과 사용자 의도를 정확히 반영해야 합니다.",
        checks: [
          "존재",
          "페이지별 고유",
          "페이지 내용과 일치",
          "사용자 의도를 반영",
        ],
      },
      {
        id: "S11",
        title: "Heading",
        weight: 2,
        summary:
          "H1부터 이어지는 헤딩 계층 구조는 검색엔진과 사용자 모두에게 콘텐츠의 논리적 흐름을 알려주는 지도 역할을 합니다.",
        checks: [
          "H1 존재",
          "H1 중복 없음",
          "H2/H3 계층 구조 준수",
          "heading이 실제 콘텐츠 구조를 설명",
        ],
      },
      {
        id: "S12",
        title: "Semantic HTML",
        weight: 2,
        summary:
          "header, nav, main, section 같은 시맨틱 태그를 적절히 사용하면 검색엔진과 스크린 리더가 페이지 구조를 더 정확하게 해석할 수 있습니다.",
        checks: [
          "header / nav / main / section / article / footer",
          "button / link 적절한 사용",
        ],
      },
      {
        id: "S13",
        title: "Content Relevance",
        weight: 3,
        summary:
          "콘텐츠가 타겟 키워드와 실제 검색 의도에 얼마나 부합하는지는 검색엔진이 페이지를 특정 쿼리에 매칭시킬지를 결정하는 핵심 기준입니다.",
        checks: [
          "입력 keyword와 콘텐츠 주제 일치",
          "검색 의도와 콘텐츠 일치",
          "핵심 질문에 대한 내용 존재",
          "불필요한 keyword 반복 없음",
        ],
      },
      {
        id: "S14",
        title: "Content Quality",
        weight: 3,
        summary:
          "독창적이고 구체적이며 최신 정보를 담은 콘텐츠만이 사용자와 검색엔진 모두에게 실질적인 가치가 있다고 평가받습니다.",
        checks: [
          "독창적인 정보",
          "구체적인 설명",
          "실제 경험 / 사례",
          "최신 정보",
          "사용자에게 실질적인 가치",
        ],
      },
      {
        id: "S15",
        title: "Image / Media",
        weight: 1,
        summary:
          "이미지 alt 텍스트와 파일 최적화는 접근성을 높이는 동시에, 이미지 검색과 페이지 로딩 속도에도 직접적인 영향을 줍니다.",
        checks: [
          "의미 있는 이미지 alt",
          "장식 이미지 처리",
          "이미지 파일 최적화",
          "영상 / 미디어 설명 제공",
        ],
      },
    ],
  },
  {
    key: "structured",
    label: "Structured Data",
    range: "S16–S19",
    weight: 5,
    description:
      "JSON-LD 등 구조화 데이터가 존재하고, 문법적으로 올바르며, 페이지의 실제 콘텐츠와 일치하는지를 확인하는 영역입니다. 검색엔진이 페이지의 엔티티와 맥락을 더 정확히 이해하도록 돕는 보조 신호를 점검합니다.",
    rules: [
      {
        id: "S16",
        title: "Schema Presence",
        weight: 1,
        summary:
          "페이지 유형에 맞는 JSON-LD 구조화 데이터가 존재하는지 확인해, 검색엔진이 콘텐츠를 더 풍부한 형태(리치 리절트)로 이해할 수 있는 기반을 마련합니다.",
        checks: ["JSON-LD 존재", "페이지 유형에 적절한 Schema 사용"],
      },
      {
        id: "S17",
        title: "Schema Validity",
        weight: 2,
        summary:
          "JSON-LD 문법과 @context, @type, property가 정확해야 검색엔진이 구조화 데이터를 오류 없이 파싱하고 신뢰할 수 있습니다.",
        checks: [
          "JSON-LD syntax 정상",
          "@context 정상",
          "@type 정상",
          "property 오류 없음",
        ],
      },
      {
        id: "S18",
        title: "Entity Completeness",
        weight: 1,
        summary:
          "Organization, Person, Product 등 핵심 엔티티에 name, url, identifier, sameAs 같은 정보가 충분히 채워져 있어야 검색엔진이 실체를 명확히 식별할 수 있습니다.",
        checks: [
          "Organization / Person / Product 등 entity 정의",
          "name / url / identifier / sameAs",
        ],
      },
      {
        id: "S19",
        title: "Schema Consistency",
        weight: 1,
        summary:
          "구조화 데이터는 화면에 보이는 실제 콘텐츠와 반드시 일치해야 하며, 중복되거나 상충하는 엔티티가 없어야 검색엔진의 신뢰를 유지할 수 있습니다.",
        checks: [
          "페이지 내용과 Schema 일치",
          "visible content와 구조화 데이터 일치",
          "중복 entity 없음",
        ],
      },
    ],
  },
];
