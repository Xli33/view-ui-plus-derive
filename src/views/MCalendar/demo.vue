<template>
  <Card title="MCalendar" class="block">
    <MCalendar
      v-model:range="calendar.range"
      has-range
      class="ivu-text-left"
      @click-day="
        (...args: []) => {
          console.log('clickDay', args)
        }
      "
      @dblclick-day="(...args: []) => console.log('dblclickDay', args)"
      @select-range="(...args: []) => console.log('select-range', args)">
      <template #cell="{ day }"> <Badge status="success"></Badge>{{ day._text }} </template>
    </MCalendar>
  </Card>
</template>

<script setup lang="ts">
import { shallowReactive } from 'vue'
import { MCalendar } from '@/index'

const calendar = shallowReactive({
  range: [
    { _date: new Date(Date.now() - 86400000 * 7) },
    { _date: new Date(Date.now() - 86400000) }
  ]
})
</script>
