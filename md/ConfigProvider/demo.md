#### 基本用法

```vue
<template>
  <VupdConfigProvider :locale="zhTradMsg">
    <VupdAllCheckbox></VupdAllCheckbox>
    <VupdMCalendar week-type="short"></VupdMCalendar>
  </VupdConfigProvider>
</template>
<script setup>
const zhTradMsg = {
  allCheckbox: {
    title: '全選'
  },
  mCalendar: {
    // mini: ['日', '一', '二', '三', '四', '五', '六'],
    short: ['週日', '週一', '週二', '週三', '週四', '週五', '週六']
    // long: ['禮拜日', '禮拜一', '禮拜二', '禮拜三', '禮拜四', '禮拜五', '禮拜六']
  }
}
</script>
```
