#### CountRange

数值范围组件

```html
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

**props**

```js
// v-model:begin双向绑定最小值
begin: {
  type: Number,
  default: null
}

// v-model:end双向绑定最大值
end: {
  type: Number,
  default: null
}

// 允许的最小值，默认0
min: {
  type: Number,
  default: 0
}

// 允许的最大值，默认9999999999
max: {
  type: Number,
  default: 9999999999
}

// 禁用整个组件
disabled: Boolean

// 禁用最小值
minDisabled: Boolean

// 禁用最大值
maxDisabled: Boolean

// 最小值组件class
minClass: [String, Array, Object]

// 最大值组件class
maxClass: [String, Array, Object]

// 最小值占位文本
minHolder: String

// 最大值占位文本
maxHolder: String

// 传递给最小值组件的props
minAttr: Object

// 传递给最大值组件的props
maxAttr: Object

// 中间连接部分class
joinerClass: [String, Object]

// 是否隐藏连接部分
hideJoiner: Boolean

// 以下为InputNumber的同名prop
controlsOutside: Boolean
step: Number
readonly: Boolean
editable: {
  type: Boolean,
  default: true
}
precision: Number
formatter: Function
parser: Function
activeChange: {
  type: Boolean,
  default: true
}
```

**emits**

```js
/**
 * 最小值变化后触发
 * @param value 最小值
 */
emit('change-min', value)

/**
 * 最大值变化后触发
 * @param value 最大值
 */
emit('change-max', value)

/**
 * 任一值变化后触发
 * @param begin 最小值
 * @param end 最大值
 * @param isMax 是否修改的最大值
 */
emit('change', begin, end, isMax)
```
