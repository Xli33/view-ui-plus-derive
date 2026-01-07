<template>
  <div
    ref="elRef"
    :class="[
      useClass('page-table-container'),
      // {
      //   'page-table-bordered': border && showHeader,
      //   'page-table-maximized': maximized,
      //   'page-table-fullscreen': maximized && fullscreen
      // }
      border && showHeader && useClass('page-table-bordered'),
      maximized && useClass('page-table-maximized'),
      maximized && fullscreen && useClass('page-table-fullscreen')
    ]">
    <Row
      v-if="showHeader"
      justify="space-between"
      align="middle"
      :class="useClass('page-table-header')">
      <Col>
        <slot name="title">
          <h1 :class="useClass('page-table-header-title')">
            {{ title ?? $i18n.t('pageTable.title') }}
          </h1>
        </slot>
      </Col>
      <Col>
        <slot name="headerAction"></slot>
        <Tooltip
          placement="top"
          :content="$i18n.t('pageTable.reload')"
          :transfer="isTransfer"
          :class="useClass('page-table-action')">
          <Icon type="md-refresh" size="20" @click="reload" />
        </Tooltip>
        <Tooltip
          placement="top"
          :content="$i18n.t(`pageTable.${maximized ? 'restore' : 'maxmize'}`)"
          :transfer="isTransfer"
          :class="useClass('page-table-action')">
          <Icon
            :type="maximized ? 'md-contract' : 'md-expand'"
            size="20"
            @click="changeFullscreen" />
        </Tooltip>
        <ToggleColumn
          v-model="tableColumns"
          size="20"
          :transfer="isTransfer"
          :store-at="storeAt"
          @change="$emit('change-col', $event)">
          <Icon type="md-settings" size="20" />
        </ToggleColumn>
        <!-- </Tooltip> -->
      </Col>
    </Row>
    <div
      :class="[
        useClass('page-table-list'),
        !sizer.total && !table.data.length && useClass('page-table-list-empty')
      ]">
      <Table
        ref="tableRef"
        v-bind="omitOwnKeys($attrs, ['id', 'class', 'style'])"
        :border="border"
        :columns="tableColumns"
        :data="table.data"
        :loading="loading"
        :height="table.height"
        :max-height="table.maxHeight"
        @on-row-click="clickRow">
        <!-- @on-column-width-resize="changeColWidth"
        @on-sort-change="changeSort"
        @on-filter-change="afterFilter" -->
        <template v-if="$slots.header" #header>
          <slot name="header"></slot>
        </template>
        <template v-for="item in slotColumns" #[item.slot]="params">
          <slot :name="item.slot" v-bind="params"></slot>
        </template>
        <template v-if="$slots.footer" #footer>
          <slot name="footer"></slot>
        </template>
      </Table>
      <Page
        v-show="!hidePage"
        ref="pageRef"
        v-model="sizer.curr"
        :total="sizer.total"
        :page-size="sizer.size"
        show-total
        show-sizer
        show-elevator
        :transfer="isTransfer"
        :page-size-opts="pageSizeOpts"
        :class="useClass('page-table-paginator')"
        @on-change="changePage"
        @on-page-size-change="changePageSize" />
    </div>
  </div>
</template>

<script lang="tsx">
// 分页表格组件

import type { Obj } from '@/type'
import type { PropType, Ref } from 'vue'
import {
  computed,
  ref,
  reactive,
  watch,
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowReactive,
  shallowRef,
  useTemplateRef
} from 'vue'
import { Checkbox, type Page, type Table } from 'view-ui-plus'
// import { Checkbox, Row, Col, Table, Tooltip, Page, Icon } from 'view-ui-plus' // 待必需才启用
import { getPathValue, omitOwnKeys } from 'utils-where'
import { $i18n } from '@/locale/i18n'
import ToggleColumn from './ToggleColumn.vue'
import { useClass } from '@/utils'

export default {
  name: 'PageTable'
  // inheritAttrs: false
}
</script>

