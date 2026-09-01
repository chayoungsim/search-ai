// [임시 진단본 4] 클래식 (req,res) 위에서 모듈 로드/실행 에러를 res 로 반환한다.

export const config = {
    runtime: "nodejs",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any): Promise<void> {
    try {
        const [nodeServer, serverMod] = await Promise.all([
            import("@hono/node-server"),
            import("../server/index"),
        ])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const app = (serverMod as any).default
        const listener = nodeServer.getRequestListener(app.fetch)
        await listener(req, res)
    } catch (e) {
        const err = e as Error
        res.statusCode = 500
        res.setHeader("content-type", "application/json")
        res.end(
            JSON.stringify({
                diag: 4,
                name: err?.name ?? null,
                message: String(err?.message ?? e),
                stack: err?.stack ?? null,
            }, null, 2),
        )
    }
}
