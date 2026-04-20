<template>
  <Card title="AllCheckbox" class="block">
    <AllCheckbox v-model="allCheckeds" v-model:all="allCheck" :list="allCheckedList"></AllCheckbox>
    <AllCheckbox v-model="allCheckeds" :list="allCheckedList">
      <template #default="{ item }">
        <DD>
          <del>{{ item }}</del>
        </DD>
      </template>
      <!-- <DD #default="item">{{ item }}</DD> -->
    </AllCheckbox>
    <p>
      值：{{ allCheckeds }} <span class="ivu-ml-16">whole: {{ allCheck }}</span>
    </p>
  </Card>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { AllCheckbox } from '@/index'
import DD from './DD'

const allCheckeds = shallowRef(['1', '3']),
  allCheck = ref(),
  allCheckedList = Object.entries({
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日'
  })
</script>
