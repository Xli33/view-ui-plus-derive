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
