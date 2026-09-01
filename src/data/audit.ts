// SEO · AEO · GEO 자동진단(/audit) — 통합 데이터 + 결과 조립(순수 모듈)
//
// 이 파일은 브라우저(프론트)와 Node(server/) 양쪽에서 import 된다. DOM / window 참조 금지.
// 실제 규칙 판정은 server/checks/* 가 수행하고, 그 결과(Record<ruleId, RuleOutcome>)를
// buildAuditResult() 에 넘기면 영역 점수 · 등급 · 수정 항목 · 측정 커버리지를 계산한다.
//
// src/data/{seo,aeo,geo}.ts 의 체크리스트(rule: id/title/weight/summary/checks[])를 그대로 소비한다.

import { seoChecklist } from "./seo";
import { aeoChecklist } from "./aeo";
import { geoChecklist } from "./geo";

export interface AuditRule {
  id: string;
  title: string;
  weight: number;
  summary: string;
  checks: string[];
}

export interface AuditCategory {
  key: string;
  label: string;
  range: string;
  weight: number;
  description: string;
  rules: AuditRule[];
}

export interface AuditArea {
  key: "seo" | "aeo" | "geo";
  label: string;
  fullName: string;
  overallWeight: number; // Overall Score 100점 중 이 영역에 배분되는 점수
  categories: AuditCategory[];
}

export const auditAreas: AuditArea[] = [
  {
    key: "seo",
    label: "SEO",
    fullName: "Search Engine Optimization",
    overallWeight: 40,
    categories: seoChecklist,
  },
  {
    key: "aeo",
    label: "AEO",
    fullName: "Answer Engine Optimization",
    overallWeight: 30,
    categories: aeoChecklist,
  },
  {
    key: "geo",
    label: "GEO",
    fullName: "Generative Engine Optimization",
    overallWeight: 30,
    categories: geoChecklist,
  },
];

// ─────────────────────────────────────────────
// rule 조회 (id → rule + 소속 영역/카테고리)
// ─────────────────────────────────────────────

export interface RuleLookup {
  rule: AuditRule;
  areaKey: AuditArea["key"];
  areaLabel: string;
  categoryLabel: string;
}

const RULE_LOOKUP = new Map<string, RuleLookup>();
for (const area of auditAreas) {
  for (const category of area.categories) {
    for (const rule of category.rules) {
      RULE_LOOKUP.set(rule.id, {
        rule,
        areaKey: area.key,
        areaLabel: area.label,
        categoryLabel: category.label,
      });
    }
  }
}

export function getRule(ruleId: string): RuleLookup | undefined {
  return RULE_LOOKUP.get(ruleId);
}

export function allRuleIds(): string[] {
  return [...RULE_LOOKUP.keys()];
}

// ─────────────────────────────────────────────
// 등급
// ─────────────────────────────────────────────

export type Grade = "A" | "B" | "C" | "D" | "F";

export const GRADE_LABEL: Record<Grade, string> = {
  A: "매우 우수",
  B: "양호",
  C: "개선 여지",
  D: "취약",
  F: "위험",
};

export const GRADE_DESCRIPTION: Record<Grade, string> = {
  A: "검색·답변·생성형 AI 노출 기반이 대부분 갖춰져 있습니다. 세부 항목을 미세 조정하는 단계입니다.",
  B: "핵심 기반은 마련돼 있으나 일부 영역에서 노출 기회를 놓치고 있습니다.",
  C: "절반 남짓만 충족된 상태로, 우선순위를 정해 개선하면 성과가 빠르게 나타납니다.",
  D: "기본 요건이 여러 개 비어 있어 검색·AI 노출이 제한됩니다. 구조적 보완이 필요합니다.",
  F: "진단 항목 대부분이 미충족 상태입니다. 전면적인 점검과 재설계를 권장합니다.",
};

export function getGrade(score: number): Grade {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// ─────────────────────────────────────────────
// 진단 결과 타입
// ─────────────────────────────────────────────

// "na" = 이번 버전에서 자동 판정하지 않는 항목(수동 확인 권장). 점수 분모에서 제외한다.
export type RuleStatus = "pass" | "warning" | "fail" | "na";
export type Severity = "critical" | "high" | "medium" | "low";

export const STATUS_LABEL: Record<RuleStatus, string> = {
  pass: "통과",
  warning: "주의",
  fail: "실패",
  na: "측정 예정",
};

export const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "치명적",
  high: "높음",
  medium: "보통",
  low: "낮음",
};

// server/checks/* 가 rule 하나에 대해 반환하는 판정 결과
export interface RuleOutcome {
  status: RuleStatus;
  evidence?: string[]; // 서버가 실제로 발견한 근거 (사람이 읽는 문장)
  hint?: string; // 이 사이트에 맞춘 동적 권고 (선택)
}

export interface RuleResult {
  ruleId: string;
  status: RuleStatus; // 수정 항목 목록에는 warning | fail 만 담긴다
  severity: Severity;
  evidence?: string[];
  hint?: string;
}

export interface AreaCategoryResult {
  key: string;
  label: string;
  range: string;
  passCount: number;
  measuredCount: number;
  ruleCount: number;
}

export interface AreaResult {
  key: AuditArea["key"];
  label: string;
  fullName: string;
  overallWeight: number;
  score: number; // 0~100 (측정된 rule 기준으로 정규화)
  grade: Grade;
  measuredCount: number;
  ruleCount: number;
  categories: AreaCategoryResult[];
}

