#### 基本用法

```vue
<template>
  <VupdCacheSelect
    v-model="selectModel"
    :method="getList"
    style="width: 200px;margin-right:10px"
    @on-change="$Message.info($event)"></VupdCacheSelect>
  <VupdCacheSelect
    v-model="selectModel"
    :method="getList"
    style="width: 200px"
    @on-change="$Message.info($event)"></VupdCacheSelect>
</template>
<script setup>
import { ref } from 'vue'

const selectModel = ref(''),
  getList = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { value: 'a', label: '一' },
          { value: 'b', label: '二' },
          { value: 'c', label: '三' }
        ])
      })
    }, 2000)
</script>
```
