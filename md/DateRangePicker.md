# DateRangePicker

基于DatePicer[type=daterange]，绑定的值转为string

```html
<template>
  <DateRangePicker v-model:begin="rangeBegin" v-model:end="rangeEnd"></DateRangePicker>
</template>
<script setup>
  import { ref } from 'vue'

  const rangeBegin = ref(''),
    rangeEnd = ref('')
</script>
```

**props**

```js
// v-model:begin双向绑定开始时间
begin: {
  type: [Date, String],
  default: ''
}

// v-model:end双向绑定结束时间
end: {
  type: [Date, String],
  default: ''
}
// 可选的日期类型：daterange | datetimerange
type: {
  type: String,
  default: 'daterange'
}

// 是否默认限制开始时间
limitBegin: {
  type: Boolean,
  default: true
}

// 是否禁止选择今天
disableToday: Boolean

// 用于格式化绑定时间，默认 YYYY-MM-DD
valueFormat: {
  type: String,
  default: 'YYYY-MM-DD'
}

// 以下为DatePicker的同名prop
options: Object,
clearable: {
  type: Boolean,
  default: true
},
splitPanels: Boolean,
transfer: Boolean,
placeholder: String,
disabled: Boolean,
placement: String,
```

**emits**

```js
/**
 * 修改时触发
 * @param dates 开始结束时间组成的数组
 * @param type 当前日期类型 daterange | datetimerange
 */
emit('change', dates, type)
```
