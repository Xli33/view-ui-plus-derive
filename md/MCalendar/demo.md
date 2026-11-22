#### 基本用法

```vue
<template>
  <VupdMCalendar v-model:range="calendar.range" :date="calendar.date" has-range>
    <template #cell="{ day }"> <Badge status="success"></Badge>{{ day._text }} </template>
  </VupdMCalendar>
</template>
<script setup>
import { shallowReactive } from 'vue'

const calendar = shallowReactive({
  range: [
    { _date: new Date(Date.now() - 86400000 * 7) },
    { _date: new Date(Date.now() - 86400000) }
  ],
  date: new Date(Date.now() - 86400000 * 7)
})
</script>
```
