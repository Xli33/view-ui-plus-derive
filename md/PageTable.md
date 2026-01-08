# PageTable

远程分页/本地分页的Table

```html
<template>
  <button :loading="pageTable.loading" @click="search">查询</button>
  <PageTable
    ref="pageTableRef"
    v-model:selection="pageTable.selection"
    v-model:loading="pageTable.loading"
    :columns="pageTable.columns"
    :method="getList"
    page-key="current"
    size-key="size"
    data-key="list"
    total-key="total"
    use-page-num
    :max-height="400"
    show-header
    border
    stripe>
    <template #num="{ column }">{{ column.title }}</template>
  </PageTable>
</template>
<script setup>
  import { shallowReactive, useTemplateRef } from 'vue'

  const refPageTable = useTemplateRef('pageTableRef')
  const pageTable = shallowReactive({
    loading: false,
    selection: [],
    columns: [
      {
        title: 'num',
        key: 'num'
      },
      {
        title: 'date',
        key: 'date'
      },
      {
        title: 'time',
        key: 'time'
      }
    ]
  })
  function search() {
    refPageTable.value.search()
  }
  function getList() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ress: new Array(30).fill(0).map((e, i) => ({ num: i, date: '1010', time: '----' })),
          total: 30
        })
      })
    })
  }
</script>
```

**props**  
除以下prop，可传递Table的其它prop

```js
// Table的columns
columns: {
  type: Array,
  default: () => []
}

// v-model绑定Table的data
modelValue: {
  type: Array as PropType<Obj[]>,
  default: () => []
}

/**
 * 远程请求方法
 * @example
 * const getResult = () => axios.get('').then(res => res.data)
 * <PageTable :method="getResult" />
 */
method: Function

// 调用 method 时传入的参数或者返回参数的函数
param: [Object, Function]

/**
 * 返回值中对应的列表数据key
 * @example 如返回结构是 { result: [1,2,3], total: 100 }，则dataKey='result'
 */
dataKey: String

/**
 * 返回值中对应的分页总条数key *
 * @example 如返回结构是 { result: [1,2,3], total: 100 }，则totalKey='total'
 */
totalKey: String

/**
 * 请求时传递的分页参数中 first 对应 key
 * 后端分页一般要求指定起始数据索引或者“页码”，以及获取多少条数据
 * @example
 * 如后端接口给定的分页参数是 firstIndex 对应起始索引
 * pageKey='firstIndex'
 */
pageKey: String

/**
 * 请求时传递的分页参数中 size 对应 key
 * 后端分页一般要求指定起始数据索引或者“页码”，以及获取多少条数据
 * @example
 * 如后端接口给定的分页参数是 amount 对应需要获取的条数
 * sizeKey='amount'
 */
sizeKey: String

// 对象形式传递分页参数映射
pageMap: {
  type: Object,
  default(props) {
    return {
      first: props.pageKey,
      pageSize: props.sizeKey
    }
  }
}

// 处理接口返回列表数据的函数
process: Function

// 是否本地分页
isLocal: Boolean

// 分页条数选项
pageSizeOpts: {
  type: Array,
  default: () => [30, 50, 100, 200]
}

// 查询失败时不清除之前获取到的结果
autoRemain: Boolean

/**
 * 计算Table的maxHeight时，Table距离视口底部的距离
 * @default 80
 */
bottomDis: {
  type: [Number, String],
  default: 80
}

border: Boolean

// v-model:selection获取勾选项
selection: Array

// 初始分页条数
initSize: Number

// 远程查询时额外检测的方法，返回Falsy则不进行搜索
check: Function

// 查询时是否用页码而不是用当页第一条的索引
usePageNum: Boolean

// 是否点击行即更改Checkbox状态
clickToCheck: Boolean

// 获取的勾选项是否去除_checked等内部属性
pure: Boolean

// head title
title: String

// 是否显示带有功能项的header
showHeader: Boolean

// 内部使用的Tooltip等iview组件的transfer
transfer: {
  type: Boolean,
  default: true
}

// 最大化时是否全屏
fullscreen: Boolean

// 传至ToggleColumn组件的storeAt
storeAt: String

// 自动设置Table的maxHeight
autoMaxHeight: {
  type: Boolean,
  default: true
}

// Table的maxHeight
maxHeight: [Number, String]

// Table的height
height: [Number, String]

// 自动设置Table的height
autoHeight: Boolean

// 最大化时自动计算哪种高度
maximizeHeightType: {
  type: String as PropType<'height' | 'maxHeight'>,
  default: 'maxHeight'
}
```

**emits**  
除以下事件，可监听Table的其它事件

```js
/**
 * 成功加载列表后触发
 * @param res 获取到的结果
 */
emit('load', res)

/**
 * 点击刷新图标触发，仅本地分页时生效
 */
emit('reload')

/**
 * 勾选项变更后触发
 * @param selections 勾选项
 */
emit('selection-change', selections)

/**
 * 更改全选框后触发
 * @param selections 勾选项
 */
emit('select-all', selections)

/**
 * 更改单个选项框触发
 * @param row 单个勾选项
 * @param checked 选中状态
 */
emit('select', row, checked)

/**
 * 内部组件切换列后触发
 * @param checked 切换的列
 */
emit('change-col', checked)

/**
 * 切换最大化后触发
 * @param maximized 是否最大化
 */
emit('maximize-change', maximized)
```

**slots**

```js
// 左上角的标题
title()
// 右上角功能区
headerAction()
// Table的header
header()
// Table的footer
footer()

// 传给Table的动态slot，需要列配置中指定slot
e.g.
[
    {
        title: '名称',
        key: 'name',
        slot: 'name'
    }
]
则可使用 <template #name="{row, index}"></template>
```
