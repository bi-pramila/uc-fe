/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly PUBLIC_NODE_ENV?: 'development' | 'production' | 'test';
  readonly PUBLIC_APP_NAME?: string;
  readonly PUBLIC_APP_VERSION?: string;
  readonly PUBLIC_API_BASE_URL: string;
  readonly PUBLIC_WS_URL?: string;
  readonly PUBLIC_URL?: string;
  readonly PUBLIC_ENABLE_LOGS?: string;
  readonly PUBLIC_GOOGLE_MAPS_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