export interface AuditResult {
  url: string;
  hostname: string;
  generatedAt: number;
  overall: { score: number; grade: Grade };
  areas: AreaResult[];
  statuses: Record<string, RuleStatus>; // 전체 rule id → status ("na" 포함)
  fixItems: RuleResult[]; // status === warning | fail, 심각도 순 정렬
  measured: { count: number; total: number }; // 예: { count: 25, total: 58 }
}

// ─────────────────────────────────────────────
// URL 검증 / 정규화
// ─────────────────────────────────────────────

const withScheme = (raw: string): string =>
  /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

export function isValidUrl(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(withScheme(trimmed));
    return parsed.hostname.includes(".") && parsed.hostname.length >= 3;
  } catch {
    return false;
  }
}

export function normalizeUrl(raw: string): string {
  return new URL(withScheme(raw.trim())).toString();
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// ─────────────────────────────────────────────
// 채점
// ─────────────────────────────────────────────

function severityOf(weight: number, status: "warning" | "fail"): Severity {
  if (status === "fail") {
    if (weight >= 3) return "critical";
    if (weight === 2) return "high";
    return "medium";
  }
  if (weight >= 3) return "high";
  if (weight === 2) return "medium";
  return "low";
}

// pass=weight 전액, warning=절반, fail=0. "na"는 분모에서 제외.
const STATUS_FACTOR: Record<Exclude<RuleStatus, "na">, number> = {
  pass: 1,
  warning: 0.5,
  fail: 0,
};

function scoreArea(
  area: AuditArea,
  statuses: Record<string, RuleStatus>,
): { score: number; measuredCount: number; ruleCount: number; categories: AreaCategoryResult[] } {
  let earned = 0;
  let measuredWeight = 0;
  let measuredCount = 0;
  let ruleCount = 0;

  const categories = area.categories.map((category) => {
    let passCount = 0;
    let catMeasured = 0;
    for (const rule of category.rules) {
      ruleCount += 1;
      const status = statuses[rule.id] ?? "na";
      if (status === "na") continue;
      measuredWeight += rule.weight;
      measuredCount += 1;
      catMeasured += 1;
      earned += rule.weight * STATUS_FACTOR[status];
      if (status === "pass") passCount += 1;
    }
    return {
      key: category.key,
      label: category.label,
      range: category.range,
      passCount,
      measuredCount: catMeasured,
      ruleCount: category.rules.length,
    };
  });

  const score = measuredWeight ? Math.round((earned / measuredWeight) * 100) : 0;
  return { score, measuredCount, ruleCount, categories };
}

const STATUS_RANK: Record<RuleStatus, number> = { fail: 0, warning: 1, pass: 2, na: 3 };
const SEVERITY_RANK: Record<Severity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

// ─────────────────────────────────────────────
// 결과 조립 — server/checks 결과 → AuditResult
// ─────────────────────────────────────────────

export function buildAuditResult(
  outcomes: Record<string, RuleOutcome>,
  rawUrl: string,
): AuditResult {
  const url = normalizeUrl(rawUrl);

  const statuses: Record<string, RuleStatus> = {};
  for (const id of RULE_LOOKUP.keys()) {
    statuses[id] = outcomes[id]?.status ?? "na";
  }

  let overallRaw = 0;
  let overallWeightUsed = 0;

  const areas: AreaResult[] = auditAreas.map((area) => {
    const { score, measuredCount, ruleCount, categories } = scoreArea(area, statuses);
    if (measuredCount > 0) {
      overallRaw += (score / 100) * area.overallWeight;
      overallWeightUsed += area.overallWeight;
    }
    return {
      key: area.key,
      label: area.label,
      fullName: area.fullName,
      overallWeight: area.overallWeight,
      score,
      grade: getGrade(score),
      measuredCount,
      ruleCount,
      categories,
    };
  });

  // 측정된 영역의 가중치만으로 100점 환산
  const score = overallWeightUsed
    ? Math.round((overallRaw / overallWeightUsed) * 100)
    : 0;

  const fixItems: RuleResult[] = Object.entries(statuses)
    .filter(
      (entry): entry is [string, "warning" | "fail"] =>
        entry[1] === "warning" || entry[1] === "fail",
    )
    .map(([ruleId, status]) => ({
      ruleId,
      status,
      severity: severityOf(RULE_LOOKUP.get(ruleId)?.rule.weight ?? 1, status),
      evidence: outcomes[ruleId]?.evidence,
      hint: outcomes[ruleId]?.hint,
    }))
    .sort((a, b) => {
      if (STATUS_RANK[a.status] !== STATUS_RANK[b.status]) {
        return STATUS_RANK[a.status] - STATUS_RANK[b.status];
      }
      if (SEVERITY_RANK[a.severity] !== SEVERITY_RANK[b.severity]) {
        return SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
      }
      const wa = RULE_LOOKUP.get(a.ruleId)?.rule.weight ?? 0;
      const wb = RULE_LOOKUP.get(b.ruleId)?.rule.weight ?? 0;
      return wb - wa;
    });

  const measuredTotal = RULE_LOOKUP.size;
  const measuredDone = Object.values(statuses).filter((s) => s !== "na").length;

  return {
    url,
    hostname: hostnameOf(url),
    generatedAt: Date.now(),
    overall: { score, grade: getGrade(score) },
    areas,
    statuses,
    fixItems,
    measured: { count: measuredDone, total: measuredTotal },
  };
}
