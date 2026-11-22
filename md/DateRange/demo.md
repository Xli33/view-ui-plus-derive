#### 基本用法

```vue
<template>
  <VupdDateRange v-model:begin="beginDate" v-model:end="endDate" clearable></VupdDateRange>
</template>
<script setup>
import { ref } from 'vue'

const beginDate = ref(''),
  endDate = ref('')
</script>
```
