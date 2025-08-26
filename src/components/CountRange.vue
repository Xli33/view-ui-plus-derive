<template>
  <div class="count-range">
    <InputNumber v-model="minVal" v-bind="minProps" @on-change="changeMin"></InputNumber>
    <span v-show="!hideJoiner" :class="['count-range-joiner', joinerClass]"></span>
    <InputNumber v-model="maxVal" v-bind="maxProps" @on-change="changeMax"></InputNumber>
  </div>
</template>

<script lang="ts">
// 数值范围组件

import { type PropType, computed, ref, watch } from 'vue'
// import { InputNumber } from 'view-ui-plus' // 待必需才启用
import { $i18n } from '@/locale/i18n'

export default {
  name: 'CountRange'
}
</script>

<script setup lang="ts">
export type CountValue = number | null | undefined

const props = defineProps({
  /**
   * 双向绑定最小值
   */
  begin: {
    type: Number as PropType<CountValue>,
    default: null
  },
  /**
   * 双向绑定最大值
   */
  end: {
    type: Number as PropType<CountValue>,
    default: null
  },
  /**
   * 允许的最小值，默认0
   */
  min: {
    type: Number,
    default: 0
  },
  /**
   * 允许的最大值，默认9999999999
   */
  max: {
    type: Number,
    default: 9999999999
  },
  /**
   * 禁用整个组件
   */
  disabled: Boolean,
  /**
   * 禁用最小值
   */
  minDisabled: Boolean,
  /**
   * 禁用最大值
   */
  maxDisabled: Boolean,
  /**
   * 最小值组件class
   */
  minClass: [String, Array, Object],
  /**
   * 最大值组件class
   */
  maxClass: [String, Array, Object],
  /**
   * 最小值占位文本
   */
  minHolder: String,
  /**
   * 最大值占位文本
   */
  maxHolder: String,
  controlsOutside: Boolean,
  step: Number,
  readonly: Boolean,
  editable: {
    type: Boolean,
    default: true
  },
  precision: Number,
  formatter: Function,
  parser: Function,
  activeChange: {
    type: Boolean,
    default: true
  },
  /**
   * 传递给最小值组件的props
   */
  minAttr: Object,
  /**
   * 传递给最大值组件的props
   */
  maxAttr: Object,
  /**
   * 中间连接部分class
   */
  joinerClass: [String, Object],
  /**
   * 是否隐藏连接部分
   */
  hideJoiner: Boolean
})

const emit = defineEmits<{
  'update:begin': [val: number]
  'update:end': [val: number]
  'change-min': [val: number]
  'change-max': [val: number]
  change: [begin: number, end: number, isMax: boolean]
}>()

// data

const minVal = ref(props.begin),
  maxVal = ref(props.end)

// computed

const minProps = computed(() => ({
  min: props.min,
  max: props.max,
  placeholder: props.minHolder ?? $i18n.t('countRange.minHolder'),
  disabled: props.disabled || props.minDisabled,
  class: props.minClass,
  controlsOutside: props.controlsOutside,
  step: props.step,
  readonly: props.readonly,
  editable: props.editable,
  precision: props.precision,
  formatter: props.formatter,
  parser: props.parser,
  activeChange: props.activeChange,
  ...props.minAttr
}))

const maxProps = computed(() => ({
  min: minVal.value as number,
  max: props.max,
  placeholder: props.maxHolder ?? $i18n.t('countRange.maxHolder'),
  disabled: props.disabled || props.maxDisabled,
  class: props.maxClass,
  controlsOutside: props.controlsOutside,
  step: props.step,
  readonly: props.readonly,
  editable: props.editable,
  precision: props.precision,
  formatter: props.formatter,
  parser: props.parser,
  activeChange: minVal.value ? false : props.activeChange,
  ...props.maxAttr
}))

// methods
// let flag: true | null
const emitModel = () => {
  // flag = true
  // nextTick(() => {
  //   flag = null
  // })
  emit('update:begin', minVal.value as number)
  emit('update:end', maxVal.value as number)
}
const changeMin = (val: number) => {
  if (maxVal.value != null && val > maxVal.value) {
    maxVal.value = val + 1 > maxProps.value.max ? maxProps.value.max : val + 1
  }
  emitModel()
  emit('change-min', val)
  emit('change', val, maxVal.value as number, false)
}
const changeMax = (val: number) => {
  emitModel()
  emit('change-max', val)
  emit('change', minVal.value as number, val, true)
}
const setMin = (newVal?: CountValue) => {
  if (minVal.value !== newVal /* !flag */) minVal.value = newVal !== undefined ? newVal : null
}
const setMax = (newVal?: CountValue) => {
  if (maxVal.value !== newVal /* !flag */) maxVal.value = newVal !== undefined ? newVal : null
}

// created
// setMin(props.begin);
// setMax(props.end);

// 监听最小值
watch(() => props.begin, setMin)

// 监听最大值
watch(() => props.end, setMax)

// export default {
//   /* mounted() {
//     let i;
//     for (i = 0; i < this.$el.children.length; ) {
//       this.$el.parentNode.insertBefore(
//         this.$el.children[this.$el.children.length - i - 1],
//         this.$el.nextElementSibling
//       );
//     }
//     this.$el.parentNode.removeChild(this.$el);
//   } */
// };
</script>

<style lang="less">
@import '../styles/CountRange.less';
</style>
