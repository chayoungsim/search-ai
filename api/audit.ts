// Vercel Serverless Function 진입점 — GET /api/audit
//
// @vercel/node 는 이 프로젝트에서 함수를 번들하지 않고 transpile 만 하므로,
// api/ 밖의 .ts 를 직접 import 하면 런타임에 ERR_MODULE_NOT_FOUND 가 난다.
// 그래서 빌드 단계(npm run build)에서 server/index.ts 를 Vite SSR 로 단일
// 파일(dist-server/index.js)로 미리 번들하고, 여기서는 그 파일 하나만
// 명시적 확장자로 import 한다.
//
// 또한 Vercel 은 default export 를 클래식 Node (req,res) 시그니처로 호출하므로
// Web 표준용 hono/vercel handle() 대신 @hono/node-server 의 getRequestListener
// 로 (req,res) → Web Request 변환을 거쳐 Hono 에 넘긴다.
import { getRequestListener } from "@hono/node-server"
import app from "../dist-server/index.js"

// node:crypto 등 Node API를 쓰므로 Node.js 런타임 고정
export const config = {
    runtime: "nodejs",
}

export default getRequestListener(app.fetch)
