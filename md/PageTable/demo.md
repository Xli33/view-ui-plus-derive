#### 基本用法

```vue
<template>
  <Button :loading="pageTable.loading" class="ivu-mb-8" @click="search">查询</Button>
  <PageTable
    ref="pageTableRef"
    v-model:selection="pageTable.selection"
    v-model:loading="pageTable.loading"
    :columns="pageTable.columns"
    :method="getList"
    page-key="current"
    size-key="size"
    data-key="list"
    total-key="total"
    use-page-num
    :max-height="400"
    show-header
    border
    stripe>
    <template #num="{ column }">{{ column.title }}</template>
  </PageTable>
</template>
<script setup>
import { shallowReactive, useTemplateRef } from 'vue'

const refPageTable = useTemplateRef('pageTableRef')
const pageTable = shallowReactive({
  loading: false,
  selection: [],
  columns: [
    {
      title: 'num',
      key: 'num'
    },
    {
      title: 'date',
      key: 'date'
    },
    {
      title: 'time',
      key: 'time'
    }
  ]
})
function search() {
  refPageTable.value.search()
}
function getList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ress: new Array(30).fill(0).map((e, i) => ({ num: i, date: '1010', time: '----' })),
        total: 30
      })
    }, 2000)
  })
}
</script>
```
