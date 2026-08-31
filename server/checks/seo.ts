import type { CheckContext, CheckFn } from "../types"
import {
  collectSchemaObjects,
  fail,
  findSchemaOfType,
  pass,
  stringField,
  warn,
} from "./util"

const seoChecks: Record<string, CheckFn> = {
  // S01 HTTPS
  S01: (ctx: CheckContext) => {
    const isHttps = ctx.finalUrl.startsWith("https://")
    const startedHttp = ctx.redirectChain[0]?.startsWith("http://")
    const mixed = [
      ...ctx.html.matchAll(/\b(?:src|href)\s*=\s*["']http:\/\/[^"']+/gi),
    ]
      .map((m) => m[0])
      .filter((s) => !/w3\.org|schema\.org|xmlns/.test(s))
      .slice(0, 3)

    if (!isHttps) {
      return fail(
        ["최종 URL이 HTTP입니다: " + ctx.finalUrl],
        "SSL 인증서를 적용하고 HTTP 요청을 HTTPS로 301 리다이렉트하세요.",
      )
    }
    if (mixed.length > 0) {
      return warn(
        ["HTTPS 페이지에 HTTP 리소스가 섞여 있습니다: " + mixed.join(" / ")],
        "모든 이미지·스크립트·스타일 URL을 https 로 바꾸세요.",
      )
    }
    return pass([
      startedHttp
        ? "HTTP 요청이 HTTPS로 리다이렉트됩니다."
        : "HTTPS로 정상 제공되며 mixed content가 없습니다.",
    ])
  },

  // S02 Crawlability (robots.txt)
  S02: (ctx: CheckContext) => {
    if (!ctx.robots) {
      return warn(
        ["robots.txt 를 확인하지 못했습니다."],
        "루트에 robots.txt 를 두고 주요 페이지가 차단되지 않도록 하세요.",
      )
    }
    if (!ctx.robots.exists) {
      return warn(
        ["robots.txt 가 없습니다 (404)."],
        "robots.txt 를 추가하고 sitemap 위치를 명시하세요.",
      )
    }
    if (!ctx.robots.allowAll) {
      return fail(
        [
          "robots.txt 가 전체 경로(/)를 차단합니다. Disallow: " +
            ctx.robots.disallow.join(", "),
        ],
        "검색·AI 크롤러가 사이트를 못 읽습니다. 비공개 경로만 선별 차단하세요.",
      )
    }
    return pass([
      "robots.txt 존재, User-agent: * 가 / 를 차단하지 않습니다." +
        (ctx.robots.disallow.length
          ? " (부분 차단: " + ctx.robots.disallow.join(", ") + ")"
          : ""),
    ])
  },

  // S03 Indexability (noindex)
  S03: (ctx: CheckContext) => {
    const metaRobots = (ctx.page.metas["robots"] ?? "").toLowerCase()
    const headerRobots = (ctx.headers["x-robots-tag"] ?? "").toLowerCase()
    if (metaRobots.includes("noindex") || headerRobots.includes("noindex")) {
      return fail(
        [
          metaRobots.includes("noindex")
            ? `<meta name="robots" content="${ctx.page.metas["robots"]}">`
            : `X-Robots-Tag: ${ctx.headers["x-robots-tag"]}`,
        ],
        "정식 페이지라면 noindex 를 제거하세요. 개발용 설정이 배포본에 남은 경우가 많습니다.",
      )
    }
    return pass(["noindex 지시자가 없어 색인 가능합니다."])
  },

  // S04 Sitemap
  S04: (ctx: CheckContext) => {
    if (ctx.sitemap?.exists && ctx.sitemap.valid) {
      return pass(["유효한 sitemap.xml 을 찾았습니다."])
    }
    if (ctx.sitemap?.exists && !ctx.sitemap.valid) {
      return warn(
        ["sitemap 을 찾았지만 <urlset>/<sitemapindex> 루트가 아닙니다."],
        "정상 XML 형식으로 다시 생성하세요.",
      )
    }
    return warn(
      ["sitemap.xml 을 찾지 못했습니다."],
      "sitemap.xml 을 만들고 robots.txt 에 Sitemap: 줄로 위치를 알리세요.",
    )
  },

  // S05 URL / Redirect
  S05: (ctx: CheckContext) => {
    const hops = ctx.redirectChain.length - 1
    const canonical = ctx.page.canonical
    const evidence: string[] = [`최종 상태 ${ctx.statusCode}, 리다이렉트 ${hops}회`]
    let status: "pass" | "warning" = "pass"
    let hint: string | undefined

    if (hops >= 3) {
      status = "warning"
      evidence.push("리다이렉트 체인: " + ctx.redirectChain.join(" → "))
      hint = "리다이렉트를 1회로 줄이세요."
    }
    if (canonical) {
      try {
        const c = new URL(canonical, ctx.finalUrl).toString()
        if (c.replace(/\/$/, "") !== ctx.finalUrl.replace(/\/$/, "")) {
          status = "warning"
          evidence.push(`canonical(${c}) 이 최종 URL과 다릅니다.`)
          hint = "canonical 을 실제 대표 URL과 일치시키세요."
        } else {
          evidence.push("canonical 이 최종 URL과 일치합니다.")
        }
      } catch {
        /* ignore */
      }
    }
    return { status, evidence, hint }
  },

  // S09 Title
  S09: (ctx: CheckContext) => {
    const title = ctx.page.title
    if (!title) {
      return fail(
        ["<title> 태그가 없거나 비어 있습니다."],
        "페이지마다 고유한 제목을 넣고 핵심 키워드를 앞쪽에 두세요.",
      )
    }
    const len = title.length
    if (len < 10 || len > 65) {
      return warn(
        [`제목 길이 ${len}자: "${title}"`],
        "제목은 대략 10~60자, 핵심 주제가 드러나게 작성하세요.",
      )
    }
    return pass([`제목(${len}자): "${title}"`])
  },

  // S10 Meta Description
  S10: (ctx: CheckContext) => {
    const desc = ctx.page.metas["description"]?.trim()
    if (!desc) {
      return warn(
        ["<meta name=\"description\"> 가 없습니다."],
        "페이지 내용과 검색 의도를 1~2문장(50~160자)으로 요약하세요.",
      )
    }
    if (desc.length < 40 || desc.length > 170) {
      return warn(
        [`메타 설명 길이 ${desc.length}자: "${desc.slice(0, 80)}…"`],
        "50~160자 범위로 조정하세요.",
      )
    }
    return pass([`메타 설명(${desc.length}자) 존재`])
  },

  // S11 Heading
  S11: (ctx: CheckContext) => {
    const h1s = ctx.page.headings.filter((h) => h.level === 1)
    const evidence: string[] = []
    if (h1s.length === 0) {
      return fail(
        ["H1 태그가 없습니다."],
        "페이지 핵심 주제를 담은 H1 을 하나 추가하세요.",
      )
    }
    if (h1s.length > 1) {
      evidence.push(
        `H1 이 ${h1s.length}개입니다: ` +
          h1s
            .map((h) => `"${h.text.slice(0, 30)}"`)
            .slice(0, 3)
            .join(", "),
      )
    }
    let skip = false
    let prev = 0
    for (const h of ctx.page.headings) {
      if (prev && h.level - prev > 1) skip = true
      prev = h.level
    }
    if (skip) evidence.push("헤딩 레벨이 건너뜁니다 (예: H2 다음 H4).")

    if (evidence.length === 0) {
      return pass([`H1 1개, 헤딩 계층 정상 (총 ${ctx.page.headings.length}개)`])
    }
    return warn(evidence, "H1 은 1개로, 헤딩은 레벨을 건너뛰지 않게 정리하세요.")
  },

  // S12 Semantic HTML
  S12: (ctx: CheckContext) => {
    const found = ["header", "nav", "main", "footer", "article", "section"].filter(
      (tag) => ctx.page.root.querySelector(tag),
    )
    const core = ["header", "nav", "main", "footer"].filter((t) =>
      found.includes(t),
    )
    if (core.length >= 3) {
      return pass([`시맨틱 태그 사용: ${found.join(", ")}`])
    }
    return warn(
      [`시맨틱 랜드마크가 부족합니다. 발견: ${found.join(", ") || "없음"}`],
      "div 대신 header/nav/main/footer 시맨틱 태그로 페이지 구조를 표현하세요.",
    )
  },

  // S15 Image / Media
  S15: (ctx: CheckContext) => {
    const imgs = ctx.page.images
    if (imgs.length === 0) return pass(["이미지가 없습니다."])
    const withAlt = imgs.filter((i) => i.alt !== null).length
    const ratio = withAlt / imgs.length
    const missing = imgs
      .filter((i) => i.alt === null)
      .map((i) => i.src.split("/").pop() || i.src)
      .slice(0, 4)

    if (ratio >= 0.95) {
      return pass([`이미지 ${imgs.length}개 중 ${withAlt}개에 alt 속성이 있습니다.`])
    }
    const ev = [
      `이미지 ${imgs.length}개 중 ${withAlt}개만 alt 속성이 있습니다.`,
      "alt 없는 예: " + missing.join(", "),
    ]
    const hint =
      "정보성 이미지엔 내용을 설명하는 alt 를, 장식 이미지엔 빈 alt(alt=\"\")를 지정하세요."
    return ratio >= 0.6 ? warn(ev, hint) : fail(ev, hint)
  },

  // S16 Schema Presence
  S16: (ctx: CheckContext) => {
    if (ctx.page.jsonLd.length === 0) {
      return warn(
        ["JSON-LD 구조화 데이터가 없습니다."],
        "페이지 유형에 맞는 schema.org 타입(Organization, Article, Product 등)을 JSON-LD 로 추가하세요.",
      )
    }
    return pass([`JSON-LD 블록 ${ctx.page.jsonLd.length}개 발견`])
  },

  // S17 Schema Validity
  S17: (ctx: CheckContext) => {
    if (ctx.page.jsonLd.length === 0) {
      return warn(["검증할 JSON-LD 가 없습니다."])
    }
    const broken = ctx.page.jsonLd.filter((b) => b.error)
    if (broken.length > 0) {
      return fail(
        broken.map((b) => `JSON-LD 파싱 오류: ${b.error}`).slice(0, 3),
        "JSON 문법 오류를 고치고 Rich Results Test 로 검증하세요.",
      )
    }
    const objs = collectSchemaObjects(ctx)
    const missingType = objs.filter((o) => !o["@type"]).length
    if (objs.length === 0) {
      return warn(
        ["JSON-LD 는 있으나 @type 이 있는 스키마 객체를 찾지 못했습니다."],
        "@context 와 @type 을 갖춘 객체로 작성하세요.",
      )
    }
    if (missingType > 0) {
      return warn([`@type 이 없는 스키마 객체 ${missingType}개`])
    }
    return pass([`JSON-LD ${ctx.page.jsonLd.length}개 모두 파싱 성공, @type 존재`])
  },

  // S18 Entity Completeness
  S18: (ctx: CheckContext) => {
    const objs = collectSchemaObjects(ctx)
    const entity = findSchemaOfType(
      objs,
      "Organization",
      "Person",
      "Product",
      "LocalBusiness",
    )
    if (!entity) {
      return warn(
        ["Organization/Person/Product 스키마가 없습니다."],
        "핵심 주체를 나타내는 엔티티 스키마에 name·url·identifier·sameAs 를 채우세요.",
      )
    }
    const name = stringField(entity, "name")
    const url = stringField(entity, "url")
    const sameAs = entity["sameAs"]
    const missing: string[] = []
    if (!name) missing.push("name")
    if (!url) missing.push("url")
    if (missing.length > 0) {
      return warn(
        [`엔티티 스키마에 ${missing.join(", ")} 가 없습니다.`],
        "name 과 url 은 필수, sameAs 로 공식 채널을 연결하면 좋습니다.",
      )
    }
    return pass([
      `엔티티 스키마(name: "${name}")에 필수 필드가 있습니다.` +
        (sameAs ? " sameAs 포함." : ""),
    ])
  },
}

export default seoChecks