<script setup lang="tsx">
const props = defineProps({
  columns: {
    type: Array as PropType<Obj[]>,
    default: () => []
  },
  modelValue: {
    type: Array as PropType<Obj[]>,
    default: () => []
  },
  /**
   * 远程请求方法
   *
   * @example
   * const getResult = () => axios.get('').then(res => res.data)
   * <PageTable :method="getResult" />
   */
  method: Function,
  /**
   * 调用 method 时传入的参数或者返回参数的函数
   */
  param: [Object, Function],
  /**
   * 返回值中对应的列表数据key
   *
   * @example 如返回结构是 { result: [1,2,3], total: 100 }，则dataKey='result'
   */
  dataKey: String,
  /**
   * 返回值中对应的分页总条数key
   *
   * @example 如返回结构是 { result: [1,2,3], total: 100 }，则totalKey='total'
   */
  totalKey: String,
  /**
   * 请求时传递的分页参数中 first 对应 key
   * 后端分页一般要求指定起始数据索引或者“页码”，以及获取多少条数据
   *
   * @example
   * 如后端接口给定的分页参数是 firstIndex 对应起始索引
   * pageKey='firstIndex'
   */
  pageKey: String,
  /**
   * 请求时传递的分页参数中 size 对应 key
   * 后端分页一般要求指定起始数据索引或者“页码”，以及获取多少条数据
   *
   * @example
   * 如后端接口给定的分页参数是 amount 对应需要获取的条数
   * sizeKey='amount'
   */
  sizeKey: String,
  /**
   * 对象形式传递分页参数映射
   */
  pageMap: {
    type: Object,
    default(props: Obj) {
      return {
        first: props.pageKey,
        pageSize: props.sizeKey
      }
    }
  },
  border: Boolean,
  /**
   * 处理接口返回列表数据的函数
   */
  process: Function,
  // loading: Boolean,
  /**
   * 是否本地分页
   */
  isLocal: Boolean,
  /**
   * 分页条数选项
   */
  pageSizeOpts: {
    type: Array as PropType<number[]>,
    default: () => [30, 50, 100, 200]
  },
  /**
   * 查询失败时不清除之前获取到的结果
   */
  autoRemain: Boolean,
  /**
   * 计算Table的maxHeight时，Table距离视口底部的距离
   * @default 45
   */
  bottomDis: {
    type: [Number, String],
    default: 45
  },
  /**
   * 勾选项
   */
  selection: Array,
  /**
   * 初始分页条数
   */
  initSize: Number,
  /**
   * 远程查询时额外检测的方法
   */
  check: Function,
  /**
   * 查询时是否用页码而不是用当页第一条的索引
   */
  usePageNum: Boolean,
  /**
   * 是否点击行即更改Checkbox状态
   */
  clickToCheck: Boolean,
  /**
   * 获取的勾选项是否去除_checked等内部属性
   */
  pure: Boolean,
  /**
   * head title
   */
  title: String,
  /**
   * 是否显示header
   */
  showHeader: Boolean,
  transfer: {
    type: Boolean,
    default: true
  },
  /**
   * 最大化时是否全屏
   */
  fullscreen: Boolean,
  /**
   * 传至ToggleColumn组件的storeAt
   */
  storeAt: String,
  /**
   * 隐藏分页
   */
  hidePage: Boolean,
  /**
   * 自动设置Table的maxHeight
   */
  autoMaxHeight: {
    type: Boolean,
    default: true
  },
  /**
   * Table的maxHeight
   */
  maxHeight: [Number, String],
  /**
   * Table的height
   */
  height: [Number, String],
  /**
   * 自动设置Table的height
   */
  autoHeight: Boolean,
  /**
   * 最大化时自动计算哪种高度
   */
  maximizeHeightType: {
    type: String as PropType<'height' | 'maxHeight'>,
    default: 'maxHeight'
  }
})

const emit = defineEmits<{
  // 'update:loading': [val: boolean]
  'update:modelValue': [val: Obj[]]
  'update:selection': [val: Obj[]]
  load: [res: any]
  'select-all': [val: Obj[], boolean]
  'selection-change': [val: Obj[]]
  select: [val: Obj, boolean]
  reload: []
  'change-col': [val: Obj[] | Obj]
  'maximize-change': [val: boolean]
}>()

