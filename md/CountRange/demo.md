#### 基本用法

```vue
<template>
  <CountRange
    v-model:begin="minNum"
    v-model:end="maxNum"
    @change-min="(v) => console.log(v)"></CountRange>
</template>
<script setup>
import { ref } from 'vue'

const minNum = ref(),
  maxNum = ref()
</script>
```
