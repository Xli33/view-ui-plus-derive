<template>
  <Card title="BaseSwitch" class="block">
    <Space>
      <!--<Select v-model="locale" @on-change="(v: 'zh-CN') => i18n.global.locale.value = v">
        <Option value="zh-CN">中文</Option>
        <Option value="en-US">英文</Option>
      </Select> -->
      <!-- <Tag>{{ t('d.lang') }}</Tag> -->
      <Btn id="r"></Btn>
      <Btn id="qr">fff</Btn>
      <CD v-if="toggle === 'T'" :end="3600000"></CD>
      <CK v-if="toggle === 'T'"></CK>
      <BaseSwitch v-model="toggle" @change="change"></BaseSwitch>
      <BaseSwitch
        v-model="toggle"
        true-label="开"
        false-label="关"
        @on-change="$Message.info($event)"></BaseSwitch>
      <BaseSwitch v-model="toggle" true-label="打开" false-label="关闭" size="large"></BaseSwitch>
      值：{{ toggle }}
    </Space>
  </Card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { BaseSwitch } from '@/index'
import Btn from './Btn'
import CD from './CD'
import CK from './CK'

const toggle = ref('F')

const change = (val: string) => console.log('change: ' + val)
</script>
