<template>
  <Card title="CountRange" class="block">
    <Space>
      <VupdCountRange
        v-model:begin="minNum"
        v-model:end="maxNum"
        @change-min="(v: number) => console.log(v)"></VupdCountRange>
      <VupdCountRange
        v-model:begin="minNum"
        v-model:end="maxNum"
        @change="(...e: []) => console.log(e)"></VupdCountRange>
      range: {{ minNum }} ~ {{ maxNum }}
    </Space>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VupdCountRange } from '@/index'

const minNum = ref(),
  maxNum = ref()
</script>
