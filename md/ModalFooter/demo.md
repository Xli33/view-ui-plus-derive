#### 基本用法

```vue
<template>
  <Button @click="modal.show = true">show Modal</Button>
  <Modal
    v-model="modal.show"
    title="modal footer"
    :closable="!modal.loading"
    :mask-closable="!modal.loading"
    :before-close="cancel">
    <h1>modal content</h1>
    <template #footer>
      <ModalFooter
        v-model="modal.show"
        :ok-loading="modal.loading"
        :cancel-disabled="modal.loading"
        @ok="confirm"
        @cancel="cancel"></ModalFooter>
    </template>
  </Modal>
</template>
<script setup>
import { reactive } from 'vue'
import { Modal } from 'view-ui-plus'

const modal = reactive({
    show: false,
    loading: false
  }),
  confirm = () => {
    modal.loading = true
    setTimeout(() => {
      modal.show = false
      setTimeout(() => {
        modal.loading = false
      }, 200)
    }, 2000)
  },
  cancel = () =>
    new Promise((resolve, reject) => {
      Modal.confirm({
        title: '确认取消',
        content: '所做修改将不会保存',
        onOk: () => {
          modal.show = false
          resolve()
        },
        onCancel: reject
      })
    })
</script>
```
