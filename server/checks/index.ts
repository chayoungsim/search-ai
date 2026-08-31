import { allRuleIds } from "@/data/audit"
import type { RuleOutcome } from "@/data/audit"
import type { CheckContext, CheckFn } from "../types"
import seoChecks from "./seo"
import aeoChecks from "./aeo"
import geoChecks from "./geo"

const ALL_CHECKS: Record<string, CheckFn> = {
  ...seoChecks,
  ...aeoChecks,
  ...geoChecks,
}

// 전체 58개 rule 중 등록된 것만 판정하고, 나머지는 "na"(측정 예정)로 채운다.
export function runChecks(ctx: CheckContext): Record<string, RuleOutcome> {
  const outcomes: Record<string, RuleOutcome> = {}

  for (const ruleId of allRuleIds()) {
    const check = ALL_CHECKS[ruleId]
    if (!check) {
      outcomes[ruleId] = { status: "na" }
      continue
    }
    try {
      outcomes[ruleId] = check(ctx)
    } catch (e) {
      outcomes[ruleId] = {
        status: "na",
        evidence: [
          "자동 판정 중 오류: " + (e instanceof Error ? e.message : String(e)),
        ],
      }
    }
  }

  return outcomes
}

export const MEASURED_RULE_IDS = Object.keys(ALL_CHECKS)
