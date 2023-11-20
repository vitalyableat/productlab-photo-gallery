/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_PHOTO_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
