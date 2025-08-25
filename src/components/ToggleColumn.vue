<template>
  <Dropdown
    trigger="custom"
    :visible="visible"
    placement="bottom-end"
    :transfer="transfer"
    transfer-class-name="toggle-column-pop"
    class="toggle-column">
    <span @mouseover="toggle(true)" @mouseout="toggle(false)" class="toggle-column-btn">
      <slot>
        <Button type="default" :icon="icon">
          <template v-if="!icon">{{ title }} <Icon type="ios-arrow-down" /></template>
        </Button>
      </slot>
    </span>
    <template #list>
      <div @mouseenter="toggle(true)" @mouseleave="toggle(false)">
        <div v-if="all" class="ivu-dropdown-item">
          <Checkbox v-model="checkAll" :indeterminate="indeterminate">{{
            $i18n.t('toggleColumn.checkAll')
          }}</Checkbox>
        </div>
        <DropdownMenu class="toggle-column-list">
          <DropdownItem
            v-for="(item, index) in checkList"
            :key="index"
            :disabled="!item._switchable">
            <Checkbox
              v-model="item._visible"
              :disabled="!item._switchable"
              @on-change="change(item, index)"
              >{{ item.title }}</Checkbox
            >
          </DropdownItem>
        </DropdownMenu>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts">
// 切换列组件

import type { Obj } from '@/type'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
// import { Dropdown, DropdownMenu, DropdownItem, Icon, Checkbox, Button } from 'view-ui-plus' // 待必需才启用
import { deepMerge, getPathValue, makeObjectByPath, setPathValue } from 'utils-where'
import { $i18n } from '@/locale/i18n'

// 用于记录绑定的原始列，配合prop：cacheId使用，避免在v-for中绑定了有 _visible: false 的列时在切换显示后丢失原始列
const initial: Obj = {}

export default {
  name: 'ToggleColumn'
}
</script>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Array
  },
  title: {
    type: String,
    default() {
      return $i18n.t('toggleColumn.title')
    }
  },
  /**
   * 仅显示图标
   */
  icon: String,
  /**
   * 绑定columns对应的唯一标识，一般在v-for中绑定了固定某列且列配置中带有 _visible:false 时用到
   */
  cacheId: [String, Number],
  /**
   * 是否显示全选框
   */
  all: {
    type: Boolean,
    default: true
  },
  transfer: Boolean,
  /**
   * 将状态缓存至localStorage中的key，支持a.b形式
   *
   * @example
   * // 组件会尝试将显示状态读写至 localStorage.app.main.cols
   * storeAt='app.main.cols'
   */
  storeAt: String
})

const emit = defineEmits<{
  'update:modelValue': [val: Obj[]]
  change: [val: Obj[] | Obj]
}>()

let tid: number | null, first: string, restKeys: string
// 保存状态至本地
const save = (flag?: boolean) => {
  clearTimeout(tid!)
  let prev = localStorage.getItem(first) as any
  prev = prev ? (JSON.parse(prev) as Obj) : {}
  // 保存过则通过setPathValue直接赋值，否则应该根据restKeys构建对象并入prev
  !flag ? setPathValue(prev, restKeys, config) : deepMerge(prev, makeObjectByPath(restKeys, config))
  tid = setTimeout(() => {
    tid = null
    localStorage.setItem(first, JSON.stringify(prev))
  })
}

// data
// let configPath: Obj
let config: Obj
if (props.storeAt) {
  first = props.storeAt!.split('.')[0]!
  restKeys = props.storeAt!.slice(first.length + 1)
  // e.g. props.storeAt = 'app.main.cols'，则尝试获取 localStorage.app.main.cols，未获取到则保存一遍 localStorage.app: {main: {cols:{}}}
  config =
    (localStorage.getItem(first) as unknown as Obj) &&
    getPathValue(JSON.parse(localStorage[first]), restKeys)
  // config无效则说明之前木有存过，需要调用save(true)先存储一次符合props.storeAt的数据结构
  if (!config) {
    config = {}
    save(true)
  }
  // // 根据storeAt构建配置对象，保证configPath只有单一的storeAt对应对象结构
  // let curr: Obj | undefined
  // const arr = props.storeAt.split('.')
  // const { userInfo, userConfig } = globalUser
  // configPath = {}
  // config = getPath(userConfig[userInfo.userCode || ''], props.storeAt)
  // for (let v: string, i = 0, len = arr.length; i < len; i++) {
  //   v = arr[i]
  //   if (curr) {
  //     curr[v] = i !== len - 1 ? {} : config || {}
  //   } else {
  //     configPath[v] = {}
  //     curr = {
  //       [v]: configPath[v]
  //     }
  //   }
  //   curr = curr[v]
  // }
  // console.log(configPath)
  // // 若无对应配置，则先保存至本地配置中
  // if (!config) {
  //   globalUser.saveConfig(configPath)
  //   config = curr as Obj
  // }
}
const visible = ref(false),
  backup = shallowRef<Obj[]>([]),
  checkList = ref<Obj[]>([])

