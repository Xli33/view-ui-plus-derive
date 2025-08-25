// import ViewUIPlus from 'view-ui-plus'
// import type { Obj } from './type'
import './iview-mods/input-number'
import './iview-mods/select'
import './iview-mods/table'

// const ViewUI: Obj = ViewUIPlus

// 修复Table在某些情况下表头/固定列与内容错位
// const tableDataHandler = ViewUI.Table.watch.data.handler
// ViewUI.Table.watch.data.handler = function (val: Obj[]) {
//   tableDataHandler.call(this, val)
//   setTimeout(() => {
//     const tbody = this.$refs.body
//     if (!tbody) return
//     ;((this.$refs.header && this.$refs.header.scrollLeft) !== tbody.scrollLeft ||
//       (this.isRightFixed && this.$refs.fixedRightBody.scrollTop !== tbody.scrollTop) ||
//       (this.isLeftFixed && this.$refs.fixedBody.scrollTop !== tbody.scrollTop)) &&
//       tbody.dispatchEvent(new Event('scroll'))
//   })
// }

// // 修复iview Select开启filterable时过滤后可能只显示之前所选项的bug
// ViewUI.Select.watch.visible = function (state: boolean) {
//   if (state) {
//     this.filterQueryChange = false
//   }
//   this.$emit('on-open-change', state)
// }
// const showOption = ViewUI.Option.computed.isShow
// ViewUI.Option.computed.isShow = function () {
//   return this.SelectInstance.dropVisible || showOption.call(this)
// }

// // InputNumber默认值改为null，避免当绑定值为undefined时输入框会显示1
// ViewUI.InputNumber.props.modelValue.default = null
// // 优化InputNumber：设置了precision时只在超过所设精度时才控制精度
// // ViewUI.InputNumber.computed.precisionValue = function () {
// //   // can not display 1.0
// //   if (!this.currentValue) return this.currentValue
// //   if (this.precision) {
// //     const valLeft = this.currentValue.toString().match(/\.\d+/)
// //     // 如果当前输入值精度超过设定的精度，则将其固定为设定的精度
// //     if (valLeft && valLeft[0].slice(1).length > this.precision) {
// //       return this.currentValue.toFixed(this.precision)
// //     }
// //   }
// //   return this.currentValue
// // }
// // InputNumber清空时的默认值
// ViewUI.InputNumber.props.unset = {
//   type: Number,
//   default: null
// }
// // 重写InputNumber的change事件以支持清空时指定为默认值
// ViewUI.InputNumber.methods.change = function (event: { type: string; target: { value: string } }) {
//   if (event.type === 'change' && this.activeChange) return
//   if (event.type === 'input' && !this.activeChange) return
//   let val: string | number = event.target.value.trim()
//   if (this.parser) {
//     val = this.parser(val)
//   }
//   const isEmptyString = (<string>val).length === 0
//   if (isEmptyString) {
//     this.setValue(this.unset)
//     return
//   }
//   if (event.type === 'input' && (<string>val).match(/^\-?\.?$|\.$/)) return // prevent fire early if decimal. If no more input the change event will fire later
//   val = Number(val)
//   if (!isNaN(val)) {
//     this.currentValue = val
//     this.setValue(val)
//   } else {
//     event.target.value = this.currentValue
//   }
// }

// 扩展Input，支持设置清空时的默认值
// ViewUI.Input.props.unset = [String, Number]
// ViewUI.Input.props.unsetTrim = [String, Number]
// ViewUI.Input.methods.handleInput = function (event: Obj) {
//   if (this.isOnComposition) return
//   let value = event.target.value
//   if (this.unset != undefined && value === '') {
//     value = this.unset
//   } else if (this.unsetTrim != undefined && value.trim() === '') {
//     value = this.unsetTrim
//   }
//   if (this.number && value !== '') value = Number.isNaN(Number(value)) ? value : Number(value)
//   this.$emit('update:modelValue', value)
//   this.setCurrentValue(value)
//   this.$emit('on-change', event)
// }

// 重写iview Table的size prop
/* ViewUI.Table.props.size.default = function () {
  return Vue.prototype.$IVIEW && "" !== Vue.prototype.$IVIEW.size
    ? Vue.prototype.$IVIEW.size
    : Vue.prototype.$IVIEW.tableSize || "default";
}; */
