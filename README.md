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
<link rel="stylesheet" href="https://unpkg.com/view-ui-plus/dist/styles/viewuiplus.css" />
<link rel="stylesheet" href="https://unpkg.com/view-ui-plus-derive/dist/umd/index.css" />
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/view-ui-plus"></script>
<script src="https://unpkg.com/view-ui-plus-derive/dist/umd/index.js"></script>

<!-- <script src="https://unpkg.com/view-ui-plus-derive/dist/umd/en-US.js"></script> -->

<script>
  Vue.createApp().use(ViewUIPlus).use(iviewDerive /*,{msg: iviewDeriveEnUs} */).mount('#app')
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

#### 自定义组件前缀

为免容易变得冗长，组件名及其样式class默认无前缀，若需要自定义，可传入prefix参数

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

### 国际化

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

### 调优

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
<link rel="stylesheet" href="https://unpkg.com/view-ui-plus-derive/dist/iview-mod.css" />
```

### 组件

[AllCheckbox](./md/AllCheckbox.md)  
提供全选功能的CheckboxGroup

[BaseSwitch](./md/BaseSwitch.md)  
更易于使用的Switch

[RemoteSelect](./md/RemoteSelect.md)  
远程Select

[CacheSelect](./md/CacheSelect.md)  
避免重复调用远程接口的RemoteSelect，同一个cacheId对应只触发一次请求

[Combi](./md/Combi.md)  
类似iview Input[append prepend]的组合框

[CountRange](./md/CountRange.md)  
数值范围组件

[CurdTable](./md/CurdTable.md)  
具有增删功能的Table

[DateRange](./md/DateRange.md)  
组合形式的日期范围组件

[DateRangePicker](./md/DateRangePicker.md)  
基于DatePicer[type=daterange]，绑定的值转为string

[MCalendar](./md/MCalendar.md)  
月度日历组件

[ModalFooter](./md/ModalFooter.md)  
代替Modal自带的底栏部分，按钮易于控制，自定义度更高

[PageTable](./md/PageTable.md)  
远程分页/本地分页的Table

[ToggleColumn](./md/ToggleColumn.md)  
用于切换Table列的显示状态

## License

MIT
