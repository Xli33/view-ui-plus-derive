<template>
  <Card title="RemoteSelect" class="block">
    <Space>
      <VupdRemoteSelect
        v-model="selectModel"
        v-model:list="selectLists"
        :method="getList"
        filterable
        clearable
        all
        style="width: 200px">
      </VupdRemoteSelect>
      <VupdRemoteSelect :model-value="selectModel" :list="selectLists" textMode></VupdRemoteSelect>
      <VupdRemoteSelect
        :method="getList"
        multiple
        all
        @on-change="$Message.info(JSON.stringify($event))"></VupdRemoteSelect>
      值：{{ selectModel }}
    </Space>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VupdRemoteSelect } from '@/index'

const selectModel = ref(''),
  selectLists = ref([])

const getList = () =>
  new Promise((r) => {
    setTimeout(() => {
      r([
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
      ])
    }, 1000)
  })
</script>
