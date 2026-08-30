# GEO 체크리스트 (Generative Engine Optimization Checklist)

**문서 버전:** v1.0
**작성일:** 2026-08-26
**상태:** 참고용 체크리스트 (원본: [SEO · AEO · GEO 통합 진단 플랫폼 — Score Algorithm & Diagnostic Checklist v1.0.md](<./SEO · AEO · GEO 통합 진단 플랫폼 — Score Algorithm & Diagnostic Checklist v1.0.md>) §18~24 발췌·재정리)
**관련 문서:**
- [SEO · AEO · GEO 통합 진단 리포트 플랫폼 기능 명세서 v1.0.md](<./SEO · AEO · GEO 통합 진단 리포트 플랫폼 기능 명세서 v1.0.md>) (FND-050, G01~G22 Core Rule 정의)
- [SEO · AEO · GEO 통합 진단 리포트 플랫폼 요구사항 정의서 v1.0.md](<./SEO · AEO · GEO 통합 진단 리포트 플랫폼 요구사항 정의서 v1.0.md>) (FR-014~FR-016)
- [SEO 체크리스트.md](<./SEO 체크리스트.md>) · [AEO 체크리스트.md](<./AEO 체크리스트.md>)

---

## 개요

GEO 영역은 전체 Overall Score(100점)의 **30%**를 차지하며, 22개 Core Rule(G01~G22)로 구성된다. 생성형 AI(RAG, grounding)가 콘텐츠를 인용(citation)하기 쉬운 구조인지를 평가한다. 단, **GEO Score ≠ AI Citation Score** — 실측 Citation 데이터가 없다고 해서 0점 처리하지 않고, Rule-based + AI-estimate 기반으로 평가하며 데이터 미연결 시 N/A로 별도 표시한다.

```text
Entity Clarity           7점  (G01~G04)
Evidence / Provenance    7점  (G05~G08)
Citation Readiness       6점  (G09~G13)
Topical Coverage         5점  (G14~G17)
Freshness / Consistency  3점  (G18~G20)
AI Visibility            2점  (G21~G22)
--------------------------------------
GEO Total                30점
```

각 항목은 코드/구현체(`src/mocks/fixtures/rules.ts`의 `GEO_RULES`)로도 이식되어 있으며, 이 문서는 SEO 마케터·FE 개발자가 수동으로 대조 점검할 때 쓰는 체크리스트 형태로 정리한 것이다.

---

## 1. Entity Clarity (7점)

### G01 Primary Entity — Weight 2
- [ ] 사이트가 무엇에 관한 것인지(Company / Product / Service / Person / Organization) 명확한가?

### G02 Entity Schema — Weight 2
페이지 유형에 맞는 Schema를 사용하는지 평가한다.

- [ ] Organization
- [ ] Person
- [ ] Product
- [ ] Service
- [ ] Article
- [ ] WebPage

### G03 Entity Relationship — Weight 2
```text
Company
  └── Product
        └── Article
              └── Author
```

- [ ] 위와 같이 Entity 간 상하/연관 관계가 명확하게 정의되어 있는가?

### G04 Identity Consistency — Weight 1
- [ ] 회사명 일관성
- [ ] 제품명 일관성
- [ ] URL 일관성
- [ ] sameAs

**Entity Clarity 소계: 7점**

---

## 2. Evidence / Provenance (7점)

### G05 Claim Evidence — Weight 2
```text
Claim → Evidence → Source
```

- [ ] 중요한 주장(Claim)마다 근거(Evidence)와 출처(Source)로 이어지는 구조가 있는가?

### G06 Source Quality — Weight 2
출처의 품질을 아래 우선순위 기준으로 평가한다.

1. 공식 문서
2. 정부 / 공공기관
3. 학술 / 연구
4. 전문기관
5. 신뢰 가능한 미디어
6. 일반 웹사이트

- [ ] 인용된 출처가 위 우선순위 상위권(공식 문서·정부/공공기관·학술 자료 등)에 해당하는가?

### G07 Attribution — Weight 1
- [ ] 출처 표시
- [ ] 링크
- [ ] 참고자료
- [ ] 데이터 출처

### G08 Claim / Source Relationship — Weight 2
- [ ] 주장(Claim)과 출처(Source)가 실제로 1:1로 연결되는가?

**Evidence / Provenance 소계: 7점**

---

## 3. Citation Readiness (6점)

### G09 Extractable Answer — Weight 2
- [ ] AI가 한 문장 또는 짧은 문단 단위로 그대로 가져가기 쉬운 정보 블록인가?

