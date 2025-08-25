<template>
  <div class="combi ivu-input-group">
    <div v-if="hasPrepend" class="ivu-input-group-prepend">
      <slot name="prepend">{{ prepend }}</slot>
    </div>
    <div :class="['combi-cell', { 'with-append': hasAppend, 'with-prepend': hasPrepend }]">
      <slot></slot>
    </div>
    <div v-if="hasAppend" class="ivu-input-group-append">
      <slot name="append">{{ append }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
// 类似iview Input[append prepend]的组合框

import { computed } from 'vue'

export default {
  name: 'Combi'
}
</script>

<script setup lang="ts">
const slots = defineSlots<{
  default(): any
  /**
   * 前置内容
   */
  prepend?(): any
  /**
   * 后置内容
   */
  append?(): any
}>()

const props = defineProps({
  /**
   * 前置文本
   */
  prepend: String,
  /**
   * 后置文本
   */
  append: String
})

const hasPrepend = computed(() => !!props.prepend || !!slots.prepend?.().length)
const hasAppend = computed(() => !!props.append || !!slots.append?.().length)
</script>

<style lang="less">
@import '../styles/Combi.less';
</style>
