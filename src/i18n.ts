import { createI18n } from 'vue-i18n'
import zh from 'view-ui-plus/dist/locale/zh-CN'
import en from 'view-ui-plus/dist/locale/en-US'
import zhCN from './locale/zh-CN'
import enUS from '../public/locale/en-US'

// zhCN.q = zhCN.d
// delete zhCN.d
// enUS.q = enUS.d
// delete enUS.d

export const i18n = createI18n({
  allowComposition: true,
  // globalInjection: true,
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      ...zh,
      ...zhCN
    },
    'en-US': {
      ...en,
      ...enUS
    }
  }
})
