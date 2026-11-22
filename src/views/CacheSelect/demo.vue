<template>
  <Card title="CacheSelect" class="block">
    <Space>
      <VupdCacheSelect
        v-model="selectModel"
        v-model:list="selectList"
        :method="getList"
        filterable
        all
        style="width: 200px"
        @on-change="$Message.info($event || '')"
        @load="(e: any) => console.log(e)">
      </VupdCacheSelect>
      <VupdCacheSelect :model-value="selectModel" :list="selectList" textMode></VupdCacheSelect>
      <VupdCacheSelect
        v-model:list="selectList"
        v-model="selectModel"
        :method="getList"
        filterable
        style="width: 220px"
        @load="(e: any) => console.log(e)">
      </VupdCacheSelect>
      值：{{ selectModel }}
    </Space>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VupdCacheSelect } from '@/index'
import type { Obj } from '@/type'

const selectModel = ref(''),
  selectList = ref([])

const list: Obj[] = []
for (let i = 0; i < 26; i++) {
  list.push({
    value: String(i),
    label: String.fromCharCode(97 + i)
  })
}

const getList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list)
    }, 1000)
  })
}
</script>
