#### BaseSwitch

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

**props**  
除以下prop，可传递Switch的其它prop

```js
// v-model双向绑定值
modelValue: [String, Number, Boolean]

// 打开状态对应值，默认 'T'
trueValue: {
  type: [String, Number, Boolean],
  default: 'T'
}

// 关闭状态对应值，默认 'F'
falseValue: {
  type: [String, Number, Boolean],
  default: 'F'
}

// 打开状态对应文本
trueLabel: String

// 关闭状态对应文本
falseLabel: String
```

**emits**  
除以下事件，可监听Switch的其它事件

```js
/**
 * 切换状态时触发
 * @param value 当前状态
 */
emit('change', value)
```

**slots**

```js
// 打开状态对应文本
open()
// 关闭状态对应文本
close()
```
