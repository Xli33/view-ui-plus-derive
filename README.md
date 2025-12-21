# view-ui-plus-derive

基于vue 3.5+与view-ui-plus的组件&优化扩展等，支持自定义组件名前缀  
**示例均使用无前缀的默认组件名**

## 安装

```bash
npm i view-ui-plus-derive

or

yarn add view-ui-plus-derive
```

[TOC]

### CDN引入

```html
<link rel="stylesheet" href="https://unpkg.com/view-ui-plus/dist/styles/viewuiplus.css">
<link rel="stylesheet" href="https://unpkg.com/view-ui-plus-derive/dist/umd/index.css">
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/view-ui-plus"></script>
<script src="https://unpkg.com/view-ui-plus-derive/dist/umd/index.js"></script>

<!-- <script src="https://unpkg.com/view-ui-plus-derive/dist/umd/en-US.js"></script> -->

<script>
  Vue.createApp().use(ViewUIPlus).use(iviewDerive /*,{msg: iviewDeriveENUS} */).mount('#app')
</script>
```

### 全局引入

```js
import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import iviewDerive from 'view-ui-plus-derive' // 包含所有组件与指令
import 'view-ui-plus-derive/style' // 引入所有组件样式

import App from './App.vue'

createApp(App).use(ViewUIPlus).use(iviewDerive).mount('#app')
```

#### 自定义组件名前缀

为免容易变得冗长，组件名及其样式class默认无前缀，若需要自定义，可传入prefix参数  
该参数通过全局provide提供以便访问，对应的key为 `Symbol('vupdPrefix')` ，不会与其它全局provide冲突

```js
import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import iviewDerive from 'view-ui-plus-derive' // 包含所有组件与指令

import App from './App.vue'

createApp(App)
  .use(ViewUIPlus)
  // 所有组件名前缀将被设置为 My，使用时如 <MyCombi>，<MyBaseSwitch> ...
  .use(iviewDerive, { prefix: 'My' })
  .mount('#app')
```

**此时需要再修改组件共用的less变量以适配前缀**，无需前缀时建议直接引入`view-ui-plus-derive/style`中的css  
`App.vue`

```less
<style lang="less">
// 引入组件less则必须同时引入common.less，导入后并覆盖变量@vupd-prefix为需要的前缀名称
@import 'view-ui-plus-derive/less/common.less';
@vupd-prefix: 'my';

// 导入所有组件样式
@import 'view-ui-plus-derive/less/index.less';

// 或者单独导入需要的组件样式
@import 'view-ui-plus-derive/less/Combi.less';
</style>
```

### 按需引入

```js
import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import { Combi } from 'view-ui-plus-derive'
import 'view-ui-plus-derive/styles/Combi.css' // 引入需要的组件样式

import App from './App.vue'

createApp(App).use(ViewUIPlus).component(Combi.name, Combi).mount('#app')
```

仅部分组件需要对应样式，如图
![css](./assets/import%20component%20css.png)

### 多语言

目前提供中英翻译，默认显示简体中文。在安装插件时可传入需要显示的语言，若使用vue-i18n，则只需传入vue-i18n实例

- 使用插件提供的英文翻译

```js
import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import iviewDerive from 'view-ui-plus-derive'
import enUS from 'view-ui-plus-derive/locale/en-US'

import App from './App.vue'

createApp(App)
  .use(ViewUIPlus)
  .use(iviewDerive, {
    msg: enUS
  })
  .mount('#app')
```

- 使用插件未提供的翻译

```js
import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import iviewDerive from 'view-ui-plus-derive'

import App from './App.vue'

createApp(App)
  .use(ViewUIPlus)
  .use(iviewDerive, {
    msg: {
      d: {
        lang: 'zh-Hant',
        allCheckbox: {
          title: '全選'
        },
        countRange: {
          minHolder: '最小值',
          maxHolder: '最大值'
        },
        curdTable: {
          actionText: '操作',
          addText: '新增',
          del: '刪除'
        },
        dateRange: {
          beginHolder: '開始時間',
          endHolder: '結束時間'
        },
        mCalendar: {
          mini: ['日', '一', '二', '三', '四', '五', '六'],
          short: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
          long: ['禮拜日', '禮拜一', '禮拜二', '禮拜三', '禮拜四', '禮拜五', '禮拜六']
        },
        modalFooter: {
          ok: '確定',
          cancel: '取消'
        },
        pageTable: {
          title: '列表',
          reload: '重載',
          maxmize: '最大化',
          restore: '還原'
        },
        toggleColumn: {
          title: '列',
          checkAll: '全選'
        }
      }
    }
  })
  .mount('#app')
```

- 使用vue-i18n

```js
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import ViewUIPlus from 'view-ui-plus'
import zh from 'view-ui-plus/dist/locale/zh-CN'
import en from 'view-ui-plus/dist/locale/en-US'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import iviewDerive from 'view-ui-plus-derive'
import zhCN from 'view-ui-plus-derive/locale/zh-CN'
import enUS from 'view-ui-plus-derive/locale/en-US'

import App from './App.vue'

// 需要时可手动修改语言主要key，并在安装插件时传入参数msgPrefix，如 {msgPrefix: 'someKey'}
// zhCN.someKey = zhCN.d
// delete zhCN.d
// enUS.someKey = enUS.d
// delete enUS.d

const i18n = createI18n({
  allowComposition: true,
  // globalInjection: true,
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      ...zh,
      ...zhCN
    },
    'en-US': {
      ...en,
      ...enUS
    }
  }
})

createApp(App)
  .use(i18n)
  .use(ViewUIPlus)
  .use(iviewDerive, {
    i18n
    // msgPrefix: 'someKey' // 该值仅针对使用vue-i18n的情况生效
  })
  .mount('#app')
```

