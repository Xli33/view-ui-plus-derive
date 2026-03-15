#### 基本用法

```vue
<template>
  <CurdTable
    v-model="table.list"
    :columns="table.columns"
    size="small"
    :action-width="130"
    :add-row="table.add">
    <template #num="{ row, index }">
      <Input v-model.trim="table.list[index].num"></Input>
    </template>
    <template #moreAction="{ row }">
      <Button size="small" class="ivu-mr-8">查看</Button>
    </template>
  </CurdTable>
</template>
<script setup lang="jsx">
const table = {
  columns: [
    {
      title: 'emoji',
      key: 'emoji',
      type: 'selection',
      width: 50
    },
    {
      title: 'exp',
      key: 'exp'
    },
    {
      title: 'num',
      key: 'num',
      slot: 'num',
      renderHeader: (h, { column }) => (
        <>
          {column.title}
          <input value={column.title} onInput={(e) => (column.title = e.target.value)} />
        </>
      )
    },
    {
      title: 'time',
      key: 'time'
    }
  ],
  list: [
    {
      emoji: '😶‍🌫️🤨😐',
      exp: 'ԅ(¯﹃¯ԅ)',
      num: Math.random(),
      time: new Date().toLocaleString()
    },
    {
      emoji: '😠😪',
      exp: 'ヾ(•ω•`)o',
      num: Math.random(),
      time: new Date().toLocaleString()
    }
  ],
  add: () => [
    {
      emoji: ' 😏🤤',
      exp: 'Σ(っ °Д °;)っ',
      num: Math.random(),
      time: new Date().toLocaleString()
    }
  ]
}
</script>
```
