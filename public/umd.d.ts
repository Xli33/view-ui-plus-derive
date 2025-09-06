import type { App } from 'vue'

declare global {
  interface Window {
    iviewDerive: {
      install(
        app: App,
        opt?: {
          i18n?: any
          msg?: Record<string, any>
          msgPrefix?: string
        }
      ): void
    }
  }
}

// declare module 'view-ui-plus-derive/umd/index' {}
