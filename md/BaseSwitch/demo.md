#### 基本用法

```vue
<template>
  <VupdBaseSwitch v-model="toggle" true-label="开" false-label="关"></VupdBaseSwitch>
</template>
<script setup>
import { ref } from 'vue'

const toggle = ref('T')
</script>
```