// computed

const indeterminate = computed(() => {
  const cols = checkList.value.filter((e) => e._switchable)
  return cols.some((e) => e._visible) && cols.some((e) => !e._visible)
})
const checkAll = computed({
  get() {
    const cols = checkList.value.filter((e) => e._switchable)
    return cols.length > 0 && cols.every((e) => e._visible)
  },
  set(val) {
    checkList.value.forEach((e, i) => {
      if (e._switchable) {
        backup.value[i]!._visible = e._visible = val
      }
    })
    if (props.storeAt) {
      checkList.value.forEach((e, i) => {
        config[e.key] = e._visible
      })
      save()
      // globalUser.saveConfig(configPath)
    }
    emitModel()
    emit('change', backup.value)
  }
})

// methods

function checkValid() {
  const showns = checkList.value.filter((e) => e._visible)
  // 只有一个列且没有“全选框”时禁止该列切换
  if (!props.all && showns.length === 1) {
    showns[0]!._switchable = false
    return
  }
  showns.forEach((e) => {
    if (e.initSwitchable && !e._switchable) e._switchable = true
  })
}

function change(item: Obj, index: number) {
  // console.log(item.key, item._visible);
  backup.value[index]!._visible = item._visible
  if (props.storeAt) {
    config[item.key] = item._visible
    save()
    // setTimeout(() => {
    //   globalUser.saveConfig(configPath)
    // })
  }
  emitModel()
  checkValid()
  emit('change', backup.value[index]!)
}

let toToggle: number
function toggle(open: boolean) {
  clearTimeout(toToggle)
  toToggle = setTimeout(() => {
    // console.log("toggle");
    visible.value = open
  }, 200)
}

function setColumns() {
  ;(initial[props.cacheId!]?.cols || props.modelValue).forEach((e: Obj) => {
    if (!e.hasOwnProperty('_visible')) {
      if (props.storeAt) {
        e._visible = config[e.key] === undefined || config[e.key]
      } else {
        e._visible = true
      }
    }
    if (!e.hasOwnProperty('_switchable')) {
      e._switchable = true
    }
    backup.value.push(e)
    checkList.value.push({
      title: e.title || '',
      key: e.key,
      initSwitchable: e._switchable,
      _switchable: e._switchable,
      _visible: e._visible
    })
  })
  checkValid()
  emitModel()
}

let flag: true | null
function emitModel() {
  if (props.cacheId != null) {
    initial[props.cacheId].flag = true
    nextTick(() => {
      initial[props.cacheId!].flag = null
    })
  }
  flag = true
  nextTick(() => {
    flag = null
  })
  emit(
    'update:modelValue',
    backup.value.filter((e) => e._visible)
  )
}

onMounted(() => {
  if (props.cacheId != null) {
    initial[props.cacheId]
      ? initial[props.cacheId].all++
      : (initial[props.cacheId] = { cols: props.modelValue, all: 1 })
    onBeforeUnmount(() => {
      // 组件卸载后将initial中对应“同类组件”数量减1，减完若为0则可以清除 initial[props.cacheId]
      if (initial[props.cacheId!] && --initial[props.cacheId!].all < 1) {
        delete initial[props.cacheId!]
      }
    })
  }
  setColumns()
})

// watch
watch(
  () => props.modelValue,
  (val) => {
    if (flag) return
    if (initial[props.cacheId!] && !initial[props.cacheId!].flag) {
      initial[props.cacheId!].cols = val
    }
    backup.value = []
    checkList.value = []
    setColumns()
  }
)
</script>

<style lang="less">
@import '../styles/ToggleColumn.less';
</style>
