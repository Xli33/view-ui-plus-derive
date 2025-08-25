import type { App } from 'vue'
import type { Obj } from './type'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
import AllCheckbox, { type CheckValue } from './components/AllCheckbox.vue'
import BaseSwitch, { type SwitchValue } from './components/BaseSwitch.vue'
import Combi from './components/Combi.vue'
import CountRange, { type CountValue } from './components/CountRange.vue'
import CacheSelect from './components/CacheSelect.vue'
import RemoteSelect, { type SelectValue } from './components/RemoteSelect.vue'
import CurdTable from './components/CurdTable.vue'
import DateRange, { type DateValue } from './components/DateRange.vue'
import DateRangePicker from './components/DateRangePicker.vue'
import MCalendar, { type MCalendarCell } from './components/MCalendar.vue'
import ModalFooter from './components/ModalFooter.vue'
import PageTable from './components/PageTable.vue'
import ToggleColumn from './components/ToggleColumn.vue'
import { $i18n } from './locale/i18n'
import { iviewSelect } from './directives' // 用 import * as dirs from './directives'会导致生成额外的chunk，内容是通过Object.freeze处理过的只读对象

const components = [
    AllCheckbox,
    BaseSwitch,
    Combi,
    CountRange,
    CacheSelect,
    RemoteSelect,
    CurdTable,
    DateRange,
    DateRangePicker,
    MCalendar,
    ModalFooter,
    PageTable,
    ToggleColumn
  ],
  directives = { iviewSelect },
  dayjsPlugin = {
    isSameOrBefore,
    isSameOrAfter,
    isBetween
  }

for (const k in dayjsPlugin) {
  !dayjs.prototype[k] && dayjs.extend(dayjsPlugin[k as keyof typeof dayjsPlugin])
}

export function install(
  app: App,
  opt: {
    i18n?: any
    msg?: Obj
    msgPrefix?: string
  } = {}
) {
  components.forEach((component) => {
    app.component(component.name!, component)
  })
  Object.entries(directives).forEach((e) => {
    app.directive(e[0], e[1])
  })
  if (opt.msg) {
    $i18n.msg = opt.msg
    return
  }
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
  }
}

export default {
  install
}

export {
  AllCheckbox,
  BaseSwitch,
  Combi,
  CountRange,
  CacheSelect,
  RemoteSelect,
  CurdTable,
  DateRange,
  DateRangePicker,
  MCalendar,
  ModalFooter,
  PageTable,
  ToggleColumn,
  // vue指令
  iviewSelect
}

export type { CheckValue, CountValue, MCalendarCell, DateValue, SelectValue, SwitchValue }
