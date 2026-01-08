#### RemoteSelect

远程Select

```html
<template>
  <RemoteSelect
    v-model="selectModel"
    :method="getList"
    filterable
    style="width: 200px"
    @on-change="$Message.info($event)"></RemoteSelect>
</template>
<script setup>
  import { ref } from 'vue'

  const selectModel = ref(''),
    getList = () => new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {value: 'a', label: '一'}
                {value: 'b', label: '二'}
                {value: 'c', label: '三'}
            ])
        }, 2000)
    })
</script>
```

**props**  
除以下prop，可传递Select的其它prop，如filterable

```js
// v-model双向绑定选中值
modelValue: [String, Array, Number]

// 可通过v-model:list双向绑定选项列表
list: Array

// 是否多选
multiple: Boolean

// 是否将选项的value作为Option的key，默认以v-for的index作为key
valueAsKey: Boolean

// 选项对应value的key
valueKey: {
  type: String,
  default: 'value'
}

// 选项对应文本的key
labelKey: {
  type: String,
  default: 'label'
}

// 同时设置 valueKey 与 labelKey，优先级更高
keyMap: {
  type: Object,
  default(props) {
    return {
      value: props.valueKey,
      label: props.labelKey
    }
  }
}

// 查询数据的函数/方法，结果为Falsy则认为请求失败，可返回一个Promise<result>。例如使用axios.get()
method: Function

// 可通过v-model:refresh获取组件内部的查询方法
refresh: Function

// 处理 method 成功返回后的结果
process: Function

// 调用method时的参数
param: [Object, Function, String]

// 通过v-model:chosen获取选中对象
chosen: [Object, Array]

// 是否挂载后立即请求，否则在点开时请求
autoGet: Boolean

// 修改Option的label，参数分别为：当前项，当前项索引
formatLabel: Function

// 点开获取数据时根据该函数返回值确定可否发送请求
check: Function

// 是否仅显示选中项的文本
textMode: Boolean

// 修改当启用textMode时显示的文本，参数：选中项
textFormat: Function

/**
 * 关联值，该值变化后会清空绑定值与选项
 *
 * @example 当 some 变化后，<RemoteSelect>的值与选项都会清空
 * <Select v-model="some" ><Option value="1">1</Option></Select>
 * <RemoteSelect :parentCode="some" />
 */
parentCode: [String, Array, Number]

// 用于判断是否禁用每一项Option，参数：当前项，当前项索引
optionDisabled: Function

// 用于设置Option的tag，参数：当前项，当前项索引
optionTag: Function

// 手动处理获取选中项的过程，参数：{ multiple, keyMap, list, value }
getSelected: Function

// 启用则根据绑定的list判断是否需要在展开时发送请求
cache: Boolean

// 手动获取数据，此时method和param不生效
loader: Function

// 开启后则展开时仅当parentCode有效才会发送请求
strict: Boolean

// 是否使用 v-iview-select:all 增加一键全选功能，仅多选模式生效
all: {
  type: Boolean,
  default: false
}
```

**emits**  
除以下事件，可监听Select的其它事件，如on-change

```js
/**
 * 成功加载数据后触发
 * @param value 返回的列表结果，应该是数组
 */
emit('load', value)
```

##### **slots**

```js
/**
 * 选项显示的内容
 * @param item 单个选项
 * @param index 选项index
 */
default({ item, index })

/**
 * 替换<Select><Option /></Select>中的整个Option
 * @param list 选项数组
 */
dropdown( { list })

/**
 * textMode对应的文本内容
 * @param text 选中项
 */
text( { text })
```
