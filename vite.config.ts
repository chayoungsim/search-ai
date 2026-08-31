import react from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    // 개발 서버에서 /api/* 요청만 server/index.ts (Hono)로 넘긴다.
    // 그 외 경로(프론트 라우팅·자산)는 Vite가 처리.
    devServer({
      entry: "server/index.ts",
      exclude: [/^(?!\/api\/).*/],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: isSsrBuild
    ? { copyPublicDir: false, emptyOutDir: true }
    : {},
}))