// data

let initHeight: number // 未传入height时自动计算出的height
let initMaxHeight: number // 未传入maxHeight时自动计算出的maxHeight
const loading = defineModel('loading', { type: Boolean }),
  refTable = useTemplateRef<typeof Table>('tableRef'),
  refEl = useTemplateRef('elRef'),
  refPage = useTemplateRef<typeof Page>('pageRef'),
  maximized = ref(false),
  tableColumns = shallowRef<Obj[]>() as Ref<Obj[]>,
  table = reactive({
    data: [] as Obj[],
    // rows: [] as Obj[],
    // selections: [],
    // loading: false,
    height: props.height,
    maxHeight: props.maxHeight,
    selectType: {
      align: 'center',
      className: useClass('page-table-mr0'),
      renderHeader: (h: any) => {
        // const checkableList = table.rows.filter((e) => e._checkable && !e._disabled),
        const checkableList = table.data.filter((e) => e._checkable && !e._disabled),
          len = checkableList.length
        return (
          // table.rows.some((e) => e._checkable) && (
          table.data.some((e) => e._checkable) && (
            <Checkbox
              model-value={!!len && checkableList.every((e) => e._checked)}
              disabled={!len}
              onUpdate:model-value={(val: boolean) => {
                checkableList.forEach((e) => {
                  e._checked = val
                })
              }}
              onOnChange={(val: boolean) => {
                selectRow()
                emit(
                  'select-all',
                  !props.pure ? checkableList : checkableList.map((e) => pureRow(e)),
                  val
                )
              }}
            />
          )
        )
      },
      render: (h: any, { row, index }: Obj) =>
        row._checkable && (
          <Checkbox
            model-value={row._checked}
            disabled={row._disabled}
            onUpdate:model-value={(val: boolean) => {
              checkRow(table.data[index]!, val)
            }}
          />
        )
    }
  })

const sizer = shallowReactive({
  curr: 1,
  size: props.initSize || props.pageSizeOpts[0]!,
  total: 0
})

// computed

const isTransfer = computed(() => (maximized.value ? false : props.transfer))

const slotColumns = computed(() => {
  const arr: Obj[] = [],
    findSlot = (col: Obj) => {
      if (col.slot) {
        arr.push(col)
      }
      if (col.children) {
        col.children.forEach((e: Obj) => {
          findSlot(e)
        })
      }
    }
  props.columns.forEach((e: Obj) => {
    findSlot(e)
  })
  return arr
})

// methods

function makeCols() {
  const selectType = props.columns.find((e) => e.type === 'selection')
  if (selectType) {
    const type: Obj = {
      // fixed: selectType.fixed,
      // key: selectType.key,
      ...selectType,
      width: selectType.width || 54,
      type: undefined,
      ...table.selectType
    }
    tableColumns.value = [type].concat(props.columns.slice(1))
  } else {
    tableColumns.value = props.columns
  }
}

