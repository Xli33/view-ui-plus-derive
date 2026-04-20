<template>
  <Card title="DateRangePicker" class="block">
    <Space>
      <DateRangePicker v-model:begin="rangeBegin" v-model:end="rangeEnd"></DateRangePicker>
      <DateRangePicker
        v-model:begin="rangeBegin"
        v-model:end="rangeEnd"
        type="datetimerange"
        style="width: 320px">
      </DateRangePicker>
      {{ rangeBegin }} ~ {{ rangeEnd }}
    </Space>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DateRangePicker } from '@/index'

const rangeBegin = ref(''),
  rangeEnd = ref('')
</script>
