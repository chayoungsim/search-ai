import type { CheckContext, CheckFn } from "../types"
import {
  collectSchemaObjects,
  detectAttribution,
  detectFreshness,
  findSchemaOfType,
  isExternalLink,
  pass,
  schemaTypes,
  stringField,
  warn,
} from "./util"

const ENTITY_TYPES = /^(organization|corporation|localbusiness|person|product|service|article|newsarticle|blogposting|webpage|website)$/i

const geoChecks: Record<string, CheckFn> = {
  // G01 Primary Entity
  G01: (ctx: CheckContext) => {
    const objs = collectSchemaObjects(ctx)
    const org = findSchemaOfType(objs, "Organization", "WebSite", "LocalBusiness", "Person")
    const orgName = org ? stringField(org, "name") : null
    const siteName = ctx.page.metas["og:site_name"]?.trim()

    if (orgName || siteName) {
      return pass([
        `주체(엔티티) 식별 가능: ${orgName ?? siteName}` +
          (orgName ? " (스키마)" : " (og:site_name)"),
      ])
    }
    return warn(
      ["사이트의 핵심 주체(회사/서비스/인물)를 식별할 신호가 없습니다."],
      "Organization 또는 WebSite 스키마의 name 과 og:site_name 을 명시하세요.",
    )
  },

  // G02 Entity Schema
  G02: (ctx: CheckContext) => {
    const types = schemaTypes(collectSchemaObjects(ctx))
    if (types.length === 0) {
      return warn(
        ["엔티티 스키마 타입이 없습니다."],
        "페이지 성격에 맞는 Organization/Product/Service/Article/WebPage 스키마를 넣으세요.",
      )
    }
    const entityTypes = types.filter((t) => ENTITY_TYPES.test(t))
    if (entityTypes.length > 0) {
      return pass([`엔티티 스키마 타입: ${[...new Set(entityTypes)].join(", ")}`])
    }
    return warn(
      [`스키마 타입이 있으나 엔티티 유형이 아닙니다: ${[...new Set(types)].join(", ")}`],
      "핵심 주체를 나타내는 스키마 타입을 추가하세요.",
    )
  },

  // G04 Identity Consistency
  G04: (ctx: CheckContext) => {
    const names = new Set<string>()
    const org = findSchemaOfType(collectSchemaObjects(ctx), "Organization", "WebSite")
    const schemaName = org ? stringField(org, "name") : null
    const ogName = ctx.page.metas["og:site_name"]?.trim()
    const titleTail = ctx.page.title?.split(/[|\-–—·]/).pop()?.trim()

    for (const n of [schemaName, ogName, titleTail]) {
      if (n) names.add(n.toLowerCase().replace(/\s+/g, ""))
    }
    if (names.size <= 1) {
      const shown = [schemaName, ogName, titleTail].filter(Boolean)
      return pass([
        shown.length
          ? `사이트명이 일관됩니다: ${[...new Set(shown)].join(" / ")}`
          : "비교할 사이트명 표기가 적어 불일치는 없습니다.",
      ])
    }
    return warn(
      [
        "사이트명 표기가 채널마다 다릅니다: " +
          [
            schemaName && `스키마 "${schemaName}"`,
            ogName && `og:site_name "${ogName}"`,
            titleTail && `title "${titleTail}"`,
          ]
            .filter(Boolean)
            .join(", "),
      ],
      "스키마 name, og:site_name, title 의 브랜드명을 하나로 통일하세요.",
    )
  },

  // G07 Attribution
  G07: (ctx: CheckContext) => {
    const a = detectAttribution(ctx)
    if (a.externalCount >= 2 && a.citeWords) {
      return pass([
        `외부 출처 링크 ${a.externalCount}개(${a.sampleHosts.join(", ")})와 출처 표현이 있습니다.`,
      ])
    }
    if (a.externalCount >= 1 || a.citeWords) {
      return warn(
        [
          `외부 링크 ${a.externalCount}개, 출처 표현 ${a.citeWords ? "있음" : "없음"}.`,
        ],
        "주장마다 근거가 되는 외부 출처를 링크로 명시하세요.",
      )
    }
    return warn(
      ["외부 출처 링크나 출처 표현을 찾지 못했습니다."],
      "핵심 주장에 공식 문서·연구·통계 출처를 링크로 붙이세요.",
    )
  },

  // G12 Structured Information
  G12: (ctx: CheckContext) => {
    const tables = ctx.page.root.querySelectorAll("table").length
    const dl = ctx.page.root.querySelectorAll("dl").length
    const ol = ctx.page.root.querySelectorAll("ol").length
    const ul = ctx.page.root.querySelectorAll("ul").length
    const score = tables * 2 + dl * 2 + ol + (ul >= 2 ? 1 : 0)
    const ev = [`표 ${tables} · 정의목록 ${dl} · 순서목록 ${ol} · 목록 ${ul}`]
    if (score >= 2) {
      return pass(ev)
    }
    return warn(
      ev,
      "정보를 표·정의목록·단계(ol)로 구조화하면 AI가 문장 단위로 추출하기 쉽습니다.",
    )
  },

  // G13 Attribution-ready Content
  G13: (ctx: CheckContext) => {
    const hasAuthor =
      !!ctx.page.metas["author"] ||
      ctx.page.links.some((l) => (l.rel ?? "").includes("author")) ||
      !!ctx.page.root.querySelector('[class*="author" i], [class*="byline" i]')
    const hasDate =
      !!ctx.page.metas["article:published_time"] ||
      !!ctx.page.metas["article:modified_time"] ||
      !!ctx.page.root.querySelector("time[datetime]")
    const hasExternal = ctx.page.links.some((l) =>
      isExternalLink(l.href, ctx.finalUrl),
    )
    const have = [
      hasAuthor && "작성자",
      hasDate && "날짜",
      hasExternal && "외부 참고링크",
    ].filter(Boolean)

    if (have.length === 3) {
      return pass(["인용 준비 요소를 모두 갖췄습니다: " + have.join(", ")])
    }
    const missing = [
      !hasAuthor && "작성자",
      !hasDate && "날짜",
      !hasExternal && "외부 참고링크",
    ].filter(Boolean)
    return warn(
      [`부족: ${missing.join(", ")} (보유: ${have.join(", ") || "없음"})`],
      "작성자·발행일·참고 자료를 함께 배치해야 AI가 출처를 밝혀 인용할 수 있습니다.",
    )
  },

  // G18 Freshness Verification
  G18: (ctx: CheckContext) => {
    const f = detectFreshness(ctx)
    if (!f.found) {
      return warn(
        ["콘텐츠의 작성·수정 시점을 알 수 있는 정보가 없습니다."],
        "게시일·수정일을 메타 태그와 스키마(datePublished/dateModified)에 명시하세요. AI는 시점을 알 수 없는 정보의 인용을 꺼립니다.",
      )
    }
    if (f.newestDate) {
      const ageMonths =
        (Date.now() - f.newestDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
      if (ageMonths > 30) {
        return warn(
          [
            `가장 최근 날짜가 약 ${Math.round(ageMonths / 12)}년 전입니다: ${f.labels.join(", ")}`,
          ],
          "오래된 콘텐츠는 최신 정보로 갱신하고 dateModified 를 업데이트하세요.",
        )
      }
    }
    return pass(["최신성 정보 확인: " + f.labels.join(", ")])
  },
}

export default geoChecks
