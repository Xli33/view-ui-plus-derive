#### 基本用法

```vue
<template>
  <ToggleColumn v-model="table.columns"></ToggleColumn>
  <Table :columns="table.columns" :data="table.list"></Table>
</template>
<script setup>
import { ref } from 'vue'

const table = ref({
  list: [
    {
      year: 2000,
      date: '2000-01-01'
    },
    {
      year: 1000,
      date: '1000-01-01'
    }
  ],
  columns: [
    {
      type: 'selection',
      key: 'selection',
      width: 60,
      _switchable: false // 让该列不可被切换
    },
    {
      title: 'year',
      key: 'year'
    },
    {
      title: 'date',
      key: 'date'
    }
  ]
})
</script>
```
