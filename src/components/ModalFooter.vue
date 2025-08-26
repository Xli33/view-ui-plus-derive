<template>
  <Row justify="space-between" align="middle">
    <Col>
      <slot name="other"></slot>
    </Col>
    <Col class="flex">
      <template v-if="!rightCancel">
        <Button
          :disabled="cancelDisabled"
          :loading="cancelLoading"
          :type="cancelType"
          v-bind="cancel"
          @click="toCancel"
          >{{ cancelText ?? $i18n.t('modalFooter.cancel') }}</Button
        >
        <Button
          v-if="hasOk"
          :disabled="okDisabled"
          :loading="okLoading"
          v-bind="ok"
          type="primary"
          @click="$emit('ok')"
          >{{ okText ?? $i18n.t('modalFooter.ok') }}</Button
        >
      </template>
      <template v-else>
        <Button
          v-if="hasOk"
          :disabled="okDisabled"
          :loading="okLoading"
          v-bind="ok"
          type="primary"
          @click="$emit('ok')"
          >{{ okText ?? $i18n.t('modalFooter.ok') }}</Button
        >
        <Button
          :disabled="cancelDisabled"
          :loading="cancelLoading"
          :type="cancelType"
          v-bind="cancel"
          @click="toCancel"
          >{{ cancelText ?? $i18n.t('modalFooter.cancel') }}</Button
        >
      </template>
      <slot name="action"></slot>
    </Col>
  </Row>
</template>

<script lang="ts">
// Modal底部组件

import { getCurrentInstance } from 'vue'
// import { Row, Col, Button } from 'view-ui-plus' // 待必需才启用
import { $i18n } from '@/locale/i18n'

export default {
  name: 'ModalFooter',
  inheritAttrs: false
}
</script>

<script setup lang="ts">
defineProps({
  modelValue: Boolean,
  /**
   * 确定按钮文本
   */
  okText: String,
  /**
   * 取消按钮文本
   */
  cancelText: String,
  /**
   * 传递给确定按钮的props
   */
  ok: Object,
  /**
   * 确定按钮加载状态
   */
  okLoading: Boolean,
  /**
   * 确定按钮禁用状态
   */
  okDisabled: Boolean,
  /**
   * 传递给取消按钮的props
   */
  cancel: Object,
  /**
   * 取消按钮加载状态
   */
  cancelLoading: Boolean,
  /**
   * 取消按钮禁用状态
   */
  cancelDisabled: Boolean,
  /**
   * 取消按钮type，默认 text
   */
  cancelType: {
    type: String,
    default: 'text'
  },
  /**
   * 是否把取消按钮放到确定按钮右边
   */
  rightCancel: Boolean,
  /**
   * 是否显示确定按钮
   */
  hasOk: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  ok: []
  cancel: []
}>()
const instance = getCurrentInstance()

// methods
const toCancel = () => {
  // 若父组件监听了cancel事件则触发该监听器，否则直接更改modelValue
  instance!.vnode.props!.onCancel ? emit('cancel') : emit('update:modelValue', false)
}
</script>
