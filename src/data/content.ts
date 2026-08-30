// 네비게이션 메뉴 항목
export const navLinks = [
  { href: "/#overview", label: "Overview" },
  { href: "/#seo", label: "SEO" },
  { href: "/#aeo", label: "AEO" },
  { href: "/#geo", label: "GEO" },
  { href: "/#strategy", label: "Strategy" },
];

// COMPARISON 섹션 카드 데이터
export const comparisonCards = [
  {
    number: "01 / SEARCH",
    title: "SEO",
    subtitle: "Search Engine Optimization",
    description:
      "검색엔진에서 웹사이트의 검색 노출과 순위를 높이기 위한 최적화 전략입니다.",
    list: [
      "검색 키워드 최적화",
      "페이지 구조 최적화",
      "웹사이트 성능 개선",
      "내부 링크 및 백링크",
    ],
  },
  {
    number: "02 / ANSWER",
    title: "AEO",
    subtitle: "Answer Engine Optimization",
    description:
      "사용자의 질문에 대한 직접적인 답변으로 콘텐츠가 선택되도록 최적화하는 전략입니다.",
    list: ["질문 중심 콘텐츠", "FAQ 구조", "명확한 정의와 답변", "구조화된 정보"],
  },
  {
    number: "03 / GENERATIVE AI",
    title: "GEO",
    subtitle: "Generative Engine Optimization",
    description:
      "생성형 AI가 콘텐츠를 이해하고 답변에 참고하거나 인용할 수 있도록 최적화하는 전략입니다.",
    list: [
      "전문성과 신뢰성",
      "명확한 콘텐츠 구조",
      "최신 데이터와 근거",
      "AI가 이해하기 쉬운 정보",
    ],
  },
];

// DETAIL 섹션 데이터
export const detailSections = [
  {
    id: "seo",
    index: "02 / SEARCH",
    strong: "SEO",
    heading: ["검색엔진에서", "발견되는 콘텐츠"],
    description:
      "SEO는 Search Engine Optimization의 약자로, 검색엔진이 웹사이트의 콘텐츠를 정확하게 이해하고 검색 사용자에게 적절한 결과로 제공할 수 있도록 웹사이트를 최적화하는 방법입니다.",
    featureTitle: "핵심 요소",
    features: [
      "적절한 키워드 사용",
      "명확한 H1 / H2 / H3 구조",
      "시맨틱 HTML",
      "메타 태그 최적화",
      "이미지 ALT 텍스트",
      "페이지 로딩 속도",
      "모바일 최적화",
      "내부 링크 구조",
    ],
  },
  {
    id: "aeo",
    index: "03 / ANSWER",
    strong: "AEO",
    heading: ["질문에 대한", "답변이 되는 콘텐츠"],
    description:
      "AEO는 Answer Engine Optimization의 약자로, 검색엔진이나 AI가 사용자의 질문을 이해하고 가장 적절한 답변을 선택할 수 있도록 콘텐츠를 구조화하는 전략입니다.",
    featureTitle: "좋은 AEO 콘텐츠",
    features: [
      "질문을 제목으로 사용",
      "첫 문장에서 핵심 답변 제공",
      "FAQ 콘텐츠 구성",
      "단계별 설명",
      "비교표 활용",
      "짧고 명확한 문장",
    ],
  },
  {
    id: "geo",
    index: "04 / GENERATIVE AI",
    strong: "GEO",
    heading: ["AI가 이해하고", "인용하는 콘텐츠"],
    description:
      "GEO는 Generative Engine Optimization의 약자로, ChatGPT, Gemini, Claude, Perplexity와 같은 생성형 AI가 웹 콘텐츠를 이해하고 답변을 생성할 때 참고할 수 있도록 콘텐츠를 최적화하는 전략입니다.",
    featureTitle: "GEO에서 중요한 요소",
    features: [
      "전문성 있는 콘텐츠",
      "신뢰할 수 있는 출처",
      "최신 데이터",
      "구체적인 사례",
      "명확한 작성자 정보",
      "구조화된 데이터",
      "논리적인 콘텐츠 구조",
      "신뢰할 수 있는 외부 인용",
    ],
  },
];

// STRATEGY 섹션 흐름 데이터
export const strategyFlow = [
  {
    label: "01 / DISCOVER",
    title: "SEO",
    description: "검색엔진에서 콘텐츠가 발견될 수 있도록 최적화합니다.",
  },
  {
    label: "02 / ANSWER",
    title: "AEO",
    description: "사용자의 질문에 대한 명확한 답변이 되도록 구성합니다.",
  },
  {
    label: "03 / GENERATE",
    title: "GEO",
    description: "생성형 AI가 콘텐츠를 이해하고 참고할 수 있도록 만듭니다.",
  },
];

// CHECKLIST 섹션 카드 데이터
export const checkCards = [
  {
    title: "SEO",
    items: [
      "Semantic HTML",
      "Title / Description",
      "Heading Structure",
      "Image ALT",
      "Core Web Vitals",
      "Mobile Responsive",
    ],
  },
  {
    title: "AEO",
    items: [
      "질문형 제목",
      "FAQ 콘텐츠",
      "명확한 정의",
      "짧은 답변",
      "단계별 설명",
      "구조화된 콘텐츠",
    ],
  },
  {
    title: "GEO",
    items: [
      "전문성 있는 콘텐츠",
      "신뢰할 수 있는 출처",
      "최신 정보",
      "구체적인 데이터",
      "Author 정보",
      "Structured Data",
    ],
  },
];
