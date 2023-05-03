/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OIOTE_SERVER_PORT: number;
  readonly OIOTE_API_HOST: string;
  readonly OIOTE_API_PORT: number;
  readonly OIOTE_API_BASE_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