let isFromRemote: true | null
let isRequesting: true | null // 是否发起请求。loading可由父组件控制，比如默认展示loading状态但实际未发起请求，故需要单独变量判断是否在请求
let reqId: number = 0 // 请求次数id
async function getRemoteData() {
  if (typeof props.method !== 'function') return console.warn("typeof method isn't function")
  if (isRequesting) {
    // 未完成加载又触发新请求，让reqId在Number.MAX_SAFE_INTEGER范围内递增，用于后续与innerReqId比较判断是否为最近一次请求
    reqId = (reqId + 1) % Number.MAX_SAFE_INTEGER
  }
  // table.rows = []
  // this.table.selections = [];
  const innerReqId = reqId
  isRequesting = true
  loading.value = true
  // emit('update:loading', true)
  emit('update:selection', [])
  const res = await props.method(
    Object.assign(getPageParam(), typeof props.param !== 'function' ? props.param : props.param())
  )
  // 当存在重复请求时，即上一次请求未完成又触发了新请求，则reqId会依次递增
  // 若reqId与innerReqId不相等，则说明不是最近一次请求
  if (reqId !== innerReqId) return
  loading.value = false
  isRequesting = null
  // 这里不能将reqId重置为0。假设连续触发2次请求，第1次请求的innerId是0，第2次的是1, 但第2次请求比第1次请求更快完成
  // 此时若重置reqId，则第1次请求结束时，因其innerId与reqId同为0，依旧会通过，导致列表又被第一次的结果覆盖了
  // 所以当存在重复请求时，reqId是保持递增的，若没有重复请求，则reqId维持在上一次请求的值
  // 也就依然需要isRequesting判断是否在重复请求，不能单靠reqId是否大于0判断
  // 当没有重复请求时，reqId应该始终为初始值0，存在重复请求时也只会依次递增
  // reqId = 0;
  // emit('update:loading', false)
  if (!res) {
    if (!props.autoRemain) {
      sizer.total = 0
      emit('update:modelValue', [])
    }
    return
  }
  // if (typeof props.process === 'function') {
  //   const processed = props.process(res)
  //   if (processed) {
  //     res = processed
  //   }
  // }
  let data = getPathValue(res, props.dataKey!) || []
  handleData(data)
  if (typeof props.process === 'function') {
    const processed = props.process(data)
    if (Array.isArray(processed)) {
      data = processed
    }
  }
  table.data = data
  sizer.total = getPathValue(res, props.totalKey!) || 0
  // setRows()
  isFromRemote = true
  emit('update:modelValue', table.data)
  emit('load', res)
  setTimeout(() => {
    isFromRemote = null
  })
}

function handleData(data: Obj[]) {
  props.columns.some((e) => e.type === 'selection') &&
    data.forEach((e) => {
      e._checkable = true // 是否显示checkbox
      e._checked = e._disabled = false
    })
}

function getData(isPaging?: boolean) {
  if (typeof props.check === 'function' && !props.check()) return
  !props.isLocal ? getRemoteData() : getLocalData(isPaging)
}

function getLocalData(isPaging?: boolean) {
  let i = isPaging ? sizer.size * (sizer.curr - 1) : 0
  const arr = [],
    temp = i + sizer.size,
    gap = temp > sizer.total ? sizer.total : temp,
    totalList = props.modelValue

  for (; i < gap; i++) {
    totalList[i]!._checked = totalList[i]!._disabled = false
    arr.push(totalList[i]!)
  }
  // this.table.selections = [];
  table.data = arr
  emit('update:selection', [])
  // setRows()
}

function changePage() {
  getData(true)
}

function changePageSize(size: number) {
  sizer.size = size
  sizer.curr === 1 && getData()
}

/**
 * 远程查询
 * @param stay 是否留在当前页
 */
function search(stay?: boolean) {
  if (stay !== true) {
    sizer.curr = 1
  }
  nextTick(getRemoteData)
}

function selectRow(row?: Obj, val?: boolean) {
  if (row) {
    row._checked = val
  }
  // console.log(row, val);
  // let selections = table.rows.filter((e: Obj) => e._checked)
  let selections = table.data.filter((e: Obj) => e._checked)
  if (props.pure) {
    selections = selections.map((e: Obj) => pureRow(e))
  }
  emit('update:selection', selections)
  emit('selection-change', selections)
}

function getHeight() {
  return (
    window.innerHeight -
    +props.bottomDis -
    refTable.value!.$el.getBoundingClientRect().top -
    refPage.value!.$el.offsetHeight
  )
}
/**
 * 设置内部 Table 的（最大）高度
 * @param isHeight 是否设置`height`，默认`false`：设置`maxHeight`
 */
function setMaxHeight(isHeight?: boolean) {
  nextTick(() => {
    const num = getHeight()
    table[isHeight ? 'height' : 'maxHeight'] = num > 0 ? num : 0
  })
}

function setMaximizeHeight() {
  ;(props.maximizeHeightType === 'height' || props.maximizeHeightType === 'maxHeight') &&
    nextTick(() => {
      const num = getHeight()
      table[props.maximizeHeightType] = num > 0 ? num : 0
    })
}

