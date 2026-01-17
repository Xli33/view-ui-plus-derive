## CountRange

数值范围组件

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

## props

`begin` _Number_ （default `null`）  
v-model:begin双向绑定最小值

`end` _Number_ （default `null`）  
v-model:end双向绑定最大值

`min` _Number_ （default `0`）  
允许的最小值

`max` _Number_ （default `9999999999`）  
允许的最大值

`disabled` _Boolean_  
禁用整个组件

`min-disabled` _Boolean_  
禁用最小值

`max-disabled` _Boolean_  
禁用最大值

`min-class` _String | Array | Object_  
最小值组件class

`max-class` _String | Array | Object_  
最大值组件class

`min-holder` _String_  
最小值占位文本

`max-holder` _String_  
最大值占位文本

`min-attr` _Object_  
传递给最小值组件的props

`max-attr` _Object_  
传递给最大值组件的props

`joiner-class` _String | Object_  
中间连接部分class

`hide-joiner` _Boolean_  
是否隐藏连接部分

以下为InputNumber的同名prop

`controls-outside` _Boolean_

`step` _Number_

`readonly` _Boolean_

`editable` _Boolean_ （default `true`）

`precision` _Number_

`formatter` _Function_

`parser` _Function_

`active-change` _Boolean_ （default `true`）

## emits

`change-min` (value)  
最小值变化后触发。`value`：最小值

`change-max` (value)  
最大值变化后触发。`value`：最大值

`change` (begin, end, isMax)  
任一值变化后触发。`begin`：最小值，`end`：最大值，`isMax`：是否修改的最大值
