<template>
  <Card title="CountRange" class="block">
    <Space>
      <CountRange
        v-model:begin="minNum"
        v-model:end="maxNum"
        @change-min="(v: number) => console.log(v)"></CountRange>
      <CountRange
        v-model:begin="minNum"
        v-model:end="maxNum"
        @change="(...e: []) => console.log(e)"></CountRange>
      range: {{ minNum }} ~ {{ maxNum }}
    </Space>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CountRange } from '@/index'

const minNum = ref(),
  maxNum = ref()
</script>
