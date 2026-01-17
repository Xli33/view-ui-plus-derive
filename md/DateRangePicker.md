## DateRangePicker

基于DatePicer[type=daterange]，绑定的值转为string

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

## props

`begin` _Date | String_ （default `''`）  
v-model:begin双向绑定开始时间

`end` _Date | String_ （default `''`）  
v-model:end双向绑定结束时间

`type` _String_ （default `'daterange'`）  
可选的日期类型：daterange | datetimerange

`limit-begin` _Boolean_ （default `true`）  
是否默认限制开始时间

`disable-today` _Boolean_  
是否禁止选择今天

`value-format` _String_ （default `'YYYY-MM-DD'`）  
用于格式化绑定时间

以下为DatePicker的同名prop

`options` _Object_

`clearable` _Boolean_ （default `true`）

`split-panels` _Boolean_

`transfer` _Boolean_

`placeholder` _String_

`disabled` _Boolean_

`placement` _String_

## emits

`change` (dates, type)  
修改时触发。`dates`：开始结束时间组成的数组，`type`：当前日期类型 daterange | datetimerange
