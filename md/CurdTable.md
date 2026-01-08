#### CurdTable

具有增删功能的Table

```html
<template>
  <CurdTable
    v-model="table.list"
    :columns="table.columns"
    size="small"
    :action-width="130"
    :add-row="table.add">
    <template #num="{ row, index }">
      <Input v-model.trim="table.list[index].num"></Input>
    </template>
    <template #moreAction="{ row }">
      <Button size="small" class="ivu-mr-8">查看</Button>
    </template>
  </CurdTable>
</template>
<script setup>
  const table = {
    columns: [
        {
            title: 'emoji',
            key: 'emoji',
            type: 'selection'
        },
        {
            title: 'exp',
            key: 'exp'
        },
        {
            title: 'num',
            key: 'num',
            slot: 'num',
            renderHeader: (h, { column }) => (
                <>
                    {column.title}
                    <input value={column.title} onInput={(e) => column.title = e.target.value} />
                </>
            )
        },
        {
            title: 'time',
            key: 'time'
        }
    ],
    list: [
        {
            emoji: '😶‍🌫️🤨😐',
            exp: 'ԅ(¯﹃¯ԅ)',
            num: Math.random(),
            time: new Date().toLocaleString()
        },
        {
            emoji: '😠😪',
            exp: 'ヾ(•ω•`)o',
            num: Math.random(),
            time: new Date().toLocaleString()
        }
    ],
    add: () => [
        {
            emoji: ' 😏🤤',
            exp: 'Σ(っ °Д °;)っ',
            num: Math.random(),
            time: new Date().toLocaleString()
        }
    ]
  }
</script>
```

**props**

```js
// v-model双向绑定列表数据
modelValue: {
  type: Array,
  default: () => []
}

// iview Table columns
columns: {
  type: Array,
  default: () => []
}

// 隐藏控制列
disabled: Boolean

// 可否增加数据，默认true
addable: {
  type: Boolean,
  default: true
}

// 控制列宽度，默认90px
actionWidth: {
  type: Number,
  default: 90
}

// 控制列水平对齐，默认居中
actionAlign: {
  type: String,
  default: 'center'
}

// 控制列是否固定
actionFixed: String

// 控制列表头文本
actionText: String

// 右侧控制列
actionCol: {
  type: Object,
  default(props) {
    return {
      slot: 'action',
      width: props.actionWidth,
      align: props.actionAlign,
      fixed: props.actionFixed
    }
  }
}

// 新增行时需要添加的数据
addRow: {
  type: Function,
  default: () => []
}

// Table的border
border: Boolean
// Table的size
size: String

// 返回Promise以决定何时新增数据
beforeAdd: Function

// 返回Promise以决定何时删除数据
beforeRemove: Function

// 新增按钮type
addBtnType: {
  type: String,
  default: 'dashed'
}
// 新增按钮size
addBtnSize: String

// 新增按钮的ghost
addBtnGhost: {
  type: Boolean,
  default: false
}

// 新增按钮的disabled
addBtnDisabled: {
  type: Boolean,
  default(props) {
    return !props.addable
  }
}

// 传给新增Button的prop
addBtn: Object

// 删除按钮type
delBtnType: {
  type: String,
  default: 'warning'
}

// 删除按钮size
delBtnSize: {
  type: String,
  default: 'small'
}

// 删除按钮的ghost
delBtnGhost: {
  type: Boolean,
  default: true
}

// 传给删除按钮的prop
delBtn: Object

// 新增按钮文本
addText: String

// 是否隐藏每行的删除按钮，通过函数返回值决定
hideDelBtn: Function

// 是否禁用每行删除按钮，通过函数返回值决定
delBtnDisabled: {
  type: Function,
  default() {
    return false
  }
}
```

**emits**

```js
/**
 * 新增后触发
 * @param row 新增的行
 */
emit('add', row)

/**
 * 删除后触发
 * @param row 删除的行
 */
emit('remove', row)

/**
 * 增加或删除后触发
 * @param isAdd 是否新增了数据
 */
emit('change', isAdd)
```

**slots**

```js
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

/**
 * 每行删除按钮旁的更多内容
 * @param row 行
 * @param index
 */
moreAction({ row, index })
```
