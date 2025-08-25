<template>
  <DatePicker
    v-model="dateRange"
    :type="type"
    :clearable="clearable"
    :split-panels="splitPanels"
    :options="dateOptions"
    :transfer="transfer"
    :placeholder="placeholder"
    :disabled="disabled"
    :placement="placement"
    @on-change="change">
  </DatePicker>
</template>

<script lang="ts">
// iview date-picker type=range组件

import { type PropType, computed } from 'vue'
// import { DatePicker } from 'view-ui-plus' // 待必需才启用
import dayjs from 'dayjs'

export default {
  name: 'DateRangePicker'
}
</script>

<script setup lang="ts">
type DateType = 'daterange' | 'datetimerange'

const props = defineProps({
  /**
   * 双向绑定开始时间
   */
  begin: {
    type: [Date, String],
    default: ''
  },
  /**
   * 双向绑定结束时间
   */
  end: {
    type: [Date, String],
    default: ''
  },
  /**
   * 可选的日期类型：daterange | datetimerange
   */
  type: {
    type: String as PropType<DateType>,
    default: 'daterange',
    validator(value: string) {
      return ['daterange', 'datetimerange'].includes(value)
    }
  },
  options: Object,
  clearable: {
    type: Boolean,
    default: true
  },
  splitPanels: Boolean,
  /**
   * 是否默认限制开始时间
   */
  limitBegin: {
    type: Boolean,
    default: true
  },
  /**
   * 是否禁止选择今天
   */
  disableToday: Boolean,
  transfer: Boolean,
  placeholder: String,
  disabled: Boolean,
  placement: String,
  /**
   * 用于格式化绑定时间，默认 YYYY-MM-DD
   */
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD'
  }
})

const emit = defineEmits<{
  'update:begin': [date: string]
  'update:end': [date: string]
  change: [dates: string[], type: string]
}>()

// computed

const dateOptions = computed(
  () =>
    props.options ||
    (props.limitBegin
      ? {
          disabledDate: (date: Date) =>
            date && date.valueOf() < Date.now() - (props.disableToday ? 0 : 86400000)
        }
      : null)
)

const dateRange = computed({
  get() {
    const beginDate = props.begin,
      endDate = props.end
    return beginDate && endDate ? [dayjs(beginDate).toDate(), dayjs(endDate).toDate()] : []
  },
  set(val) {
    let beginDate, endDate
    if (val[0] && val[1]) {
      beginDate = dayjs(val[0]).format(props.valueFormat)
      endDate = dayjs(val[1]).format(props.valueFormat)
    } else {
      beginDate = endDate = ''
    }
    emit('update:begin', beginDate)
    emit('update:end', endDate)
  }
})

// methods

const change = (range: string[], type: DateType) => {
  emit('change', range, type)
}
</script>
