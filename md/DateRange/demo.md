#### 基本用法

```vue
<template>
  <DateRange v-model:begin="beginDate" v-model:end="endDate" clearable></DateRange>
</template>
<script setup>
import { ref } from 'vue'

const beginDate = ref(''),
  endDate = ref('')
</script>
```
