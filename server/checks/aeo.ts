import type { CheckContext, CheckFn } from "../types"
import {
  collectSchemaObjects,
  detectAttribution,
  detectFreshness,
  findSchemaOfType,
  looksLikeQuestion,
  pass,
  schemaTypes,
  warn,
} from "./util"

const aeoChecks: Record<string, CheckFn> = {
  // A08 Heading as Questions
  A08: (ctx: CheckContext) => {
    const subs = ctx.page.headings.filter((h) => h.level === 2 || h.level === 3)
    if (subs.length === 0) {
      return warn(
        ["H2/H3 헤딩이 없습니다."],
        "사용자 질문 형태의 H2/H3 로 콘텐츠를 나누세요.",
      )
    }
    const q = subs.filter((h) => looksLikeQuestion(h.text))
    const ratio = q.length / subs.length
    if (ratio >= 0.3) {
      return pass([
        `H2/H3 ${subs.length}개 중 ${q.length}개가 질문형입니다.`,
      ])
    }
    return warn(
      [
        `H2/H3 ${subs.length}개 중 질문형은 ${q.length}개뿐입니다.`,
        "현재 헤딩 예: " +
          subs
            .slice(0, 3)
            .map((h) => `"${h.text.slice(0, 24)}"`)
            .join(", "),
      ],
      "핵심 소제목을 \"무엇을~?\", \"어떻게~?\" 같은 질문형으로 바꾸면 AI가 Q&A 를 추출하기 쉽습니다.",
    )
  },

  // A09 Lists / Tables
  A09: (ctx: CheckContext) => {
    const ul = ctx.page.root.querySelectorAll("ul li").length
    const ol = ctx.page.root.querySelectorAll("ol li").length
    const tables = ctx.page.root.querySelectorAll("table").length
    if (ul + ol >= 3 || tables >= 1) {
      return pass([
        `리스트 항목 ${ul + ol}개, 표 ${tables}개로 정보가 구조화돼 있습니다.`,
      ])
    }
    return warn(
      [`리스트 항목 ${ul + ol}개, 표 ${tables}개. 구조화가 부족합니다.`],
      "단계·비교·목록형 정보는 문장 대신 ul/ol/table 로 정리하세요.",
    )
  },

  // A10 FAQ / Q&A Content
  A10: (ctx: CheckContext) => {
    const hasFaqSchema = schemaTypes(collectSchemaObjects(ctx)).some((t) =>
      /faqpage|qapage/i.test(t),
    )
    const faqHeading = ctx.page.headings.some((h) =>
      /faq|자주\s*묻는|자주하는\s*질문|q&a|질문과\s*답/i.test(h.text),
    )
    const details = ctx.page.root.querySelectorAll("details").length
    const questionHeadings = ctx.page.headings.filter(
      (h) => h.level >= 2 && looksLikeQuestion(h.text),
    ).length

    if (hasFaqSchema && (faqHeading || questionHeadings >= 2 || details >= 2)) {
      return pass(["FAQPage 스키마와 실제 Q&A 콘텐츠가 함께 있습니다."])
    }
    if (faqHeading || details >= 2 || questionHeadings >= 3) {
      return warn(
        ["Q&A 형태 콘텐츠는 있으나 FAQPage 스키마가 없습니다."],
        "질문/답변 블록에 FAQPage JSON-LD 를 추가하세요.",
      )
    }
    return warn(
      ["FAQ/Q&A 구조를 찾지 못했습니다."],
      "자주 묻는 질문을 소제목으로, 답변을 두괄식으로 정리한 FAQ 섹션을 추가하세요.",
    )
  },

  // A11 Scannability
  A11: (ctx: CheckContext) => {
    const paras = ctx.page.paragraphs
    if (paras.length === 0) {
      return warn(["본문 문단(<p>)을 찾지 못했습니다."])
    }
    const longParas = paras.filter((p) => p.split(/\s+/).length > 120).length
    const lists = ctx.page.root.querySelectorAll("ul, ol").length
    const subs = ctx.page.headings.filter((h) => h.level >= 2).length
    const ev = [
      `문단 ${paras.length}개(그중 매우 긴 문단 ${longParas}개), 소제목 ${subs}개, 리스트 ${lists}개`,
    ]
    if (longParas / paras.length > 0.35 || subs < 2) {
      return warn(
        ev,
        "긴 문단을 3~4문장으로 쪼개고, 소제목과 리스트로 훑어 읽기 쉽게 만드세요.",
      )
    }
    return pass(ev)
  },

  // A15 Author / Expertise
  A15: (ctx: CheckContext) => {
    const metaAuthor = ctx.page.metas["author"]?.trim()
    const relAuthor = ctx.page.links.some((l) => (l.rel ?? "").includes("author"))
    const article = findSchemaOfType(
      collectSchemaObjects(ctx),
      "Article",
      "NewsArticle",
      "BlogPosting",
    )
    const schemaAuthor = article && "author" in article
    const byline = ctx.page.root.querySelector(
      '[class*="author" i], [class*="byline" i], [rel="author"]',
    )
    if (metaAuthor || relAuthor || schemaAuthor || byline) {
      const src = metaAuthor
        ? `meta author: "${metaAuthor}"`
        : schemaAuthor
          ? "Article 스키마 author"
          : "작성자 표기 요소"
      return pass([`작성자 정보 발견 (${src})`])
    }
    return warn(
      ["작성자·전문성 정보를 찾지 못했습니다."],
      "작성자 이름·소속을 본문과 스키마(author)에 함께 표기하세요.",
    )
  },

  // A14 Source & Evidence
  A14: (ctx: CheckContext) => {
    const a = detectAttribution(ctx)
    if (a.externalCount >= 2 && a.citeWords) {
      return pass([
        `참고 출처 링크 ${a.externalCount}개(${a.sampleHosts.join(", ")})와 출처 표현이 있습니다.`,
      ])
    }
    if (a.externalCount >= 1 || a.citeWords) {
      return warn(
        [
          `외부 참고 링크 ${a.externalCount}개, "출처/참고" 표현 ${a.citeWords ? "있음" : "없음"}.`,
        ],
        "답변의 근거가 되는 공식 출처·참고자료를 링크로 함께 제시하면 답변 엔진이 더 신뢰합니다.",
      )
    }
    return warn(
      ["답변을 뒷받침하는 출처·참고자료를 찾지 못했습니다."],
      "핵심 주장에 공식 문서·통계·연구 링크를 붙이고 \"출처:\" 표기를 추가하세요.",
    )
  },

  // A16 Freshness Indicator
  A16: (ctx: CheckContext) => {
    const f = detectFreshness(ctx)
    if (f.found) {
      return pass(["최신성 정보 발견: " + f.labels.join(", ")])
    }
    return warn(
      ["게시일·수정일 정보를 찾지 못했습니다."],
      "article:published_time / dateModified 메타와 스키마 날짜를 추가하세요.",
    )
  },
}

export default aeoChecks
