#### 基本用法

```vue
<template>
  <VupdCountRange
    v-model:begin="minNum"
    v-model:end="maxNum"
    @change-min="(v) => console.log(v)"></VupdCountRange>
</template>
<script setup>
import { ref } from 'vue'

const minNum = ref(),
  maxNum = ref()
</script>
```
