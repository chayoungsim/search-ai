# SEO 체크리스트 (SEO Checklist)


## 개요

SEO 영역은 전체 Overall Score(100점)의 **40%**를 차지하며, 19개 Core Rule(S01~S19)로 구성된다.

```text
Technical SEO       20점  (S01~S08)
On-page / Content    15점  (S09~S15)   *
Structured Data       5점  (S16~S19)
--------------------------------------
SEO Total            40점               *
```

\* 원본 Score Algorithm 문서에 표기된 배점이며, 하단 [요약표](#요약표)의 실제 Weight 합산값과는 1점 차이가 있습니다(원본 문서의 표기 오차로 판단됨).

각 항목은 코드/구현체(`src/mocks/fixtures/rules.ts`의 `SEO_RULES`)로도 이식되어 있으며, 이 문서는 개발자·퍼블리셔·콘텐츠 담당자가 수동으로 대조 점검할 때 쓰는 체크리스트 형태로 정리한 것이다.

---

## 1. Technical SEO (20점)

### S01 HTTPS — Weight 2
- [ ] HTTPS 적용
- [ ] HTTP → HTTPS redirect
- [ ] Mixed Content 없음

### S02 Crawlability — Weight 3
- [ ] robots.txt 존재
- [ ] 중요한 페이지 차단 없음
- [ ] Googlebot / Bingbot 접근 가능
- [ ] 불필요한 페이지 크롤링 제어

### S03 Indexability — Weight 3
- [ ] noindex 여부 확인
- [ ] X-Robots-Tag 확인
- [ ] canonical 확인
- [ ] indexable 상태

### S04 Sitemap — Weight 2
- [ ] sitemap.xml 존재
- [ ] 정상 XML
- [ ] canonical URL 포함
- [ ] broken URL 없음
- [ ] lastmod 정보 적절

### S05 URL / Redirect — Weight 2
- [ ] HTTP 200
- [ ] redirect chain 없음
- [ ] 404 없음
- [ ] soft 404 없음
- [ ] canonical과 실제 URL 일치

### S06 Mobile — Weight 2
- [ ] viewport 설정
- [ ] responsive layout
- [ ] mobile content parity
- [ ] horizontal overflow 없음

### S07 Performance — Weight 3
- [ ] LCP
- [ ] INP
- [ ] CLS
- [ ] 이미지 최적화
- [ ] JS / CSS 과도한 blocking 없음

### S08 Internal Architecture — Weight 3
- [ ] 내부 링크 존재
- [ ] orphan page 없음
- [ ] 주요 페이지 depth 과도하지 않음
- [ ] anchor text 명확
- [ ] 중요 페이지로 link equity 전달

**Technical SEO 소계: 20점**

---

## 2. On-page / Content (15점)

### S09 Title — Weight 2
- [ ] title 존재
- [ ] 페이지별 고유 title
- [ ] 핵심 주제 반영
- [ ] 과도한 keyword stuffing 없음

### S10 Meta Description — Weight 1
- [ ] 존재
- [ ] 페이지별 고유
- [ ] 페이지 내용과 일치
- [ ] 사용자 의도를 반영

### S11 Heading — Weight 2
- [ ] H1 존재
- [ ] H1 중복 없음
- [ ] H2/H3 계층 구조 준수
- [ ] heading이 실제 콘텐츠 구조를 설명

### S12 Semantic HTML — Weight 2
- [ ] header
- [ ] nav
- [ ] main
- [ ] section
- [ ] article
- [ ] footer
- [ ] button / link 적절한 사용

### S13 Content Relevance — Weight 3
- [ ] 입력 keyword와 콘텐츠 주제 일치
- [ ] 검색 의도와 콘텐츠 일치
- [ ] 핵심 질문에 대한 내용 존재
- [ ] 불필요한 keyword 반복 없음

### S14 Content Quality — Weight 3
- [ ] 독창적인 정보
- [ ] 구체적인 설명
- [ ] 실제 경험 / 사례
- [ ] 최신 정보
- [ ] 사용자에게 실질적인 가치

### S15 Image / Media — Weight 1
- [ ] 의미 있는 이미지 alt
- [ ] 장식 이미지 처리
- [ ] 이미지 파일 최적화
- [ ] 영상 / 미디어 설명 제공

**On-page / Content 소계: 14점** *(원본 문서에는 15점으로 표기되어 있으나, S09~S15 개별 Weight 합산 값은 14점입니다 — 원본의 표기 오차로 보이며 아래 요약표는 실제 합산값 기준입니다.)*

---

## 3. Structured Data (5점)

### S16 Schema Presence — Weight 1
- [ ] JSON-LD 존재
- [ ] 페이지 유형에 적절한 Schema 사용

### S17 Schema Validity — Weight 2
- [ ] JSON-LD syntax 정상
- [ ] @context 정상
- [ ] @type 정상
- [ ] property 오류 없음

### S18 Entity Completeness — Weight 1
- [ ] Organization / Person / Product 등 entity 정의
- [ ] name
- [ ] url
- [ ] identifier
- [ ] sameAs

### S19 Schema Consistency — Weight 1
- [ ] 페이지 내용과 Schema 일치
- [ ] visible content와 구조화 데이터 일치
- [ ] 중복 entity 없음

**Structured Data 소계: 5점**

---

## 요약표

| 구분 | Rule ID | 항목명 | Weight |
| :--- | :---: | :--- | :---: |
| Technical | S01 | HTTPS | 2 |
| Technical | S02 | Crawlability | 3 |
| Technical | S03 | Indexability | 3 |
| Technical | S04 | Sitemap | 2 |
| Technical | S05 | URL / Redirect | 2 |
| Technical | S06 | Mobile | 2 |
| Technical | S07 | Performance | 3 |
| Technical | S08 | Internal Architecture | 3 |
| On-page | S09 | Title | 2 |
| On-page | S10 | Meta Description | 1 |
| On-page | S11 | Heading | 2 |
| On-page | S12 | Semantic HTML | 2 |
| On-page | S13 | Content Relevance | 3 |
| On-page | S14 | Content Quality | 3 |
| On-page | S15 | Image / Media | 1 |
| Structured Data | S16 | Schema Presence | 1 |
| Structured Data | S17 | Schema Validity | 2 |
| Structured Data | S18 | Entity Completeness | 1 |
| Structured Data | S19 | Schema Consistency | 1 |
| | | **합계** | **39*** |

\* 원본 Score Algorithm 문서는 SEO Total을 40점으로 표기하지만(Technical 20 + On-page 15 + Structured Data 5), S09~S15 개별 Weight를 합산하면 On-page 소계는 14점이 되어 전체 합계는 39점입니다. 원본 문서의 표기 오차로 판단되며, 개별 Rule의 Weight는 원본 값을 그대로 유지했습니다.
