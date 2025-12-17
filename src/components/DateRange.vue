<template>
  <div :class="useClass('date-range')">
    <DatePicker
      v-model="beginDate"
      @on-change="changeBegin"
      v-bind="beginProps"
      :type="type"></DatePicker>
    <span v-show="!hideJoiner" :class="[useClass('date-range-joiner'), joinerClass]"></span>
    <DatePicker
      v-model="endDate"
      @on-change="changeEnd"
      v-bind="endProps"
      :type="type"></DatePicker>
  </div>
</template>

<script lang="ts">
// 日期范围组件

import { type PropType, computed, getCurrentInstance, ref, watch } from 'vue'
// import { DatePicker } from 'view-ui-plus' // 待必需才启用
import { $i18n } from '@/locale/i18n'
import { useClass } from '@/util'

export default {
  name: 'DateRange'
}
</script>

<script setup lang="ts">
export type DateValue = Date | string

const dayjs = getCurrentInstance()!.appContext.config.globalProperties.$Date
const dateTypes = {
  date: 'day',
  month: 'month',
  year: 'year',
  datetime: 'day'
} as const

type DateType = keyof typeof dateTypes

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
   * 可选的日期类型：date | month | year | datetime
   */
  type: {
    type: String as PropType<DateType>,
    default: 'date'
  },
  clearable: Boolean,
  disabled: Boolean,
  transfer: Boolean,
  /**
   * 禁用开始时间
   */
  beginDisabled: Boolean,
  /**
   * 禁用结束时间
   */
  endDisabled: Boolean,
  /**
   * 是否当所选开始日期大于结束日期时自动将结束日期置为开始日期后一天
   */
  autoNext: {
    type: Boolean,
    default: true
  },
  /**
   * 是否默认限制开始时间
   */
  limitBegin: {
    type: Boolean,
    default: true
  },
  beginClass: [String, Array, Object],
  endClass: [String, Array, Object],
  /**
   * 开始时间placeholder
   */
  beginHolder: String,
  /**
   * 结束时间placeholder
   */
  endHolder: String,
  /**
   * 一次性传给开始组件的prop
   */
  beginAttr: Object,
  /**
   * 一次性传给结束组件的prop
   */
  endAttr: Object,
  /**
   * 中间连接符的class
   */
  joinerClass: [String, Object],
  /**
   * 是否禁止选择今天
   */
  disableToday: Boolean,
  /**
   * 是否隐藏连接符
   */
  hideJoiner: Boolean,
  /**
   * iview DatePicer的日期格式
   */
  format: String
})

const emit = defineEmits<{
  'update:begin': [val: DateValue]
  'update:end': [val: DateValue]
  'change-begin': [val: string]
  'change-end': [val: string]
  /**
   * 开始与结束日期更改后均会触发
   * @param isEnd 是否修改的结束日期
   */
  change: [begin: DateValue, end: DateValue, isEnd: boolean]
}>()

// data

const beginDate = ref<DateValue>(props.begin),
  endDate = ref<DateValue>(props.end)

// computed

const beginProps = computed(() => ({
  options: props.limitBegin
    ? {
        disabledDate: (date: Date) =>
          date && dayjs(date).isBefore(Date.now(), dateTypes[props.type])
        // date.valueOf() < Date.now() - (props.disableToday ? 0 : 86400000)
      }
    : undefined,
  disabled: props.disabled || props.beginDisabled,
  placeholder: props.beginHolder ?? $i18n.t('dateRange.beginHolder'),
  class: props.beginClass,
  clearable: props.clearable,
  transfer: props.transfer,
  format: props.format as unknown as Date,
  ...props.beginAttr
}))

const endProps = computed(() => ({
  options: {
    disabledDate: (date: Date) =>
      beginDate.value && date && dayjs(date).isBefore(beginDate.value, dateTypes[props.type])
  },
  disabled: props.disabled || props.endDisabled,
  placeholder: props.endHolder ?? $i18n.t('dateRange.endHolder'),
  class: props.endClass,
  clearable: props.clearable,
  transfer: props.transfer,
  format: props.format as unknown as Date,
  ...props.endAttr
}))

// methods
// let flag: true | null
const emitModel = () => {
  // flag = true
  // nextTick(() => {
  //   flag = null
  // })
  emit('update:begin', beginDate.value)
  emit('update:end', endDate.value)
}
const changeBegin = (date: string) => {
  if (beginDate.value > endDate.value) {
    endDate.value = props.autoNext
      ? dayjs(beginDate.value).add(1, dateTypes[props.type]).toDate()
      : ''
  }
  emitModel()
  emit('change-begin', date)
  emit('change', beginDate.value, endDate.value, false)
}
const changeEnd = (date: string) => {
  if (props.type === 'datetime' && date && dayjs(date).isBefore(beginDate.value)) {
    endDate.value = dayjs(beginDate.value).add(1, 'hour').toDate()
    date = dayjs(endDate.value).format('YYYY-MM-DD HH:mm:ss')
  }
  emitModel()
  emit('change-end', date)
  emit('change', beginDate.value, endDate.value, true)
}

const setBegin = (newVal: DateValue) => {
  if (beginDate.value !== newVal /* !flag */) beginDate.value = newVal || ''
}
const setEnd = (newVal: DateValue) => {
  if (endDate.value !== newVal /* !flag */) endDate.value = newVal || ''
}

// created
// setBegin(props.begin);
// setEnd(props.end);

// 监听开始日期
watch(() => props.begin, setBegin)
// 监听结束日期
watch(() => props.end, setEnd)
</script>

<style lang="less">
@import '../styles/DateRange.less';
</style>
