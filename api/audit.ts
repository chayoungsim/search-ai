// Vercel Serverless Function 진입점.
// 로컬 개발/독립 실행용 Hono 앱(server/index.ts)을 그대로 재사용해
// 배포 환경에서 GET /api/audit 요청을 처리한다.
//
// 주의 1: Vercel(@vercel/node)은 이 default export 를 클래식 Node (req, res)
//   시그니처로 호출한다. Web 표준 Request 를 기대하는 hono/vercel 의 handle() 이
//   아니라, (req,res) → Web Request 변환을 해 주는 @hono/node-server 의
//   getRequestListener 를 써야 한다.
// 주의 2: server/ 코드는 상대경로로만 import 한다(@/ alias 금지). 그래야
//   @vercel/node 의 esbuild 번들링이 전체 그래프를 하나로 묶어낸다.
import { getRequestListener } from "@hono/node-server"
import app from "../server/index"

// node:crypto 등 Node API를 쓰므로 Node.js 런타임 고정
export const config = {
    runtime: "nodejs",
}

export default getRequestListener(app.fetch)
