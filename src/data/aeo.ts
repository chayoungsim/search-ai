// AEO 진단 체크리스트 데이터
// 원본: docs/AEO 체크리스트.md (Question Coverage 8점 · Direct Answer 7점 · Content Structure 5점 ·
// Intent Matching 4점 · Answer Evidence 3점 · Question Expansion 3점, 총 17개 Rule, 합계 30점)
// checks[] 배열은 원본 체크리스트의 체크박스 항목을 그대로 옮긴 것이며(A04는 0/0.5/0.75/1 점수 척도표를
// 리스트 형태로 변환), summary/description은 신규 작성 카피다.

export interface AeoRule {
  id: string; // "A01"
  title: string; // "Core Question"
  weight: number; // 3
  summary: string; // 이 항목이 왜 중요한지 1문장
  checks: string[]; // 체크리스트 원문 그대로
}

export interface AeoCategory {
  key: string;
  label: string; // "Question Coverage"
  range: string; // "A01–A03"
  weight: number; // 카테고리 Weight 합산값
  description: string;
  rules: AeoRule[];
}

export interface AeoWhyCard {
  title: string;
  description: string;
}

export interface AeoIntro {
  lead: string;
  whyCards: AeoWhyCard[];
  scoreNote: string;
}

export const aeoIntro: AeoIntro = {
  lead: "AEO(Answer Engine Optimization, 답변 엔진 최적화)는 검색엔진이나 생성형 AI가 사용자의 질문에 직접적인 답변으로 이 콘텐츠를 선택하도록 만드는 활동입니다. 전통적인 SEO가 키워드 노출과 순위를 다룬다면, AEO는 콘텐츠가 실제 질문에 얼마나 명확하고 완결된 답을 제공하는지, 그리고 그 답이 얼마나 신뢰할 수 있는 근거를 갖췄는지를 평가합니다.",
  whyCards: [
    {
      title: "질문에 가장 먼저 답하는 콘텐츠가 선택됩니다",
      description:
        "검색엔진과 AI는 사용자의 질문에 대응하는 콘텐츠 중에서도 질문 바로 다음에 결론이 오고, 핵심 요소가 빠짐없이 담긴 답변을 우선적으로 채택합니다. 질문-답변 구조가 명확하지 않으면 좋은 정보도 답으로 선택되지 못합니다.",
    },
    {
      title: "신뢰할 수 있는 근거가 있어야 인용됩니다",
      description:
        "출처, 작성자 정보, 최신성이 뒷받침되지 않은 콘텐츠는 답변 엔진이 안심하고 인용하기 어렵습니다. 검색 의도와 콘텐츠 의도, 답변 의도가 일치하고 근거가 충분할 때 비로소 답변으로 노출될 가능성이 높아집니다.",
    },
  ],
  scoreNote:
    "AEO는 Overall Score(100점)의 30%를 차지하며, Question Coverage 8점 · Direct Answer 7점 · Content Structure 5점 · Intent Matching 4점 · Answer Evidence 3점 · Question Expansion 3점, 총 17개 항목(A01~A17)으로 진단합니다.",
};

