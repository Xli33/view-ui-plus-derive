## DateRange

组合形式的日期范围组件

```vue
<template>
  <DateRange
    v-model:begin="beginDate"
    v-model:end="endDate"
    clearable
    style="width: 240px"></DateRange>
</template>
<script setup>
import { ref } from 'vue'

const beginDate = ref(''),
  endDate = ref('')
</script>
```

## props

`begin` _Date | String_ （default `''`）  
v-model:begin双向绑定开始时间

`end` _Date | String_ （default `''`）  
v-model:end双向绑定结束时间

`type` _String_ （default `'date'`）  
可选的日期类型：date | month | year | datetime

`begin-disabled` _Boolean_  
禁用开始时间

`end-disabled` _Boolean_  
禁用结束时间

`auto-next` _Boolean_ （default `true`）  
是否当所选开始日期大于结束日期时自动将结束日期置为开始日期后一天

`limit-begin` _Boolean_ （default `true`）  
是否默认限制开始时间

`begin-class` _String | Array | Object_  
开始组件的class

`end-class` _String | Array | Object_  
结束组件的class

`begin-holder` _String_  
开始时间placeholder

`end-holder` _String_  
结束时间placeholder

`begin-attr` _Object_  
一次性传给开始组件的prop

`end-attr` _Object_  
一次性传给结束组件的prop

`joiner-class` _String | Object_  
中间连接符的class

`disable-today` _Boolean_  
是否禁止选择当天

`hide-joiner` _Boolean_  
是否隐藏连接符

`format` _String_  
iview DatePicer的日期格式

以下为DatePicker的同名prop

`clearable` _Boolean_

`disabled` _Boolean_

`transfer` _Boolean_

## emits

`change-begin` (begin)  
更改开始时间时触发。`begin`：开始时间

`change-end` (end)  
更改结束时间时触发。`end`：结束时间

`change` (begin, end, isEnd)  
更改时间时触发。`begin`：开始时间，`end`：结束时间，`isEnd`：是否修改的结束时间
