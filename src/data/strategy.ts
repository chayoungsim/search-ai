// B2B 컨설팅 5단계 프로세스 데이터
// 원본: docs/B2B_컨설팅_진행_5단계_프로세스.html
// stages[]의 navTitle은 문서 Section1(flow-nav) 표기, title/purpose/description/tasks는
// Section2(step-card) 표기를 그대로 옮긴 것이다. trackRows/tips도 문서 원문 그대로.

export interface StrategyTask {
  icon: string;
  title: string;
  description: string;
}

export interface StrategyStage {
  id: string; // "01"
  navTitle: string; // Section1 카드용 축약 제목
  title: string; // Section2 카드용 전체 제목
  purpose: string; // "목표: ..."
  description: string;
  tasks: StrategyTask[];
}

export interface StrategyTrackRow {
  label: string;
  dev: string;
  marketing: string;
}

export interface StrategyTip {
  icon: string;
  title: string;
  description: string;
}

export const strategyStages: StrategyStage[] = [
  {
    id: "01",
    navTitle: "사전 준비 & 스코핑",
    title: "1단계: 사전 준비 & 스코핑 (Scope & Data Collection)",
    purpose: "목표: 비즈니스 현황 및 타겟 쿼리 정의",
    description:
      "클라이언트 사이트의 주요 랜딩 페이지, 핵심 제품/서비스 페이지, 그리고 마케팅 아티클 URL을 수집하고 SEO/AEO/GEO 관점의 타겟 검색 쿼리 세트를 구축합니다.",
    tasks: [
      {
        icon: "🔗",
        title: "타겟 URL 세트 정의",
        description:
          "메인 랜딩페이지, 주요 카테고리/제품 페이지, 블로그/아티클 등 진단 대상 URL 선정",
      },
      {
        icon: "❓",
        title: "Q&A 쿼리 세트 100~500개 수집",
        description:
          "구매 전환형 SEO 키워드, 정보 탐색형 AEO 질문, AI 추천형 GEO 프롬프트 쿼리 작성",
      },
      {
        icon: "📊",
        title: "권한 및 데이터 연동",
        description:
          "Google Search Console, GA4 유입 데이터 연동으로 현재 트래픽 베이스라인 측정",
      },
    ],
  },
  {
    id: "02",
    navTitle: "진단 & 심층 분석",
    title: "2단계: 자동 진단 & 전문가 심층 분석 (Audit & Scoring)",
    purpose: "목표: 40:30:30 체계 스코어링 & 격차 도출",
    description:
      "진단 플랫폼을 통해 SEO(40%) · AEO(30%) · GEO(30%) 가중치 알고리즘을 적용하고, 주요 동종 경쟁사 대비 가시성 및 AI 인용률 격차를 분석합니다.",
    tasks: [
      {
        icon: "🔍",
        title: "SEO 기술 진단 (40점)",
        description:
          "robots.txt, SSR 렌더링, Core Web Vitals, JSON-LD 기초 스키마 검증",
      },
      {
        icon: "💬",
        title: "AEO 답변 구조 진단 (30점)",
        description:
          "40~60단어 Direct Answer 블록, FAQPage 스키마, 사용자 검색 의도 부합도 평가",
      },
      {
        icon: "🤖",
        title: "GEO AI 인용 진단 (30점)",
        description:
          "팩트 밀도, Information Gain(독자적 데이터), Perplexity/ChatGPT 인용률 측정",
      },
    ],
  },
  {
    id: "03",
    navTitle: "우선순위 액션플랜",
    title: "3단계: 우선순위 액션 플랜 수립 (Prioritization & Strategy)",
    purpose: "목표: 실행 가능한 타임라인 및 마일스톤 작성",
    description:
      "진단 결과를 Impact vs Effort 매트릭스로 분류하여, 치명적 결함(Critical) 및 즉각적 성과(Quick Wins), 중장기 리팩토링 과제를 구분합니다.",
    tasks: [
      {
        icon: "🚨",
        title: "Critical Issue 도출",
        description:
          "검색 색인 차단, 404/500 에러, Canonical 설정 오류 등 즉시 수정 필요 과제",
      },
      {
        icon: "⚡",
        title: "Quick Wins 선정",
        description:
          "상위 트래픽 글 요약 블록 배치, FAQPage JSON-LD 코드 적용 등 최소 공수/고효율 과제",
      },
      {
        icon: "🚀",
        title: "Major Initiatives 수립",
        description:
          "CSR → SSR 전환, 독자적 연구 데이터 기반 GEO 콘텐츠 파이프라인 구축 로드맵",
      },
    ],
  },
  {
    id: "04",
    navTitle: "보고서 & 킥오프",
    title: "4단계: 클라이언트 보고서 전달 & 킥오프 (Reporting & Kickoff)",
    purpose: "목표: 경영진/실무자 이해도 도모 및 합의",
    description:
      "경영진을 위한 1페이지 Executive Summary와 함께 개발팀 및 마케팅팀 각각이 즉시 활용 가능한 커스텀 해결 가이드라인을 제공합니다.",
    tasks: [
      {
        icon: "📋",
        title: "Executive Summary",
        description:
          "경영진용 1페이지 요약 리포트 (Overall Score, 경쟁사 비교, ROI 기대효과)",
      },
      {
        icon: "💻",
        title: "개발자용 기술 가이드",
        description:
          "복사 가능한 JSON-LD 스키마 코드, Robots/Rendering/Performance 수정 스펙",
      },
      {
        icon: "✍️",
        title: "마케터용 콘텐츠 가이드",
        description:
          "AEO/GEO 최적화 H1~H3 헤더 아웃라인 및 Q&A 작성 템플릿 제공",
      },
    ],
  },
  {
    id: "05",
    navTitle: "이행 지원 & Re-Audit",
    title: "5단계: 이행 지원 & Re-Audit 검증 (Verification Loop)",
    purpose: "목표: 점수 상승 (+Delta) 및 성과 정량화",
    description:
      "개선안 적용 후 재진단(Re-Audit)을 실행하여 스코어 향상(+Delta) 및 AI 인용률 상승을 정량적으로 증명하고 월간 모니터링 체계로 전환합니다.",
    tasks: [
      {
        icon: "🛠️",
        title: "수정 배포 QA 지원",
        description:
          "클라이언트 개발/마케팅팀의 코드 적용 및 CMS 업데이트 사전 검증 지원",
      },
      {
        icon: "📈",
        title: "Re-Audit 점수 향상 검증",
        description:
          "Before vs After 비교 (예: SEO 65점 → 88점, AI 인용률 45% → 80% 증명)",
      },
      {
        icon: "🔄",
        title: "지속 모니터링 체계",
        description:
          "월간/분기별 Search Visibility 점수 모니터링 및 AI 알고리즘 변화 대응 파트너십",
      },
    ],
  },
];

