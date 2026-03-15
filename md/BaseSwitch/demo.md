#### 基本用法

```vue
<template>
  <BaseSwitch v-model="toggle" true-label="开" false-label="关"></BaseSwitch>
</template>
<script setup>
import { ref } from 'vue'

const toggle = ref('T')
</script>
```
