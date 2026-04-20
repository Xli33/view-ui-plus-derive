<template>
  <Card title="DateRange" class="block">
    <Space>
      <DateRange
        v-model:begin="beginDate"
        v-model:end="endDate"
        clearable
        style="width: 240px"></DateRange>
      <DateRange
        v-model:begin="beginDate"
        v-model:end="endDate"
        type="month"
        clearable
        transfer
        style="width: 220px">
      </DateRange>
      <DateRange
        v-model:begin="beginDate"
        v-model:end="endDate"
        type="year"
        clearable
        transfer
        style="width: 220px">
      </DateRange>
      <span>{{ beginDate.toLocaleString() }} ~ {{ endDate.toLocaleString() }}</span>
    </Space>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DateRange } from '@/index'

const beginDate = ref(''),
  endDate = ref('')
</script>
