/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  /**
   * api请求前缀
   */
  readonly VITE_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
