# MCalendar

月度日历组件

```html
<template>
  <MCalendar v-model:range="calendar.range" :date="calendar.date" has-range>
    <template #cell="{ day }"> <Badge status="success"></Badge>{{ day._text }} </template>
  </MCalendar>
</template>
<script setup>
  import { shallowReactive } from 'vue'

  const caledar = shallowReactive({
    range: [
      { _date: new Date(Date.now() - 86400000 * 7) },
      { _date: new Date(Date.now() - 86400000) }
    ],
    date: new Date('2000-01-01')
  })
</script>
```

**props**

```js
// 指定日期，默认显示该日期所在月份
date: Date
/**
 * 传入的额外日期数据
 * 组件始终展示一段日期，但业务上有时需要根据返回的一组日期进行渲染，如 [{date:'2000-01-01',xxx:false},{date:'2000-01-02',xxx:true}]
 */
dates: Array

// 周起始日，默认星期一
startDay: {
  type: Number,
  default: 1
}

/**
 * 休息日，默认周六周日
 * @example [5,6] 休息日变为周五周六
 */
offDay: {
  type: Array,
  default: () => [6, 0]
}

// 传入dates里日期值对应的key，默认“date”
dateKey: {
  type: String,
  default: 'date'
}

// 单元格标题class
titleClass: Function

// 每一天单元格class
dateClass: Function

// 加载状态
loading: Boolean

// 单元格日期[格式](https://day.js.org/docs/en/display/format)，默认 YYYY-MM-DD
textFormat: {
  type: String,
  default: 'YYYY-MM-DD'
}

// 是否将指定date放在第一行，而不是按传统模式将每月1号放在第一行，此时可能不会显示完整的单一月份
isOnFirstLine: Boolean

// 是否开启范围选择
hasRange: Boolean

// 非当前有效时间范围内的日期是否可被选入范围
outerInRange: Boolean

// 选择一个范围后，再选择时是否先将已选范围清除，即是否可清除已选范围
clearable: {
  type: Boolean,
  default: true
}

/**
 * 已选范围
 * @example [{_date: '2020-01-01'}, {_date: new Date('2020-01-10')}]
 */
range: Array

/**
 * 周标题内容类型，可选mini、short、long
 * @example
 * weekType=mini 对应显示成 一、二、三。。。
 * weekType=short对应显示成 周一、周二、周三。。。
 * weekType=long 对应显示成 星期一、星期二、星期三。。。
 */
weekType: {
  type: String,
  default: 'mini'
}

/**
 * 周一到周日对应的映射，若传入有效对象则以该对象的key显示星期标题
 * @example
 * 周六周日标题会分别显示成 “星期6” 和 “星期天”，忽略对应的翻译文本
 * :weekMap={0: '星期天', 6: '星期6'}   *
 */
weekMap: Object
```

**emits**

```js
/**
 * 点击日期单元格触发
 * @param item 点中日期单元
 * @param index
 */
emit('click-day', item, index)

/**
 * 选择范围后触发
 * @param begin：范围开始，end：范围结束
 * @param ranged 包含起止范围的所有日期
 */
emit('select-range', [begin, end], ranged)

/**
 * 双击日期单元格触发
 * @param item 点中日期单元
 * @param index
 */
emit('dblclick-day', item, index)
```

**slots**

```js
/**
 * 单元格内容
 * @param item 单个日期
 * @param index
 */
cell({ item, index })
```
