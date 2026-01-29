/// <reference types="vite/client" />

// 필요하다면 환경 변수 타입을 확장할 수 있습니다.
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_KEY: string
  // 다른 환경변수도 추가 가능
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
