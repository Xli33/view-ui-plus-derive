<template>
  <Switch
    v-model="inner"
    @on-change="change"
    v-bind="$attrs"
    :trueValue="trueValue"
    :falseValue="falseValue">
    <template #open>
      <slot name="open">{{ trueLabel }}</slot>
    </template>
    <template #close>
      <slot name="close">{{ falseLabel }}</slot>
    </template>
  </Switch>
</template>

<script lang="ts">
// Switch，避免反复写slot

import { ref, watch } from 'vue'
import { Switch } from 'view-ui-plus'

export default {
  name: 'BaseSwitch'
}
</script>

<script setup lang="ts">
export type SwitchValue = string | number | boolean

const props = defineProps({
  modelValue: [String, Number, Boolean],
  /**
   * 打开状态对应值，默认 'T'
   */
  trueValue: {
    type: [String, Number, Boolean],
    default: 'T'
  },
  /**
   * 关闭状态对应值，默认 'F'
   */
  falseValue: {
    type: [String, Number, Boolean],
    default: 'F'
  },
  /**
   * 打开状态对应文本
   */
  trueLabel: String,
  /**
   * 关闭状态对应文本
   */
  falseLabel: String
})

defineSlots<{
  /**
   * 打开状态对应文本
   */
  open(): any
  /**
   * 关闭状态对应文本
   */
  close(): any
}>()

const emit = defineEmits<{
  // 'update:modelValue': [val: SwitchValue];
  // change: [val: SwitchValue]
  (e: 'update:modelValue', value: SwitchValue): void
  <k extends SwitchValue>(e: 'change', value: k): void
}>()

// data

const inner = ref(props.modelValue)

// methods

// let flag: true | null
const change = (val: SwitchValue) => {
  // flag = true
  // nextTick(() => {
  //   flag = null
  // })
  emit('update:modelValue', val)
  emit('change', val)
}

// watch

watch(
  () => props.modelValue,
  (val) => {
    // if (!flag) {
    if (inner.value !== val) inner.value = val
  }
)
</script>
