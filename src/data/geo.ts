// GEO 진단 체크리스트 데이터
// 원본: docs/GEO 체크리스트.md (Entity Clarity 7점 · Evidence/Provenance 7점 · Citation Readiness 6점 ·
// Topical Coverage 5점 · Freshness/Consistency 3점 · AI Visibility 2점, 총 22개 Rule, 합계 30점)
// checks[] 배열은 원본 체크리스트의 체크박스(및 우선순위·예시) 항목을 그대로 옮긴 것이며,
// summary/description은 신규 작성 카피다.

export interface GeoRule {
  id: string; // "G01"
  title: string; // "Primary Entity"
  weight: number; // 2
  summary: string; // 이 항목이 왜 중요한지 1문장
  checks: string[]; // 체크리스트 원문 그대로
}

export interface GeoCategory {
  key: string;
  label: string; // "Entity Clarity"
  range: string; // "G01–G04"
  weight: number; // 카테고리 Weight 합산값
  description: string;
  rules: GeoRule[];
}

export interface GeoWhyCard {
  title: string;
  description: string;
}

export interface GeoIntro {
  lead: string;
  whyCards: GeoWhyCard[];
  scoreNote: string;
}

export const geoIntro: GeoIntro = {
  lead: "GEO(Generative Engine Optimization, 생성형 엔진 최적화)는 ChatGPT, Gemini, Perplexity 같은 생성형 AI가 콘텐츠를 검색·요약하고 답변에 인용(citation)하기 쉬운 구조로 만드는 활동입니다. AI는 명확한 엔티티, 근거가 뒷받침된 주장, 문장 단위로 그대로 가져다 쓰기 좋은 정보를 우선적으로 신뢰하기 때문에, GEO는 콘텐츠가 AI에게 '인용해도 안전한 정보'로 인식되도록 다듬는 과정입니다.",
  whyCards: [
    {
      title: "AI가 신뢰할 수 있는 근거 구조를 갖춰야 합니다",
      description:
        "Claim → Evidence → Source로 이어지는 구조와 출처의 품질이 명확해야 생성형 AI가 콘텐츠의 주장을 사실로 받아들이고 위험 없이 인용할 수 있습니다. 근거가 부실한 콘텐츠는 AI가 답변에 사용하기를 꺼립니다.",
      },
    {
      title: "문장 단위로 그대로 인용될 수 있어야 합니다",
      description:
        "문맥 없이 한 문장만 떼어내도 의미가 유지되고, 리스트·표·단계처럼 구조화된 형태로 정리된 정보일수록 AI가 손쉽게 추출해 답변에 그대로 활용할 수 있습니다.",
    },
  ],
  scoreNote:
    "GEO는 Overall Score(100점)의 30%를 차지하며, Entity Clarity 7점 · Evidence/Provenance 7점 · Citation Readiness 6점 · Topical Coverage 5점 · Freshness/Consistency 3점 · AI Visibility 2점, 총 22개 항목(G01~G22)으로 진단합니다. (GEO Score는 실제 AI Citation Score와는 다른 개념으로, 인용 데이터가 없다고 해서 0점 처리하지 않고 Rule 기반 + AI 추정으로 평가합니다.)",
};