function getPageParam() {
  return {
    [props.pageMap.first]: !props.usePageNum ? sizer.size * (sizer.curr - 1) : sizer.curr,
    [props.pageMap.pageSize]: sizer.size
  }
}

let changeByRowClick: true | null
function clickRow(row: Obj, index: number) {
  if (!props.clickToCheck || !row._checkable || row._disabled) return
  changeByRowClick = true
  // row = table.rows.find((e: Obj) => e._index === index) as Obj
  row = table.data[index]!
  // if (!row) return
  row._checked = !row._checked
  selectRow(row, row._checked)
  emit('select', !props.pure ? row : pureRow(row), row._checked)
  setTimeout(() => {
    changeByRowClick = null
  })
}

// function changeColWidth(/* newWidth: number, oldWidth: number, column: Obj, event: Event */) {
//   setRows()
// }

// function changeSort(/* { column, key, order }: { column: Obj; key: string; order: string } */) {
//   setRows()
// }

// function afterFilter(/* column: Obj */) {
//   setRows()
// }

// function setRows() {
//   nextTick(() => {
//     table.rows = refTable.value.rebuildData
//   })
// }

// 更改行的Checkbox时触发
function checkRow(row: Obj, val: boolean) {
  if (changeByRowClick) return
  selectRow(row, val)
  emit('select', !props.pure ? row : pureRow(row), val)
}

function pureRow(row: Obj) {
  const cloned = { ...row }
  delete cloned._checkable
  delete cloned._checked
  delete cloned._disabled
  // delete cloned._index
  // delete cloned._rowKey
  return cloned
}

function changeFullscreen() {
  if (props.fullscreen) {
    maximized.value ? document.exitFullscreen() : refEl.value!.requestFullscreen()
    return
  }
  maximized.value = !maximized.value
  if (maximized.value) {
    setMaximizeHeight()
    document.body.classList.add('clip')
  } else {
    table.height = props.height ?? initHeight
    table.maxHeight = props.maxHeight ?? initMaxHeight
    document.body.classList.remove('clip')
  }
  nextTick(() => {
    emit('maximize-change', maximized.value)
  })
}
function reload() {
  if (!loading.value) props.isLocal ? emit('reload') : search()
}

defineExpose({
  search,
  setMaxHeight,
  table,
  sizer,
  getPage: () => ({
    ...getPageParam(),
    curr: sizer.curr,
    total: sizer.total
  })
})

// created
makeCols()
// sizer.size = props.initSize || props.pageSizeOpts[0]!

onMounted(() => {
  if (!props.maxHeight && !props.height && (props.autoMaxHeight || props.autoHeight)) {
    setMaxHeight(props.autoHeight)
    nextTick(() => {
      initMaxHeight = table.maxHeight as number
      initHeight = table.height as number
    })
  }
  if (props.fullscreen) {
    refEl.value!.onfullscreenchange = () => {
      maximized.value = !!document.fullscreenElement
      if (maximized.value) {
        setTimeout(setMaximizeHeight)
      } else {
        table.height = props.height ?? initHeight
        table.maxHeight = props.maxHeight ?? initMaxHeight
      }
      setTimeout(() => {
        emit('maximize-change', maximized.value)
      })
    }
  }
})

onBeforeUnmount(() => {
  refEl.value!.onfullscreenchange = null
})

watch(
  () => props.modelValue,
  (val) => {
    const data = Array.isArray(val) ? val : []
    if (props.isLocal) {
      sizer.curr = 1
      sizer.total = data.length
      handleData(data)
      getLocalData()
      return
    }
    if (!isFromRemote) {
      sizer.curr = 1
      sizer.total = data.length
      // setRows()
      table.data = data
    }
  },
  {
    immediate: true
  }
)

// watch(
//   () => props.loading,
//   (val) => {
//     table.loading = val
//   }
// )

watch(
  () => props.maxHeight,
  (val) => {
    table.maxHeight = val
  }
)
watch(
  () => props.height,
  (val) => {
    table.height = val
  }
)

watch(
  () => props.columns,
  () => {
    makeCols()
    // setRows()
  }
)
</script>

<style lang="less">
@import '../styles/PageTable.less';
</style>
