#### 基本用法

```vue
<template>
  <Button @click="modal.show = true">show Modal</Button>
  <Modal v-model="modal.show" title="modal footer">
    <h1>modal content</h1>
    <template #footer>
      <ModalFooter
        v-model="modal.show"
        :ok-loading="modal.loading"
        @ok="confirm"
        @cancel="cancel"></ModalFooter>
    </template>
  </Modal>
</template>
<script setup>
import { reactive } from 'vue'

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
  cancel = () => {
    alert('cancel')
    modal.show = false
  }
</script>
```
