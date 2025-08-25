<template>
  <div>
    <Table :border="border" :columns="tableColumns" :data="list" :size="size" style="z-index: 0">
      <template v-for="item in slotColumns" #[item.slot]="params">
        <slot :name="item.slot" v-bind="params"></slot>
      </template>
      <template #action="{ row, index }">
        <slot name="moreAction" :row="row" :index="index"></slot>
        <Button
          v-if="!hideDelBtn || !hideDelBtn(row, index)"
          :type="delBtnType"
          :size="delBtnSize"
          :ghost="delBtnGhost"
          v-bind="delBtn"
          :disabled="delBtnDisabled(row, index)"
          @click="toDel(index)"
          >{{ $i18n.t('curdTable.del') }}</Button
        >
      </template>
    </Table>
    <Button
      v-if="!disabled"
      v-show="addable"
      :type="addBtnType"
      :size="addBtnSize"
      :ghost="addBtnGhost"
      :disabled="addBtnDisabled"
      v-bind="addBtn"
      long
      icon="md-add"
      style="display: block; position: relative; margin-top: -1px"
      @click="toAdd">
      {{ addText }}
    </Button>
  </div>
</template>

<script lang="ts">
// 增删表格组件

import type { Obj } from '@/type'
import { type PropType, computed, ref, watch } from 'vue'
// import { Table, Button } from 'view-ui-plus' // 待必需才启用
import { $i18n } from '@/locale/i18n'

export default {
  name: 'CurdTable'
}
</script>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Array as PropType<Obj[]>,
    default: () => []
  },
  /**
   * iview Table columns
   */
  columns: {
    type: Array as PropType<Obj[]>,
    default: () => []
  },
  /**
   * 是否隐藏控制列
   */
  disabled: Boolean,
  /**
   * 可否增加数据，默认true
   */
  addable: {
    type: Boolean,
    default: true
  },
  /**
   * 控制列宽度，默认90px
   */
  actionWidth: {
    type: Number,
    default: 90
  },
  /**
   * 控制列水平对齐，默认居中
   */
  actionAlign: {
    type: String,
    default: 'center'
  },
  /**
   * 控制列是否固定
   */
  actionFixed: String,
  /**
   * 控制列表头文本
   */
  actionText: {
    type: String,
    default() {
      return $i18n.t('curdTable.actionText')
    }
  },
  /**
   * 右侧控制列
   */
  actionCol: {
    type: Object,
    default(props: Obj) {
      return {
        title: props.actionText,
        slot: 'action',
        width: props.actionWidth,
        align: props.actionAlign,
        fixed: props.actionFixed
      }
    }
  },
  /**
   * 新增行时需要添加的数据
   */
  addRow: {
    type: Function,
    default: () => []
  },
  border: Boolean,
  size: String,
  /**
   * 返回Promise以决定何时新增数据
   */
  beforeAdd: Function,
  /**
   * 返回Promise以决定何时删除数据
   */
  beforeRemove: Function,
  addBtnType: {
    type: String,
    default: 'dashed'
  },
  addBtnSize: String,
  addBtnGhost: {
    type: Boolean,
    default: false
  },
  addBtnDisabled: {
    type: Boolean,
    default(props: Obj) {
      return !props.addable
    }
  },
  addBtn: {
    type: Object,
    default: () => ({})
  },
  delBtnType: {
    type: String,
    default: 'warning'
  },
  delBtnSize: {
    type: String,
    default: 'small'
  },
  delBtnGhost: {
    type: Boolean,
    default: true
  },
  delBtn: {
    type: Object,
    default: () => ({})
  },
  addText: {
    type: String,
    default() {
      return $i18n.t('curdTable.addText')
    }
  },
  /**
   * 是否隐藏每行的删除按钮，通过函数返回值决定
   */
  hideDelBtn: Function,
  /**
   * 是否禁用每行删除按钮，通过函数返回值决定
   */
  delBtnDisabled: {
    type: Function,
    default() {
      return false
    }
  }
})

const emit = defineEmits<{
  'update:modelValue': [val: typeof props.modelValue]
  add: [row: Obj]
  remove: [row: Obj]
  /**
   * 增加或删除后触发，由增加触发时参数为true
   */
  change: [isAdd: boolean]
  // (e: 'change', isAdd: boolean):void
}>()

// data

const list = ref(props.modelValue)

// computed

const tableColumns = computed(() =>
  props.disabled ? props.columns : props.columns.concat(props.actionCol)
)

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
  props.columns.forEach((e) => {
    findSlot(e)
  })
  return arr
})

// methods

function toAdd() {
  typeof props.beforeAdd !== 'function' ? add() : props.beforeAdd().then(add).catch()
}
function add(args?: Obj[]) {
  list.value.push(...props.addRow(args))
  emit('update:modelValue', list.value)
  emit('add', list.value[list.value.length - 1]!)
  emit('change', true)
}
function toDel(index: number) {
  typeof props.beforeRemove !== 'function'
    ? del(index)
    : props.beforeRemove(list.value[index], index).then(() => {
        del(index)
      })
}
function del(index: number) {
  const [removed] = list.value.splice(index, 1)
  emit('update:modelValue', list.value)
  emit('remove', removed!)
  emit('change', false)
}

// onMounted(() => {
//   if (props.modelValue && props.modelValue.length) {
//     list.value = props.modelValue
//   }
// })

watch(
  () => props.modelValue,
  (val) => {
    list.value = val
  }
)
</script>
