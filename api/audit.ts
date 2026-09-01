// Vercel Serverless Function 진입점.
// 로컬 개발/독립 실행용 Hono 앱(server/index.ts)을 그대로 재사용해
// 배포 환경에서 GET /api/audit 요청을 처리한다.
import { handle } from "hono/vercel"
import app from "../server/index"

// node:crypto 등 Node API를 쓰므로 Node.js 런타임 고정
export const config = {
    runtime: "nodejs",
}

export default handle(app)
