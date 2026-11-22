<template>
  <Card title="DateRangePicker" class="block">
    <Space>
      <VupdDateRangePicker v-model:begin="rangeBegin" v-model:end="rangeEnd"></VupdDateRangePicker>
      <VupdDateRangePicker
        v-model:begin="rangeBegin"
        v-model:end="rangeEnd"
        type="datetimerange"
        style="width: 320px">
      </VupdDateRangePicker>
      {{ rangeBegin }} ~ {{ rangeEnd }}
    </Space>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VupdDateRangePicker } from '@/index'

const rangeBegin = ref(''),
  rangeEnd = ref('')
</script>
