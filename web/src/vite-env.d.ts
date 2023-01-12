/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: "development" | "production" | "test";
  VITE_API_URL: string;
  VITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
