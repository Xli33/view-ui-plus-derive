#### AllCheckbox

提供全选功能的CheckboxGroup

```html
<template>
  <AllCheckbox v-model="checkeds" v-model:all="checkAll" :list="list"></AllCheckbox>
</template>
<script setup>
  import { ref, shallowRef } from 'vue'

  const checkeds = shallowRef(['1', '3']),
    checkAll = ref(),
    list = Object.entries({
      1: '周一',
      2: '周二',
      3: '周三',
      4: '周四',
      5: '周五',
      6: '周六',
      7: '周日'
    })
</script>
```

**props**

```js
// v-model双向绑定选中值
modelValue: Array

// 全选框显示文本，默认“全选”
title: String

// 选项数组，数组成员可以是数组或对象
list: Array

// 各选项值对应list中的value键。如list是[{v:1,k:2}]，valueKey为 v 且 labelKey为 k, 则选项绑定值为 1，显示文本是 2
valueKey: {
  type: [String, Number],
  default: 0
}

// 各选项值对应list中的label键。如list是[{v:1,k:2}]，valueKey为 v 且 labelKey为 k, 则选项绑定值为 1，显示文本是 2
labelKey: {
  type: [String, Number],
  default: 1
}

// 同时设置valueKey & labelKey，优先级相对更高
keyMap: {
  type: Object,
  default(props) {
    return {
      value: props.valueKey,
      label: props.labelKey
    }
  }
}

// 是否隐藏全选框
hideAll: Boolean

// 配合v-model:all双向绑定全选框的值，若全选中应为 true，否则 false
all: Boolean
```

**emits**

```js
/**
 * 更改checkbox时触发
 * @param value 选中值
 * @param checkAll 是否全部选中
 */
emit('change', value, checkAll)
```

**slots**

```js
/**
 * checkbox选项文本
 * @param item 数组项
 */
default({item})
```
