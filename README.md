# SEARCH+AI

검색 최적화 컨설팅(SEO · AEO · GEO)을 소개하는 B2B 마케팅 웹사이트입니다.
검색엔진 시대에서 생성형 AI 시대로 넘어가는 흐름에 맞춰, 세 가지 최적화 전략을
설명하고 무료 진단 · 상담 신청으로 이어지도록 구성했습니다.

- **SEO** (Search Engine Optimization) — 검색엔진에서 발견되는 콘텐츠
- **AEO** (Answer Engine Optimization) — 질문에 대한 답변이 되는 콘텐츠
- **GEO** (Generative Engine Optimization) — AI가 이해하고 인용하는 콘텐츠

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 프레임워크 | React 19, TypeScript 6 |
| 빌드 도구 | Vite 8 |
| 라우팅 | react-router 7 |
| 스타일 | Sass (SCSS), 7-1 아키텍처 |
| 아이콘 | lucide-react |
| 린트 | ESLint 10, typescript-eslint |

경로 별칭 `@` → `src` (Vite `resolve.alias` + `tsconfig` `paths`).

## 프로젝트 구조

```
src/
├─ App.tsx              # 라우트 정의
├─ main.tsx             # 진입점
├─ pages/               # 라우트별 페이지 (섹션 컴포넌트 조합)
│  ├─ Overview.tsx      # /          메인 소개
│  ├─ SEO.tsx           # /seo
│  ├─ AEO.tsx           # /aeo
│  ├─ GEO.tsx           # /geo
│  ├─ Strategy.tsx      # /strategy  단계별 실행 전략
│  ├─ Audit.tsx         # /audit     무료 진단 (작업 예정)
│  └─ Contact.tsx       # /contact   상담 신청 폼
├─ components/
│  ├─ common/           # Layout, Header, Footer, Container
│  ├─ overview/         # Hero, Intro, Comparison, Detail, Strategy, Checklist, Cta
│  ├─ seo/ aeo/ geo/    # Intro, Diagnostics, Guide (영역별 동일 구조)
│  ├─ strategy/         # StageOverview, StageDetail, DualTrack, Tips, Cta
│  └─ contact/          # Intro, ContactForm
├─ data/                # 화면 텍스트·체크리스트 데이터 분리
│  ├─ content.ts        # Overview 공용 카피
│  ├─ seo.ts aeo.ts geo.ts   # 영역별 진단 항목·가이드
│  └─ strategy.ts       # 단계·이중 트랙 데이터
└─ styles/              # abstracts / foundation / base / utilities / pages 레이어
docs/                   # SEO·AEO·GEO 체크리스트 원본, B2B 컨설팅 5단계 프로세스
public/                 # 정적 체크리스트 HTML 3종, 아이콘
```

## 작업 내용

### 완료
- **공통 레이아웃** — 본문 바로가기 링크, 반응형 헤더(모바일 메뉴 토글 · backdrop),
  `aria-*` 속성과 시맨틱 마크업 적용
- **Overview 페이지** — Hero, 개념 소개, SEO/AEO/GEO 비교 카드, 영역별 상세,
  실행 흐름, 체크리스트, CTA 섹션
- **SEO / AEO / GEO 페이지** — 영역 소개(Intro) · 진단 항목(Diagnostics) ·
  실행 가이드(Guide)를 동일한 3단 구조로 구성, 데이터는 `src/data`로 분리
- **Strategy 페이지** — 단계별 개요·상세, 개발팀/마케팅팀 이중 트랙 워크플로우
  테이블, 실무 팁, CTA
- **Contact 폼** — 필수/선택 필드 검증, 다중 파일 첨부·삭제·용량 표시,
  제출 완료 상태 화면 (클라이언트 상태만 처리)
- **스타일 시스템** — SCSS 레이어 구조, 색상·타이포·간격·모션 토큰, 반응형 믹스인,
  접근성 유틸리티

### 예정
- **Audit 페이지** — 현재 플레이스홀더, 무료 진단 UI 구현 필요
- **Contact 폼 전송** — 실제 백엔드/메일 연동 (현재 제출 시 화면 전환만 수행)

## 실행 방법

```bash
npm install
npm run dev       # 개발 서버
npm run build     # tsc -b && vite build
npm run preview   # 빌드 결과 미리보기
npm run lint      # ESLint
```
