import type { Directive } from 'vue'
import type { Obj } from '@/type'

// iview Select使用v-iview-select:all开启全选操作
export const iviewSelect: Directive = {
  beforeMount: (el, binding, vnode: any) => {
    // console.log('created', el, binding, vnode)
    if (
      // binding.arg !== 'select' ||
      binding.arg !== 'all' ||
      (binding.value != null && !binding.value)
    )
      return
    // if (!vnode.el!.__vueParentComponent) return
    if (!vnode.el) return
    const { ctx } = vnode.ctx,
      icon = document.createElement('i')
    icon.className = 'ivu-icon ivu-icon-md-done-all ivu-select-arrow'
    icon.style.transform = 'translateY(-50%)'
    // icon.title = '全选/清空'
    icon.onclick = (e) => {
      if (ctx.disabled || !ctx.multiple) return
      e.stopPropagation()
      const valids = ctx.slotOptions.filter((e: Obj) => !e.ctx.itemDisabled)
      ctx.$emit(
        'update:modelValue',
        ctx.values.length !== valids.length ? valids.map((e: Obj) => e.ctx.value) : []
      )
    }
    if (!document.getElementById('iselect-css')) {
      const style = document.createElement('style')
      style.id = 'iselect-css'
      style.innerHTML =
        '.with-all.ivu-select .ivu-select-selection .ivu-select-arrow.ivu-icon-md-done-all,' +
        '.with-all.ivu-select-multiple:hover .ivu-select-selection .ivu-select-arrow:not(.ivu-icon-md-done-all){display:none;}' +
        '.with-all.ivu-select-multiple:hover .ivu-select-selection .ivu-icon-md-done-all{display:inline-block}' //.replace(/\n\s*/g, '')
      document.head.appendChild(style)
    }
    el.classList.add('with-all')
    el.children[0]!.children[1]!.appendChild(icon)
  },
  updated: (el: HTMLElement) => {
    el.classList.add('with-all')
  }
}
