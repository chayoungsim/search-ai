// [임시 진단본] Vercel 함수 크래시 원인 파악용.
// server/index.ts 로드 또는 hono/vercel 로드 단계에서 나는 에러를 응답으로 반환한다.
// 원인 확인 후 정상본으로 되돌린다.

export const config = {
    runtime: "nodejs",
}

export default async function handler(req: Request): Promise<Response> {
    try {
        const [{ default: app }, { handle }] = await Promise.all([
            import("../server/index"),
            import("hono/vercel"),
        ])
        return handle(app)(req)
    } catch (e) {
        const err = e as Error
        return new Response(
            JSON.stringify({ diag: true, message: String(err?.message ?? e), stack: err?.stack ?? null }, null, 2),
            { status: 500, headers: { "content-type": "application/json" } },
        )
    }
}
