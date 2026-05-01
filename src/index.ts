import type { App } from 'vue'
import type { Obj } from './type'
// import dayjs from 'dayjs'
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import * as allComponents from './components'
import { $i18n } from './locale/i18n'
import { vIviewSelect } from './directives' // 用 import * as dirs from './directives'会导致生成额外的chunk，内容是通过Object.freeze处理过的只读对象
import { classPrefix } from './utils'

const components = Object.values(allComponents),
  directives = Object.entries({ iviewSelect: vIviewSelect })
// dayjsPlugin = {
//   isSameOrBefore,
//   isSameOrAfter
// }

// for (const k in dayjsPlugin) {
//   !dayjs.prototype[k] && dayjs.extend(dayjsPlugin[k as keyof typeof dayjsPlugin])
// }

export function install(
  app: App,
  opt: {
    prefix?: string
    i18n?: any
    msg?: Obj
    msgPrefix?: string
  } = {}
) {
  // 支持定义组件名前缀
  if (opt.prefix) {
    // app.provide(classSymbol, opt.prefix)
    classPrefix[0] = opt.prefix
    components.forEach((e) => (e.name = opt.prefix! + e.name))
  }
  components.forEach((component) => {
    app.component(component.name!, component)
  })
  directives.forEach((e) => {
    app.directive(e[0], e[1])
  })
  if (opt.i18n) {
    $i18n.i18n = opt.i18n
    // 语言内容默认挂在键d上。若不使用“d”则将其替换为opt.msgPrefix
    if (opt.msgPrefix && opt.msgPrefix !== 'd') {
      $i18n.prefix = opt.msgPrefix
      // if ($i18n.msg.d) {
      //   $i18n.msg[$i18n.prefix] = $i18n.msg.d
      //   delete $i18n.msg.d
      // }
    }
    return
  }
  if (opt.msg) {
    $i18n.msg = opt.msg
  }
}

export default {
  install
}

export * from './components'

export {
  // vue指令
  vIviewSelect
}
