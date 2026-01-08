# ModalFooter

代替Modal自带的底栏部分，按钮易于控制，自定义度更高

```jsx
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

**props**

```js
// 双向绑定Modal的modelValue
modelValue: Boolean

// 确定按钮文本
okText: String

// 确定按钮禁用状态
okDisabled: Boolean

// 确定按钮加载状态
okLoading: Boolean

// 传递给确定按钮的props
ok: Object

// 取消按钮文本
cancelText: String

// 取消按钮加载状态
cancelLoading: Boolean

// 取消按钮禁用状态
cancelDisabled: Boolean

// 传递给取消按钮的props
cancel: Object

// 取消按钮type，默认 text
cancelType: {
  type: String,
  default: 'text'
}

// 是否把取消按钮放到确定按钮右边
rightCancel: Boolean

// 是否显示确定按钮
hasOk: {
  type: Boolean,
  default: true
}
```

**emits**

```js
// 点击确定按钮触发
emit('ok')

// 点击取消按钮触发。未监听该事件时会直接关闭Modal
emit('cancel')
```

**slots**

```js
// 显示在右下角按钮旁边的内容
other()
// 显示在底栏左侧的内容
action()
```
