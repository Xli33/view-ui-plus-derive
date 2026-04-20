<template>
  <Card title="ModalFooter" class="block">
    <Button @click="modal.show = true">show Modal</Button>
    <Modal
      v-model="modal.show"
      title="modal footer"
      :closable="!modal.loading"
      :mask-closable="!modal.loading"
      :before-close="cancel">
      <Table></Table>
      <template #footer>
        <ModalFooter
          v-model="modal.show"
          :ok-loading="modal.loading"
          :cancel-disabled="modal.loading"
          @ok="confirm"
          @cancel="cancel">
        </ModalFooter>
      </template>
    </Modal>
  </Card>
</template>

<script setup lang="ts">
import { shallowReactive } from 'vue'
import { Modal } from 'view-ui-plus'
import { ModalFooter } from '@/index'

const modal = shallowReactive({
  show: false,
  loading: false
})

const confirm = () => {
  modal.loading = true
  setTimeout(() => {
    modal.show = false
    setTimeout(() => {
      modal.loading = false
    }, 200)
  }, 1000)
}

const cancel = () =>
  new Promise<void>((resolve, reject) => {
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
