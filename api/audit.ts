// [임시 진단본 2] server/ 코드를 전혀 import 하지 않는 최소 함수.
// 이 응답이 정상이면 문제는 ../server/index 모듈 그래프 로드에 있다.

export const config = {
    runtime: "nodejs",
}

export default function handler(req: Request): Response {
    const url = new URL(req.url).searchParams.get("url")
    return new Response(
        JSON.stringify({ diag: 2, ok: true, ts: Date.now(), receivedUrl: url }, null, 2),
        { status: 200, headers: { "content-type": "application/json" } },
    )
}
