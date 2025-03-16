/// <reference types="vite/client" />

interface ImportMetaEnv {
  // import.meta.env的ts提示
  readonly VITE_APP_API_BASEURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
