<template>
  <h3>使用en-US</h3>
  <VupdConfigProvider :locale="enMsg">
    <VupdAllCheckbox v-model="allCheckeds" :list="allCheckedList"></VupdAllCheckbox>
  </VupdConfigProvider>

  <h3>使用繁体中文</h3>
  <VupdConfigProvider :locale="zhTradMsg">
    <VupdAllCheckbox v-model="allCheckeds" :list="allCheckedList"></VupdAllCheckbox>
    <VupdMCalendar week-type="short" style="--epd-mcalendar-cell-height: 40px"></VupdMCalendar>
  </VupdConfigProvider>

  <h3>跟随全局语言切换</h3>
  <VupdAllCheckbox v-model="allCheckeds" :list="allCheckedList"></VupdAllCheckbox>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { VupdConfigProvider, VupdAllCheckbox, VupdMCalendar } from '@/index'

const enMsg = {
  allCheckbox: {
    title: 'Select All'
  }
}

const zhTradMsg = {
  allCheckbox: {
    title: '全選'
  },
  mCalendar: {
    // mini: ['日', '一', '二', '三', '四', '五', '六'],
    short: ['週日', '週一', '週二', '週三', '週四', '週五', '週六']
    // long: ['禮拜日', '禮拜一', '禮拜二', '禮拜三', '禮拜四', '禮拜五', '禮拜六']
  }
}

const allCheckeds = shallowRef([]),
  allCheckedList = Object.entries({
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7'
  })
</script>
