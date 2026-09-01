// [임시 진단본 3] Vercel이 이 함수를 Web(Request) 시그니처로 부르는지,
// 클래식 Node (req,res) 시그니처로 부르는지 확정한다.

export const config = {
    runtime: "nodejs",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler(a: any, b: any): any {
    // Web 표준 시그니처: a = Request, b = undefined
    if (b === undefined) {
        const u = typeof a?.url === "string" ? a.url : String(a?.url)
        return new Response(
            JSON.stringify({ diag: 3, mode: "web", url: u }, null, 2),
            { status: 200, headers: { "content-type": "application/json" } },
        )
    }
    // 클래식 Node 시그니처: a = IncomingMessage, b = ServerResponse
    b.statusCode = 200
    b.setHeader("content-type", "application/json")
    b.end(JSON.stringify({ diag: 3, mode: "classic", url: a?.url ?? null }))
}
