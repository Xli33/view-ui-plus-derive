#### 基本用法

```vue
<template>
  <Combi>
    <template #prepend>
      <Select clearable style="width: 6em">
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

#### 使用文本

```vue
<template>
  <Combi prepend="在前" append="在后">
    <DatePicker clearable style="width:100%"></DatePicker>
  </Combi>
</template>
<script>
export default {}
</script>
```