export const aeoChecklist: AeoCategory[] = [
  {
    key: "question-coverage",
    label: "Question Coverage",
    range: "A01–A03",
    weight: 8,
    description:
      "입력 키워드에서 파생되는 핵심 질문과 관련 질문을 콘텐츠가 얼마나 폭넓게 다루고 있는지를 확인하는 영역입니다. 사용자가 실제로 궁금해할 질문의 유형과 후속 질문까지 커버해야 답변 엔진이 이 콘텐츠를 신뢰할 수 있는 답변 후보로 인식합니다.",
    rules: [
      {
        id: "A01",
        title: "Core Question",
        weight: 3,
        summary:
          "입력 키워드에서 도출한 핵심 질문(예: \"React 웹 접근성이란?\")에 대응하는 콘텐츠가 실제로 존재해야 AI가 이 페이지를 답변 후보로 고려합니다.",
        checks: [
          "핵심 질문(예: \"React 웹 접근성이란?\")에 대응하는 콘텐츠가 페이지 내에 존재하는가?",
        ],
      },
      {
        id: "A02",
        title: "Question Coverage",
        weight: 3,
        summary:
          "키워드의 검색 의도에 따라 정의형·방법형·비교형·문제해결형·구매행동형 질문 중 필요한 유형을 선택적으로 다뤄야 다양한 질문 방식에 대응할 수 있습니다.",
        checks: [
          "정의형 질문",
          "방법형 질문",
          "비교형 질문",
          "문제해결형 질문",
          "구매/행동형 질문",
        ],
      },
      {
        id: "A03",
        title: "Related Questions",
        weight: 2,
        summary:
          "관련 질문과 후속 질문까지 콘텐츠가 다루고 있으면, 하나의 주제를 깊이 있게 커버한다는 신호로 작용해 답변 엔진의 신뢰도를 높입니다.",
        checks: [
          "관련 질문 존재",
          "질문 간 topic 관계 존재",
          "후속 질문에 대한 콘텐츠 존재",
        ],
      },
    ],
  },
  {
    key: "direct-answer",
    label: "Direct Answer",
    range: "A04–A07",
    weight: 7,
    description:
      "질문에 대한 답변이 얼마나 명확하고, 질문 바로 다음에 위치하며, 완결된 형태로 제공되는지를 평가합니다. 결론을 먼저 제시하고 핵심 요소를 빠짐없이 담은 답변이라야 AI가 그대로 인용하기 좋습니다.",
    rules: [
      {
        id: "A04",
        title: "Definition Answer",
        weight: 2,
        summary:
          "핵심 질문에 대한 정의형 답변이 얼마나 명확한지를 0~1점 척도로 평가해, 애매한 설명과 명확한 정의를 구분합니다.",
        checks: [
          "0점 · 답변 없음",
          "0.5점 · 답변이 불명확함",
          "0.75점 · 부분 충족",
          "1점 · 명확한 정의형 답변 제공",
        ],
      },
      {
        id: "A05",
        title: "Answer Position",
        weight: 1,
        summary:
          "답변이 핵심 질문 바로 다음에 위치해야 사용자와 AI 모두 질문과 답을 즉시 연결지어 이해할 수 있습니다.",
        checks: ["핵심 질문 직후에 답변이 위치하는가?"],
      },
      {
        id: "A06",
        title: "Answer Clarity",
        weight: 2,
        summary:
          "결론이 먼저 나오고 불필요한 수식어 없이 한 문단에 하나의 의미만 담겨야 답변이 명확하게 전달됩니다.",
        checks: [
          "결론이 먼저 나오는가?",
          "불필요한 표현이 적은가?",
          "한 문단에 하나의 핵심 의미가 있는가?",
        ],
      },
      {
        id: "A07",
        title: "Answer Completeness",
        weight: 2,
        summary:
          "질문의 핵심 요소, 조건과 예외, 실제 방법과 예제까지 담겨 있어야 추가 검색 없이도 완결된 답으로 인정받습니다.",
        checks: [
          "질문의 핵심 요소 포함",
          "조건 / 예외 설명",
          "실제 방법 제공",
          "필요한 경우 예제 제공",
        ],
      },
    ],
  },
  {
    key: "content-structure",
    label: "Content Structure",
    range: "A08–A11",
    weight: 5,
    description:
      "콘텐츠가 질문 형태의 헤딩, 리스트·표, FAQ, 스캔하기 쉬운 구조로 짜여 있는지를 평가합니다. 구조가 명확할수록 AI가 질문과 답변 단위를 정확히 추출할 수 있습니다.",
    rules: [
      {
        id: "A08",
        title: "Heading as Questions",
        weight: 2,
        summary:
          "H2/H3 헤딩이 실제 사용자 질문 형태로 작성되어 있으면 AI가 헤딩 단위로 질문-답변 쌍을 쉽게 추출할 수 있습니다.",
        checks: [
          "주요 heading이 질문 형태(또는 질문에 대응하는 명확한 주제)로 작성되어 있는가?",
        ],
      },
      {
        id: "A09",
        title: "Lists / Tables",
        weight: 1,
        summary:
          "단계·비교·목록·표 형식은 정보를 구조화해 AI와 사용자 모두가 핵심 내용을 빠르게 파악하도록 돕습니다.",
        checks: ["단계형 정보", "비교 정보", "목록 정보", "표 정보"],
      },
      {
        id: "A10",
        title: "FAQ / Q&A Content",
        weight: 1,
        summary:
          "FAQ Schema 존재 여부만으로는 부족하며, 실제 사용자 질문에 유용하게 답하는 FAQ/Q&A 구조인지가 중요합니다(2026년부터 Google이 FAQ rich result를 더 이상 표시하지 않도록 변경했기 때문).",
        checks: [
          "FAQ 콘텐츠(또는 Q&A 전용 단락)가 존재하는가?",
          "FAQ가 실제 사용자 질문에 유용하게 답하는가? (Schema 존재 여부만으로 판단하지 않음)",
        ],
      },
      {
        id: "A11",
        title: "Scannability",
        weight: 1,
        summary:
          "짧은 문단, 명확한 헤딩, 리스트, 강조, 핵심 정보 우선 배치는 사람과 AI 모두가 콘텐츠를 빠르게 훑어 필요한 답을 찾도록 돕습니다.",
        checks: ["짧은 문단", "명확한 heading", "리스트", "강조", "핵심 정보 우선"],
      },
    ],
  },
  {
    key: "intent-matching",
    label: "Intent Matching",
    range: "A12–A13",
    weight: 4,
    description:
      "키워드의 검색 의도, 페이지의 의도, 실제 답변의 의도가 서로 일치하는지를 확인합니다. 6가지 검색 의도 유형을 분석하고 이 세 단계가 어긋나지 않아야 정확한 답변으로 평가받습니다.",
    rules: [
      {
        id: "A12",
        title: "Search Intent",
        weight: 2,
        summary:
          "Informational부터 Problem-solving까지 6가지 검색 의도 유형 중 어디에 해당하는지 정확히 분석해야 콘텐츠 방향을 올바르게 설계할 수 있습니다.",
        checks: [
          "Informational",
          "Navigational",
          "Commercial",
          "Transactional",
          "Local",
          "Problem-solving",
        ],
      },
      {
        id: "A13",
        title: "Content Intent Match",
        weight: 2,
        summary:
          "Keyword Intent → Page Intent → Answer Intent 세 단계가 서로 어긋나면 검색엔진이 이 페이지를 해당 질문의 답으로 매칭하지 않습니다.",
        checks: [
          "Keyword Intent, Page Intent, Answer Intent가 서로 일치하는가?",
        ],
      },
    ],
  },
  {
    key: "answer-evidence",
    label: "Answer Evidence",
    range: "A14–A16",
    weight: 3,
    description:
      "답변을 뒷받침하는 출처, 작성자 정보, 최신성을 평가합니다. 근거가 명확한 콘텐츠일수록 답변 엔진이 안심하고 인용할 수 있습니다.",
    rules: [
      {
        id: "A14",
        title: "Source",
        weight: 1,
        summary:
          "공식 출처와 외부 출처, 참고자료가 명시되어 있으면 답변의 신뢰도를 뒷받침하는 근거가 됩니다.",
        checks: ["공식 출처", "외부 출처", "참고자료"],
      },
      {
        id: "A15",
        title: "Author / Expertise",
        weight: 1,
        summary:
          "작성자와 그 전문성, 소속 조직 정보가 드러나야 콘텐츠의 권위와 신뢰도를 검색엔진과 AI가 판단할 수 있습니다.",
        checks: ["작성자", "작성자 전문성", "조직 정보"],
      },
      {
        id: "A16",
        title: "Freshness",
        weight: 1,
        summary:
          "작성일과 수정일, 최신 정보 반영 여부는 답변이 지금도 유효한지를 판단하는 핵심 신호입니다.",
        checks: ["작성일", "수정일", "최신 정보"],
      },
    ],
  },
  {
    key: "question-expansion",
    label: "Question Expansion",
    range: "A17",
    weight: 3,
    description:
      "핵심 질문에서 파생되는 연관 질문과 키워드까지 콘텐츠가 폭넓게 다루고 있는지를 확인합니다. 하나의 주제를 다각도로 커버할수록 다양한 질문에 대한 답변 후보가 될 수 있습니다.",
    rules: [
      {
        id: "A17",
        title: "Related Query Coverage",
        weight: 3,
        summary:
          "LLM이나 검색 쿼리 분석으로 도출한 연관 질문·키워드까지 폭넓게 다루고 있어야 다양한 형태의 질문에서도 답변 후보로 노출될 수 있습니다.",
        checks: [
          "LLM 또는 검색 query 분석으로 파생된 연관 질문/키워드를 사이트 콘텐츠가 충분히 다루고 있는가?",
        ],
      },
    ],
  },
];