export const strategyTrackRows: StrategyTrackRow[] = [
  {
    label: "1. 진단 영역",
    dev: "robots.txt, SSR/CSR 렌더링, Core Web Vitals, 기본 스키마 마크업 유효성",
    marketing: "검색 의도(Intent) 부합도, Direct Answer 유무, 팩트 밀도, FAQ 구조",
  },
  {
    label: "2. 제공 산출물",
    dev: "JSON-LD 코드 스니펫, 서버 렌더링 개선 요구서, 속도 최적화 가이드",
    marketing: "Q&A 아웃라인, H1~H3 헤더 구조 가이드, 독자 연구 데이터 배치안",
  },
  {
    label: "3. 이행 작업",
    dev: "웹사이트 소스코드 수정 및 Pull Request 배포",
    marketing: "CMS 콘텐츠 업데이트 및 신규 Q&A 아티클 발행",
  },
  {
    label: "4. 검증 방식",
    dev: "Google Rich Results Test 통과 확인, 크롤링 404/500 오류 0건 검증",
    marketing: "Google AI Overviews / Perplexity 내 브랜드 출처 인용 모니터링",
  },
];

export const strategyTips: StrategyTip[] = [
  {
    icon: "⚡",
    title: '1. "Quick Win"으로 첫 주 효능감 제공',
    description:
      "전체 사이트 개발 개편 대신, 상위 트래픽 5개 페이지에 스키마 마크업 및 40~60단어 요약 블록을 먼저 배치하여 1~2주 내에 점수 상승을 즉시 보여주세요.",
  },
  {
    icon: "🤖",
    title: "2. AI 알고리즘 변화 모니터링 리포팅",
    description:
      "ChatGPT Search, Perplexity, Google AI Overviews의 인용 구조가 지속적으로 업데이트되므로, 엔진별 인용 현황 차이를 정량화하여 제공하면 클라이언트 신뢰도가 급증합니다.",
  },
  {
    icon: "🎯",
    title: "3. 무료 1차 진단 → 유상 컨설팅 세일즈",
    description:
      "URL과 메인 키워드 1개 입력으로 즉시 생성되는 1페이지 간이 진단서(Teaser Report)를 먼저 제공한 뒤, 딥다이브 진단 및 개선 컨설팅(유상)으로 자연스럽게 전환하세요.",
  },
];
