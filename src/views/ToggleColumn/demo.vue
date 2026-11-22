<template>
  <Row justify="end">
    <VupdToggleColumn v-model="table.columns" style="margin-bottom: 10px"></VupdToggleColumn>
  </Row>
  <Table :columns="table.columns" :data="table.list"> </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Table } from 'view-ui-plus'
import { VupdToggleColumn } from '@/index'

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
      prop: 'selection',
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
