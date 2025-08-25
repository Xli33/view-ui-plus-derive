import type { Obj } from '@/type'
import ViewUI from 'view-ui-plus'

// InputNumber默认值改为null，避免当绑定值为undefined时输入框会显示1
ViewUI.InputNumber.props.modelValue.default = null
// 优化InputNumber：设置了precision时只在超过所设精度时才控制精度
// ViewUI.InputNumber.computed.precisionValue = function () {
//   // can not display 1.0
//   if (!this.currentValue) return this.currentValue
//   if (this.precision) {
//     const valLeft = this.currentValue.toString().match(/\.\d+/)
//     // 如果当前输入值精度超过设定的精度，则将其固定为设定的精度
//     if (valLeft && valLeft[0].slice(1).length > this.precision) {
//       return this.currentValue.toFixed(this.precision)
//     }
//   }
//   return this.currentValue
// }
// InputNumber清空时的默认值
ViewUI.InputNumber.props.unset = {
  type: Number,
  default: null
}
// 重写InputNumber的change事件以支持清空时指定为默认值
ViewUI.InputNumber.methods!.change = function (
  this: Obj,
  event: { type: string; target: { value: string } }
) {
  if (event.type === 'change' && this.activeChange) return
  if (event.type === 'input' && !this.activeChange) return
  let val: string | number = event.target.value.trim()
  if (this.parser) {
    val = this.parser(val)
  }
  const isEmptyString = (<string>val).length === 0
  if (isEmptyString) {
    this.setValue(this.unset)
    return
  }
  if (event.type === 'input' && (<string>val).match(/^\-?\.?$|\.$/)) return // prevent fire early if decimal. If no more input the change event will fire later
  val = Number(val)
  if (!isNaN(val)) {
    this.currentValue = val
    this.setValue(val)
  } else {
    event.target.value = this.currentValue
  }
}
