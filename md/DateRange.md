#### DateRange

组合形式的日期范围组件

```html
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

// 可选的日期类型：date | month | year | datetime
type: {
  type: String,
  default: 'date'
}

// 禁用开始时间
beginDisabled: Boolean

// 禁用结束时间
endDisabled: Boolean

// 是否当所选开始日期大于结束日期时自动将结束日期置为开始日期后一天
autoNext: {
  type: Boolean,
  default: true
}

// 是否默认限制开始时间
limitBegin: {
  type: Boolean,
  default: true
}

// 开始组件的class
beginClass: [String, Array, Object]

// 结束组件的class
endClass: [String, Array, Object]

// 开始时间placeholder
beginHolder: String

// 结束时间placeholder
endHolder: String

// 一次性传给开始组件的prop
beginAttr: Object

// 一次性传给结束组件的prop
endAttr: Object

// 中间连接符的class
joinerClass: [String, Object]

// 是否禁止选择当天
disableToday: Boolean

// 是否隐藏连接符
hideJoiner: Boolean

// iview DatePicer的日期格式
format: String

// 以下为DatePicker的同名prop
clearable: Boolean
disabled: Boolean
transfer: Boolean
```

**emits**

```js
/**
 * 更改开始时间时触发
 * @param begin 开始时间
 */
emit('change-begin', begin)

/**
 * 更改结束时间时触发
 * @param end 结束时间
 */
emit('change-end', end)

/**
 * 更改时间时触发
 * @param begin 开始时间
 * @param end 结束时间
 * @param isEnd 是否修改的结束时间
 */
emit('change', begin, end, isEnd)
```