### G10 Clear Claims — Weight 1
```text
나쁜 예:
React는 매우 좋은 기술입니다.

좋은 예:
React는 컴포넌트 기반 UI 라이브러리로,
UI를 재사용 가능한 컴포넌트 단위로 구성할 수 있습니다.
```

- [ ] 단정적이고 구체적인 명제 문장으로 구성되어 있는가? (모호한 주관적 표현이 아닌가?)

### G11 Context Completeness — Weight 1
- [ ] 문장만 따로 떼어 인용해도 의미가 유지되는가?

### G12 Structured Information — Weight 1
- [ ] List
- [ ] Table
- [ ] Definition
- [ ] Steps
- [ ] FAQ

### G13 Attribution-ready Content — Weight 1
- [ ] 작성자
- [ ] 출처
- [ ] 날짜
- [ ] 참고자료

**Citation Readiness 소계: 6점**

---

## 4. Topical Coverage (5점)

### G14 Topic Depth — Weight 2
- [ ] 핵심 keyword를 중심으로 콘텐츠가 충분히 깊이 있게 다뤄지는가?

### G15 Related Entity Coverage — Weight 1
- [ ] 관련 Entity(예: React → Virtual DOM, JSX 등)가 충분히 설명되는가?

### G16 Topic Relationship — Weight 1
- [ ] 관련 페이지가 내부 링크로 연결되어 있는가?

### G17 Content Gap — Weight 1
- [ ] 경쟁 콘텐츠 또는 예상 질문 대비 부족한 핵심 하위 주제가 없는가?

**Topical Coverage 소계: 5점**

---

## 5. Freshness / Consistency (3점)

### G18 Freshness — Weight 1
- [ ] 최신 업데이트가 반영되어 있는가?
- [ ] outdated information이 없는가?

### G19 Cross-channel Consistency — Weight 1
아래 채널 간 핵심 Entity 정보가 일치하는지 평가한다.

- [ ] Website
- [ ] Google
- [ ] Bing
- [ ] Social
- [ ] Knowledge sources

### G20 Contradiction — Weight 1
- [ ] 서로 다른 페이지에서 상충되는 정보가 없는가?

**Freshness / Consistency 소계: 3점**

---

## 6. AI Visibility (2점)

### G21 Citation Data — Weight 1
실제 AI citation 데이터가 있는 경우 사용한다.

- [ ] Citation count
- [ ] Cited pages
- [ ] Citation trend

### G22 Grounding / Query Data — Weight 1
실제 grounding query 데이터가 있는 경우 사용한다. MVP에서는 데이터가 없으면 **N/A**로 처리한다.

```text
실측 데이터 없음
      ↓
GEO Score를 억지로 0점 처리하지 않음
      ↓
Rule-based + AI-estimate 기반 평가
      ↓
"AI Visibility Data Unavailable" 표시
```

- [ ] Grounding query 데이터가 있다면 반영했는가? (없다면 0점이 아닌 N/A로 표시했는가?)

**AI Visibility 소계: 2점**

---

## 요약표

| 구분 | Rule ID | 항목명 | Weight |
| :--- | :---: | :--- | :---: |
| Entity Clarity | G01 | Primary Entity | 2 |
| Entity Clarity | G02 | Entity Schema | 2 |
| Entity Clarity | G03 | Entity Relationship | 2 |
| Entity Clarity | G04 | Identity Consistency | 1 |
| Evidence / Provenance | G05 | Claim Evidence | 2 |
| Evidence / Provenance | G06 | Source Quality | 2 |
| Evidence / Provenance | G07 | Attribution | 1 |
| Evidence / Provenance | G08 | Claim / Source Relationship | 2 |
| Citation Readiness | G09 | Extractable Answer | 2 |
| Citation Readiness | G10 | Clear Claims | 1 |
| Citation Readiness | G11 | Context Completeness | 1 |
| Citation Readiness | G12 | Structured Information | 1 |
| Citation Readiness | G13 | Attribution-ready Content | 1 |
| Topical Coverage | G14 | Topic Depth | 2 |
| Topical Coverage | G15 | Related Entity Coverage | 1 |
| Topical Coverage | G16 | Topic Relationship | 1 |
| Topical Coverage | G17 | Content Gap | 1 |
| Freshness / Consistency | G18 | Freshness | 1 |
| Freshness / Consistency | G19 | Cross-channel Consistency | 1 |
| Freshness / Consistency | G20 | Contradiction | 1 |
| AI Visibility | G21 | Citation Data | 1 |
| AI Visibility | G22 | Grounding / Query Data | 1 |
| | | **합계** | **30** |
