/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly FRONTEND_PROFILE?: 'local' | 'prod';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
