import type { DefineComponent } from 'vue';

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue' {
    export * from '@vue/runtime-core'
    interface ComponentCustomProperties {
        $route: any;
        $router: any;
    }
}

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_OTHER_VAR?: string;
    readonly BASE_URL: string;
    readonly VITE_MODE?: string;
    // ... other env variables
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}