export const geoChecklist: GeoCategory[] = [
  {
    key: "entity-clarity",
    label: "Entity Clarity",
    range: "G01–G04",
    weight: 7,
    description:
      "사이트가 무엇에 관한 콘텐츠인지, 그 주체(Entity)가 누구인지 AI가 명확히 식별할 수 있는지를 평가합니다. 적절한 Schema와 일관된 명칭, Entity 간 관계가 정의되어 있어야 AI가 정보를 정확히 구조화해 이해할 수 있습니다.",
    rules: [
      {
        id: "G01",
        title: "Primary Entity",
        weight: 2,
        summary:
          "사이트가 어떤 주체(기업/제품/서비스/인물/기관)에 관한 것인지 명확해야 AI가 콘텐츠의 정체성을 정확히 파악하고 인용할 대상으로 인식할 수 있습니다.",
        checks: [
          "사이트가 무엇에 관한 것인지(Company / Product / Service / Person / Organization) 명확한가?",
        ],
      },
      {
        id: "G02",
        title: "Entity Schema",
        weight: 2,
        summary:
          "페이지 유형에 맞는 Schema(Organization, Product, Article 등)를 사용하면 AI가 엔티티의 속성과 유형을 구조적으로 이해할 수 있습니다.",
        checks: [
          "Organization",
          "Person",
          "Product",
          "Service",
          "Article",
          "WebPage",
        ],
      },
      {
        id: "G03",
        title: "Entity Relationship",
        weight: 2,
        summary:
          "Company → Product → Article → Author처럼 엔티티 간 상하·연관 관계가 명확해야 AI가 정보의 맥락과 출처 관계를 정확히 파악할 수 있습니다.",
        checks: [
          "Entity 간 상하/연관 관계가 명확하게 정의되어 있는가? (예: Company → Product → Article → Author)",
        ],
      },
      {
        id: "G04",
        title: "Identity Consistency",
        weight: 1,
        summary:
          "회사명, 제품명, URL, sameAs 등 정체성 정보가 채널마다 일관되어야 AI가 동일한 엔티티로 정확히 매칭할 수 있습니다.",
        checks: ["회사명 일관성", "제품명 일관성", "URL 일관성", "sameAs"],
      },
    ],
  },
  {
    key: "evidence-provenance",
    label: "Evidence / Provenance",
    range: "G05–G08",
    weight: 7,
    description:
      "콘텐츠의 주장이 신뢰할 수 있는 출처와 근거로 뒷받침되는지를 평가합니다. Claim → Evidence → Source로 이어지는 구조와 출처의 품질이 AI가 이 콘텐츠를 안심하고 인용할 수 있는지를 결정합니다.",
    rules: [
      {
        id: "G05",
        title: "Claim Evidence",
        weight: 2,
        summary:
          "중요한 주장마다 근거와 출처로 이어지는 구조가 있어야 AI가 그 주장을 사실로 신뢰하고 인용할 수 있습니다.",
        checks: [
          "중요한 주장(Claim)마다 근거(Evidence)와 출처(Source)로 이어지는 구조가 있는가? (Claim → Evidence → Source)",
        ],
      },
      {
        id: "G06",
        title: "Source Quality",
        weight: 2,
        summary:
          "공식 문서, 정부·공공기관, 학술 자료처럼 신뢰도가 높은 출처를 인용할수록 AI가 콘텐츠를 안전하게 인용할 근거로 삼습니다.",
        checks: [
          "1순위: 공식 문서",
          "2순위: 정부 / 공공기관",
          "3순위: 학술 / 연구",
          "4순위: 전문기관",
          "5순위: 신뢰 가능한 미디어",
          "6순위: 일반 웹사이트",
        ],
      },
      {
        id: "G07",
        title: "Attribution",
        weight: 1,
        summary:
          "출처 표시, 링크, 참고자료, 데이터 출처가 명시되어야 AI와 사용자 모두 주장의 근거를 추적할 수 있습니다.",
        checks: ["출처 표시", "링크", "참고자료", "데이터 출처"],
      },
      {
        id: "G08",
        title: "Claim / Source Relationship",
        weight: 2,
        summary:
          "주장과 출처가 1:1로 명확히 연결되어야 AI가 어떤 근거가 어떤 주장을 뒷받침하는지 정확히 파악할 수 있습니다.",
        checks: ["주장(Claim)과 출처(Source)가 실제로 1:1로 연결되는가?"],
      },
    ],
  },
  {
    key: "citation-readiness",
    label: "Citation Readiness",
    range: "G09–G13",
    weight: 6,
    description:
      "문장이나 문단이 맥락 없이 떼어내도 의미가 유지되고, AI가 그대로 가져가 쓰기 쉬운 형태로 구조화되어 있는지를 평가합니다.",
    rules: [
      {
        id: "G09",
        title: "Extractable Answer",
        weight: 2,
        summary:
          "AI가 한 문장이나 짧은 문단 단위로 그대로 가져가 쓸 수 있는 정보 블록이어야 인용 확률이 높아집니다.",
        checks: [
          "AI가 한 문장 또는 짧은 문단 단위로 그대로 가져가기 쉬운 정보 블록인가?",
        ],
      },
      {
        id: "G10",
        title: "Clear Claims",
        weight: 1,
        summary:
          "모호한 주관적 표현 대신 단정적이고 구체적인 명제 문장이어야 AI가 사실 정보로 판단하고 인용하기 쉽습니다.",
        checks: [
          "단정적이고 구체적인 명제 문장으로 구성되어 있는가? (모호한 주관적 표현이 아닌가?)",
        ],
      },
      {
        id: "G11",
        title: "Context Completeness",
        weight: 1,
        summary:
          "문장만 따로 떼어 인용해도 의미가 유지되어야 AI가 문맥 손실 없이 해당 문장을 그대로 사용할 수 있습니다.",
        checks: ["문장만 따로 떼어 인용해도 의미가 유지되는가?"],
      },
      {
        id: "G12",
        title: "Structured Information",
        weight: 1,
        summary:
          "리스트, 표, 정의, 단계, FAQ 같은 구조화된 형식은 AI가 정보를 파싱하고 추출하기 훨씬 쉽게 만듭니다.",
        checks: ["List", "Table", "Definition", "Steps", "FAQ"],
      },
      {
        id: "G13",
        title: "Attribution-ready Content",
        weight: 1,
        summary:
          "작성자, 출처, 날짜, 참고자료가 함께 제공되면 AI가 인용 시 출처를 명확히 밝힐 수 있는 완결된 정보가 됩니다.",
        checks: ["작성자", "출처", "날짜", "참고자료"],
      },
    ],
  },
  {
    key: "topical-coverage",
    label: "Topical Coverage",
    range: "G14–G17",
    weight: 5,
    description:
      "핵심 주제를 얼마나 깊이 있게, 관련 개념까지 폭넓게 다루고 있는지를 평가합니다. 주제의 깊이와 관련 Entity 커버리지는 AI가 이 콘텐츠를 해당 주제의 권위 있는 자료로 인식하게 만듭니다.",
    rules: [
      {
        id: "G14",
        title: "Topic Depth",
        weight: 2,
        summary:
          "핵심 키워드를 중심으로 콘텐츠가 충분히 깊이 있게 다뤄져야 AI가 이 콘텐츠를 해당 주제의 신뢰할 만한 자료로 판단합니다.",
        checks: ["핵심 keyword를 중심으로 콘텐츠가 충분히 깊이 있게 다뤄지는가?"],
      },
      {
        id: "G15",
        title: "Related Entity Coverage",
        weight: 1,
        summary:
          "React의 Virtual DOM, JSX처럼 관련 엔티티까지 충분히 설명되어야 주제를 포괄적으로 다룬다는 신호가 됩니다.",
        checks: [
          "관련 Entity(예: React → Virtual DOM, JSX 등)가 충분히 설명되는가?",
        ],
      },
      {
        id: "G16",
        title: "Topic Relationship",
        weight: 1,
        summary:
          "관련 페이지가 내부 링크로 연결되어 있어야 AI가 주제 간 관계와 콘텐츠의 전체 구조를 파악할 수 있습니다.",
        checks: ["관련 페이지가 내부 링크로 연결되어 있는가?"],
      },
      {
        id: "G17",
        title: "Content Gap",
        weight: 1,
        summary:
          "경쟁 콘텐츠나 예상 질문 대비 빠진 핵심 하위 주제가 없어야 콘텐츠의 커버리지가 충분하다고 평가받습니다.",
        checks: [
          "경쟁 콘텐츠 또는 예상 질문 대비 부족한 핵심 하위 주제가 없는가?",
        ],
      },
    ],
  },
  {
    key: "freshness-consistency",
    label: "Freshness / Consistency",
    range: "G18–G20",
    weight: 3,
    description:
      "정보가 최신 상태로 유지되고, 여러 채널과 페이지에서 서로 모순되지 않는지를 평가합니다. 상충되는 정보는 AI가 어떤 것을 신뢰해야 할지 판단하기 어렵게 만듭니다.",
    rules: [
      {
        id: "G18",
        title: "Freshness",
        weight: 1,
        summary:
          "최신 업데이트가 반영되고 outdated 정보가 없어야 AI가 안심하고 인용할 수 있는 신선한 정보로 판단합니다.",
        checks: ["최신 업데이트가 반영되어 있는가?", "outdated information이 없는가?"],
      },
      {
        id: "G19",
        title: "Cross-channel Consistency",
        weight: 1,
        summary:
          "웹사이트, Google, Bing, 소셜 등 여러 채널에서 핵심 엔티티 정보가 일치해야 AI가 신뢰할 수 있는 단일한 사실로 인식합니다.",
        checks: ["Website", "Google", "Bing", "Social", "Knowledge sources"],
      },
      {
        id: "G20",
        title: "Contradiction",
        weight: 1,
        summary:
          "서로 다른 페이지에서 상충되는 정보가 있으면 AI가 어떤 정보를 신뢰해야 할지 판단하기 어려워 인용을 꺼리게 됩니다.",
        checks: ["서로 다른 페이지에서 상충되는 정보가 없는가?"],
      },
    ],
  },
  {
    key: "ai-visibility",
    label: "AI Visibility",
    range: "G21–G22",
    weight: 2,
    description:
      "실제 AI citation 및 grounding 데이터가 있다면 이를 반영해 평가합니다. 데이터가 없는 경우 0점이 아닌 N/A로 별도 표시해, 데이터 부재와 실제 낮은 품질을 구분합니다.",
    rules: [
      {
        id: "G21",
        title: "Citation Data",
        weight: 1,
        summary:
          "실제 Citation count, Cited pages, Citation trend 데이터가 있다면 이를 반영해 콘텐츠가 실제로 얼마나 인용되고 있는지 파악합니다.",
        checks: ["Citation count", "Cited pages", "Citation trend"],
      },
      {
        id: "G22",
        title: "Grounding / Query Data",
        weight: 1,
        summary:
          "Grounding query 데이터가 있다면 반영하고, 없다면 0점이 아닌 N/A로 표시해 데이터 부재와 낮은 품질을 구분합니다.",
        checks: [
          "Grounding query 데이터가 있다면 반영했는가?",
          "데이터가 없다면 0점이 아닌 N/A(\"AI Visibility Data Unavailable\")로 표시했는가?",
        ],
      },
    ],
  },
];
