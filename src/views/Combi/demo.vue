<template>
  <Card title="Combi" class="block">
    <Space>
      <Combi prepend="begin" append="end">
        <Select clearable>
          <Option value="aaa">aaaaaaa</Option>
        </Select>
      </Combi>
      <Combi>
        <template #append>
          <Button icon="md-add"></Button>
        </template>
        <Select clearable>
          <Option value="sss">sssssss</Option>
        </Select>
      </Combi>
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
      <InputNumber :unset="5"></InputNumber>
    </Space>
  </Card>
</template>

<script setup lang="ts">
import { Combi } from '@/index'
</script>
