<template>
  <Card title="CurdTable & ToggleColumn" class="block">
    <Row justify="end">
      <VupdToggleColumn
        v-for="n in 2"
        :key="n"
        v-model="columns"
        :min-visible="2"
        cache-id="app"
        store-at="app.[main.cols]"
        realtime
        class="ivu-mr-8 ivu-mb-16"></VupdToggleColumn>
    </Row>
    <Table :columns="columns" :data="table.list" border :cache-cols="tempBorder" class="ivu-mb-16">
      <template #num="{ index }">
        <Input v-model.trim="table.list[index]!.num"></Input>
      </template>
    </Table>
    <VupdCurdTable
      v-model="table.list"
      :columns="columns"
      size="small"
      :action-width="130"
      :add-row="table.add"
      :before-add="beforeAdd"
      :before-remove="beforeRemove">
      <template #num="{ index }">
        <Input v-model.trim="table.list[index]!.num"></Input>
      </template>
      <template #moreAction="{ row }">
        <Button size="small" class="ivu-mr-8">查看 {{ row.age }}</Button>
      </template>
    </VupdCurdTable>
  </Card>
</template>

<script setup lang="tsx">
import { ref, shallowRef } from 'vue'
import { VupdCurdTable, VupdToggleColumn } from '@/index'
import type { Obj } from '@/type'
import { Modal } from 'view-ui-plus'

const genCols = () => [
  {
    title: 'emoji',
    key: 'emoji',
    type: 'selection',
    resizable: true,
    _switchable: false
  },
  {
    title: 'exp',
    key: 'exp',
    resizable: true,
    minWidth: 300
  },
  {
    title: 'num',
    key: 'num',
    slot: 'num',
    resizable: true,
    // minWidth: 300,
    renderHeader: (h: any, { column }: { column: Obj }) => (
      <>
        {column.title}
        <input
          value={column.title}
          onInput={(e) => (column.title = (e.target as HTMLInputElement).value)}
        />
      </>
    )
  },
  {
    title: 'time',
    key: 'time'
    // width: 200
  }
]

const columns = shallowRef(genCols())

const tempBorder = ref({
  keys: 'app.[main.cols]',
  cols: columns
})

const table = {
  columns: genCols(),
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

function beforeAdd(done: (args?: Obj[]) => void) {
  Modal.confirm({
    title: '提示',
    content: '确定要添加吗？',
    onOk: () => {
      done()
    }
  })
}
function beforeRemove(row: Obj, index: number, done: (index: number) => void) {
  Modal.confirm({
    title: '提示',
    content: '确定要删除吗？' + index,
    onOk: () => {
      done(index)
    }
  })
}
</script>
