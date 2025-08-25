import type { Obj } from '@/type'
import ViewUI from 'view-ui-plus'

// 修复iview Select开启filterable时过滤后可能只显示之前所选项的bug
ViewUI.Select.watch!.visible = function (this: Obj, state: boolean) {
  if (state) {
    this.filterQueryChange = false
  }
  this.$emit('on-open-change', state)
}
const showOption = ViewUI.Option.computed!.isShow as () => boolean
ViewUI.Option.computed!.isShow = function () {
  return (this.SelectInstance as Obj).dropVisible || showOption!.call(this)
}
