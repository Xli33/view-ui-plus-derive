# ToggleColumn

用于切换Table列的显示状态

```jsx
<template>
  <ToggleColumn v-model="table.columns"></ToggleColumn>
  <Table :columns="table.columns" :data="table.list"></Table>
</template>
<script setup>
  import { reactive } from 'vue'

  const table = reactive({
    list: [
      {
        year: 2000,
        date: '2000-01-01'
      },
      {
        year: 1000,
        date: '1000-01-01'
      }
    ],
    columns: [
      {
        type: 'selection',
        key: 'selection',
        width: 60,
        _switchable: false // 让该列不可被切换
      },
      {
        title: 'year',
        key: 'year'
      },
      {
        title: 'date',
        key: 'date'
      }
    ]
  })
</script>
```

**props**

```js
// v-model双向绑定Table列
modelValue: {
  type: Array
}

// 全选框文本
title: String

// 传入iview icon名则仅显示图标
icon: String

// 绑定columns对应的唯一标识，一般在v-for中绑定了固定某列且列配置中带有 _visible:false 时用到
cacheId: [String, Number]

// 是否显示全选框
all: {
  type: Boolean,
  default: true
}

// Dropdown的transfer
transfer: Boolean

/**
 * 将状态缓存至localStorage中的key，支持a.b形式
 * @example
 * // 组件会尝试将显示状态读写至 localStorage.app.main.cols
 * storeAt='app.main.cols'
 */
storeAt: String
```

**emits**

```js
/**
 * 切换列状态时触发
 * @param value 切换的列
 */
emit('change', value)
```

**slots**

```js
// 替换默认显示的Button
default()
```