### 更多优化

- 为多选模式的iview Select添加全选功能。**若全局安装了插件则无需再次注册指令**

```js
// 全局注册
import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import { iviewSelect } from "view-ui-plus-derive"
import App from './App.vue'

createApp(App).use(ViewUIPlus).directive('iviewSelect', iviewSelect).mount('#app')

// 局部注册
<script setup>
import { iviewSelect as vIviewSelect } from "view-ui-plus-derive";
</script>

// 使用
<Select v-iview-select:all="true" multiple></Select>
```

- 调整iview的InputNumber默认值为null，避免在值为undefined时显示 1
- 为InputNumber添加prop：unset，用于设置在清空时的默认值

```js
import 'view-ui-plus-derive/iview-mods/input-number'
```

- 修复iview Select启用filterable时在过滤后可能只显示之前所选项的bug

```js
import 'view-ui-plus-derive/iview-mods/select'
```

- 修复Table在某些情况下表头/固定列与内容错位

```js
import 'view-ui-plus-derive/iview-mods/table'
```

也可以一次性引入iview-mods下的input-number、select、table

```js
// 本地引入
import 'view-ui-plus-derive/iview-mod'
```

```html
<!-- CDN引入 -->
<script src="https://unpkg.com/view-ui-plus-derive/dist/umd/iview-mod.js"></script>
```

针对iview组件的样式优化

- 修复带有固定列的Table存在水平滚动条时，固定列下方的滚动条无法点中
- 防止Select在关闭选项时可能出现的点击更换选项bug
- 适当调整Input、InputNumber、Select、Button在禁用状态下非placeholder的文本颜色

```js
// 本地引入
import 'view-ui-plus-derive/iview-mod.css'
```

```html
<!-- CDN引入 -->
<link rel="stylesheet" href="https://unpkg.com/view-ui-plus-derive/dist/iview-mod.css">
```

### 组件

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

#### CacheSelect

避免重复调用远程接口的RemoteSelect，同一个cacheId对应只触发一次请求

```html
<template>
  <CacheSelect
    v-model="selectModel"
    :method="getList"
    style="width: 200px"
    @on-change="$Message.info($event)"></CacheSelect>
  <CacheSelect
    v-model="selectModel"
    :method="getList"
    style="width: 200px"
    @on-change="$Message.info($event)"></CacheSelect>
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
            })
        }, 2000)
</script>
```

**props**  
除以下prop，可传递RemoteSelect与Select的其它prop

```js
// v-model双向绑定选中值
modelValue: [String, Array, Number]

// 缓存的唯一键，当页面上同时用到多个不同数据源的CacheSelect时需传入不同值
cacheId: {
  type: String,
  default: 'list'
}
```

**emits**  
除以下事件，可监听RemoteSelect与Select的其它事件

```js
/**
 * 更改选中项时触发
 * @param value 当前选中项
 */
emit('change', value)
```

**slots**  
同RemoteSelect [slots](#slots)

#### Combi

类似iview Input[append prepend]的组合框

```jsx
<template>
  <Combi>
    <template #prepend>
      <Select clearable style="width: 4em">
        <Option value="111">111</Option>
        <Option value="222">222</Option>
      </Select>
    </template>
    <Select clearable>
      <Option value="2">2</Option>
    </Select>
    <template #append>
      <Icon type="md-arrow-dropright-circle" />
    </template>
  </Combi>
</template>
```

**props**

```js
// 前置文本
prepend: String
// 后置文本
append: String
```

**slots**

```js
default()
// 前置内容
prepend()
// 后置内容
append()
```

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

#### DateRangePicker

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

#### MCalendar

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

#### ModalFooter

代替Modal自带的底栏部分，按钮易于控制，自定义度更高

```jsx
<template>
  <Button @click="modal.show = true">show Modal</Button>
  <Modal v-model="modal.show" title="modal footer">
    <h1>modal content</h1>
    <template #footer>
      <ModalFooter
        v-model="modal.show"
        :ok-loading="modal.loading"
        @ok="confirm"
        @cancel="cancel"></ModalFooter>
    </template>
  </Modal>
</template>
<script setup>
  import { reactive } from 'vue'

  const modal = reactive({
      show: false,
      loading: false
    }),
    confirm = () => {
      modal.loading = true
      setTimeout(() => {
        modal.show = false
        setTimeout(() => {
          modal.loading = false
        }, 200)
      }, 2000)
    },
    cancel = () => {
      alert('cancel')
      modal.show = false
    }
</script>
```

**props**

```js
// 双向绑定Modal的modelValue
modelValue: Boolean

// 确定按钮文本
okText: String

// 确定按钮禁用状态
okDisabled: Boolean

// 确定按钮加载状态
okLoading: Boolean

// 传递给确定按钮的props
ok: Object

// 取消按钮文本
cancelText: String

// 取消按钮加载状态
cancelLoading: Boolean

// 取消按钮禁用状态
cancelDisabled: Boolean

// 传递给取消按钮的props
cancel: Object

// 取消按钮type，默认 text
cancelType: {
  type: String,
  default: 'text'
}

// 是否把取消按钮放到确定按钮右边
rightCancel: Boolean

// 是否显示确定按钮
hasOk: {
  type: Boolean,
  default: true
}
```

**emits**

```js
// 点击确定按钮触发
emit('ok')

// 点击取消按钮触发。未监听该事件时会直接关闭Modal
emit('cancel')
```

**slots**

```js
// 显示在右下角按钮旁边的内容
other()
// 显示在底栏左侧的内容
action()
```

#### PageTable

远程分页/本地分页的Table

```html
<template>
  <Button :loading="pageTable.loading" @click="search">查询</Button>
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

#### ToggleColumn

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

## License

MIT
