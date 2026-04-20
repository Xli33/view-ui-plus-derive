<template>
  <Card title="PageTable" class="block">
    <Row align="bottom" :gutter="10">
      <Col span="12">
        <PageTable
          ref="pageTableRef"
          v-model:selection="pageTable.selection"
          v-model:loading="pageTable.loading"
          :columns="table.columns"
          :method="getPageList"
          data-key="ress"
          total-key="total"
          click-to-check
          :max-height="400"
          show-header
          border
          stripe>
          <template #num="{ column }">
            {{ column.title }}
          </template>
        </PageTable>
      </Col>
      <Col span="12">
        <PageTable
          v-model="pageTable.list"
          :columns="table.columns"
          is-local
          :max-height="400"
          border
          style="margin-bottom: 15px" />
      </Col>
      <Col span="12">
        <PageTable v-model="pageTable.list" :columns="table.columns" is-local :max-height="400" />
      </Col>
      <Col span="12">
        <PageTable
          v-model="pageTable.list"
          :columns="table.columns"
          is-local
          :max-height="400"
          show-header
          fullscreen />
      </Col>
    </Row>
    <Tag v-for="(item, index) in pageTable.selection" :key="index">{{ item }}</Tag>
  </Card>
</template>

<script setup lang="ts">
import { onMounted, reactive, useTemplateRef } from 'vue'
import { PageTable } from '@/index'

const table = {
  columns: [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    {
      title: 'num',
      key: 'num',
      slot: 'num'
    },
    {
      title: 'emoji',
      key: 'emoji'
    },
    {
      title: 'exp',
      key: 'exp'
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
  ]
}

const refPageTable = useTemplateRef('pageTableRef')
const getBareTableList = () =>
  new Array(50).fill(0).map((e, i) => JSON.parse(JSON.stringify(table.list[i % 2]!)))
const pageTable = reactive({
  loading: false,
  selection: [],
  list: getBareTableList()
})

const getPageList = () =>
  new Promise((r) => {
    setTimeout(() => {
      r({
        ress: getBareTableList(),
        total: 50
      })
    }, 1000)
  })

onMounted(() => {
  refPageTable.value!.search()
})
</script>
