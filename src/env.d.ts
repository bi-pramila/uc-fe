/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
    readonly REACT_APP_API_BASE_URL: string;
    readonly REACT_APP_WS_URL: string;
    readonly PUBLIC_URL: string;
    readonly REACT_APP_ENABLE_LOGS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
