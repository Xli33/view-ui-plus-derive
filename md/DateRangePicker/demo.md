#### 基本用法

```vue
<template>
  <VupdDateRangePicker v-model:begin="rangeBegin" v-model:end="rangeEnd"></VupdDateRangePicker>
</template>
<script setup>
import { ref } from 'vue'

const rangeBegin = ref(''),
  rangeEnd = ref('')
</script>
```
