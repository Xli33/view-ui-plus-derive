# Combi

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

## props

`prepend` _String_  
前置文本

`append` _String_  
后置文本

## slots

`default()`

`prepend()`  
前置内容

`append()`  
后置内容
