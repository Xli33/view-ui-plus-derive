# BaseSwitch

更易于使用的Switch

```html
<template>
  <BaseSwitch v-model="toggle" true-label="开" false-label="关"></BaseSwitch>
</template>
<script setup>
  import { ref } from 'vue'

  const toggle = ref('T')
</script>
```

## props

除以下prop，可传递Switch的其它prop

`modelValue` _String | Number | Boolean_  
v-model双向绑定值

`true-value` _String | Number | Boolean_ （default `'T'`）  
打开状态对应值

`false-value` _String | Number | Boolean_ （default `'F'`）  
关闭状态对应值

`true-label` _String_  
打开状态对应文本

`false-label` _String_  
关闭状态对应文本

## emits

除以下事件，可监听Switch的其它事件

`change` (value)  
切换状态时触发。`value`：当前状态

## slots

`open()`  
打开状态对应文本

`close()`  
关闭状态对应文本
