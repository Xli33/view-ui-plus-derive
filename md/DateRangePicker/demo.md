#### 基本用法

```vue
<template>
  <DateRangePicker v-model:begin="rangeBegin" v-model:end="rangeEnd"></DateRangePicker>
</template>
<script setup>
import { ref } from 'vue'

const rangeBegin = ref(''),
  rangeEnd = ref('')
</script>
```
