# AEO 체크리스트 (Answer Engine Optimization Checklist)


## 개요

AEO 영역은 전체 Overall Score(100점)의 **30%**를 차지하며, 17개 Core Rule(A01~A17)로 구성된다. AI/검색이 질문에 직접 답할 때 근거로 삼기 쉬운 콘텐츠 구조인지를 평가한다.

```text
Question Coverage       8점  (A01~A03)
Direct Answer           7점  (A04~A07)
Content Structure       5점  (A08~A11)
Intent Matching         4점  (A12~A13)
Answer Evidence         3점  (A14~A16)
Question Expansion      3점  (A17)
--------------------------------------
AEO Total              30점
```

각 항목은 코드/구현체(`src/mocks/fixtures/rules.ts`의 `AEO_RULES`)로도 이식되어 있으며, 이 문서는 콘텐츠 담당자·SEO 마케터가 수동으로 대조 점검할 때 쓰는 체크리스트 형태로 정리한 것이다.

---

## 1. Question Coverage (8점)

### A01 Core Question — Weight 3
입력 keyword에서 핵심 질문을 생성하고, 그 질문에 대응하는 콘텐츠가 존재하는지 평가한다.

```text
React 웹 접근성
  ↓
React 웹 접근성이란?
React에서 웹 접근성을 구현하는 방법은?
React aria-label은 어떻게 사용하는가?
```

- [ ] 위와 같이 파생된 핵심 질문에 대응하는 콘텐츠가 페이지 내에 존재하는가?

### A02 Question Coverage — Weight 3
질문 유형은 keyword의 search intent에 따라 선택적으로 적용한다.

- [ ] 정의형 질문
- [ ] 방법형 질문
- [ ] 비교형 질문
- [ ] 문제해결형 질문
- [ ] 구매/행동형 질문

### A03 Related Questions — Weight 2
- [ ] 관련 질문 존재
- [ ] 질문 간 topic 관계 존재
- [ ] 후속 질문에 대한 콘텐츠 존재

**Question Coverage 소계: 8점**

---

## 2. Direct Answer (7점)

### A04 Definition Answer — Weight 2
핵심 질문(예: "React 웹 접근성이란?")에 대한 정의형 답변이 명확한지 아래 척도로 평가한다.

```text
질문: React 웹 접근성이란?

좋은 예:
React 웹 접근성은 React 애플리케이션을 장애가 있는
사용자도 사용할 수 있도록 접근성 원칙에 따라
구현하는 것을 의미합니다.
```

| 점수 | 기준 |
| :---: | :--- |
| 0 | 없음 |
| 0.5 | 불명확 |
| 0.75 | 부분 충족 |
| 1 | 명확 |

### A05 Answer Position — Weight 1
- [ ] 핵심 질문 직후에 답변이 위치하는가?

### A06 Answer Clarity — Weight 2
- [ ] 결론이 먼저 나오는가?
- [ ] 불필요한 표현이 적은가?
- [ ] 한 문단에 하나의 핵심 의미가 있는가?

### A07 Answer Completeness — Weight 2
- [ ] 질문의 핵심 요소 포함
- [ ] 조건 / 예외 설명
- [ ] 실제 방법 제공
- [ ] 필요한 경우 예제 제공

**Direct Answer 소계: 7점**

---

## 3. Content Structure (5점)

### A08 Heading as Questions — Weight 2
H2/H3 heading이 실제 사용자 질문 형태로 작성되었는지 평가한다.

```html
<h2>React 웹 접근성이란?</h2>
```

- [ ] 주요 heading이 질문 형태(또는 질문에 대응하는 명확한 주제)로 작성되어 있는가?

### A09 Lists / Tables — Weight 1
- [ ] 단계형 정보
- [ ] 비교 정보
- [ ] 목록 정보
- [ ] 표 정보

### A10 FAQ / Q&A Content — Weight 1
FAQ 콘텐츠가 존재하는지 평가한다. 단, FAQ Schema가 있다는 이유만으로 높은 점수를 주지 않는다. Google이 2026년 FAQ rich result를 Search에서 더 이상 표시하지 않도록 변경했기 때문에, **FAQ의 구조와 실제 사용자 질문에 대한 유용성**을 평가한다.

- [ ] FAQ 콘텐츠(또는 Q&A 전용 단락)가 존재하는가?
- [ ] FAQ가 실제 사용자 질문에 유용하게 답하는가? (Schema 존재 여부만으로 판단하지 않음)

### A11 Scannability — Weight 1
- [ ] 짧은 문단
- [ ] 명확한 heading
- [ ] 리스트
- [ ] 강조
- [ ] 핵심 정보 우선

**Content Structure 소계: 5점**

---

## 4. Intent Matching (4점)

### A12 Search Intent — Weight 2
다음 6가지 Search Intent 유형을 분석한다.

- [ ] Informational
- [ ] Navigational
- [ ] Commercial
- [ ] Transactional
- [ ] Local
- [ ] Problem-solving

### A13 Content Intent Match — Weight 2
```text
Keyword Intent
      ↓
  Page Intent
      ↓
 Answer Intent
```

- [ ] 위 세 가지(Keyword Intent → Page Intent → Answer Intent)가 서로 일치하는가?

**Intent Matching 소계: 4점**

---

## 5. Answer Evidence (3점)

### A14 Source — Weight 1
- [ ] 공식 출처
- [ ] 외부 출처
- [ ] 참고자료

### A15 Author / Expertise — Weight 1
- [ ] 작성자
- [ ] 작성자 전문성
- [ ] 조직 정보

### A16 Freshness — Weight 1
- [ ] 작성일
- [ ] 수정일
- [ ] 최신 정보

**Answer Evidence 소계: 3점**

---

## 6. Question Expansion (3점)

### A17 Related Query Coverage — Weight 3
LLM 또는 검색 query 분석으로 연관 질문을 생성하고, 사이트가 이를 얼마나 포괄하는지 평가한다.

```text
React 접근성
  ↓
React accessibility
React aria
React keyboard navigation
React screen reader
React WCAG
```

- [ ] 위와 같이 파생된 연관 질문/키워드를 사이트 콘텐츠가 충분히 다루고 있는가?

**Question Expansion 소계: 3점**

---

## 요약표

| 구분 | Rule ID | 항목명 | Weight |
| :--- | :---: | :--- | :---: |
| Question Coverage | A01 | Core Question | 3 |
| Question Coverage | A02 | Question Coverage | 3 |
| Question Coverage | A03 | Related Questions | 2 |
| Direct Answer | A04 | Definition Answer | 2 |
| Direct Answer | A05 | Answer Position | 1 |
| Direct Answer | A06 | Answer Clarity | 2 |
| Direct Answer | A07 | Answer Completeness | 2 |
| Content Structure | A08 | Heading as Questions | 2 |
| Content Structure | A09 | Lists / Tables | 1 |
| Content Structure | A10 | FAQ / Q&A Content | 1 |
| Content Structure | A11 | Scannability | 1 |
| Intent Matching | A12 | Search Intent | 2 |
| Intent Matching | A13 | Content Intent Match | 2 |
| Answer Evidence | A14 | Source | 1 |
| Answer Evidence | A15 | Author / Expertise | 1 |
| Answer Evidence | A16 | Freshness | 1 |
| Question Expansion | A17 | Related Query Coverage | 3 |
| | | **합계** | **30** |
