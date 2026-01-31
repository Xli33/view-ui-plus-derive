/**
 * 针对Table组件，添加列宽缓存功能
 * 在使用的Table组件上指定cache-cols属性以启用
 */
import type { Obj } from '../type'
import { Table, type TableColumnConfig } from 'view-ui-plus'
import { deepMerge, getPathValue, makeObjectByPath } from 'utils-where'

// 扩展Crud，添加cacheCols属性
Table.props.cacheCols = Object /* {
  type: Object,
  default: () => ({
    keys: '', // 存储路径
    cols: [] // 列配置
  })
} */
const saveColWidth = function (
  this: any,
  newWidth: number,
  oldWidth: number,
  column: typeof TableColumnConfig /* event: MouseEvent */
) {
  // console.log('onOnColumnWidthResize', newWidth, oldWidth, column)
  const first = this.cacheCols.keys.split('.')[0],
    targetKey = this.cacheCols.keys.slice(first.length + 1)
  const appData = localStorage.getItem(first)
  const localStore = appData ? JSON.parse(appData) : {}
  let targetObj: Obj = getPathValue(localStore, targetKey)

  if (!targetObj) {
    targetObj = {}
    deepMerge(localStore, makeObjectByPath(targetKey, targetObj))
  }
  if (targetObj[column.key!]) {
    targetObj[column.key!].width = Math.round(newWidth)
  } else {
    targetObj[column.key!] = {
      width: Math.round(newWidth)
    }
  }
  if (this.cacheCols.cols?.length) {
    this.cacheCols.cols.find((e: Obj) => e.key === column.key).width = Math.round(newWidth)
  }
  setTimeout(() => {
    localStorage.setItem(first, JSON.stringify(localStore))
  })
}

const tableCreated = function (this: any) {
  if (!this.cacheCols?.keys) return
  // 读取列宽配置
  const first = this.cacheCols.keys.split('.')[0],
    targetKey = this.cacheCols.keys.slice(first.length + 1)
  const appData = localStorage.getItem(first)
  const currentData = appData && getPathValue(JSON.parse(appData), targetKey)
  if (!currentData || !Object.keys(currentData).length) return
  this.columns.forEach((e: Obj) => {
    if (currentData[e.key]?.width) {
      // e.minWidth = null
      e.width = currentData[e.key].width
    }
    // Object.assign(e, localStore[e.key])
  })
}

const tableUpdated = function (this: any) {
  if (!this.cacheCols?.keys) return
  const selfProps = this.$.vnode.props
  if (
    typeof selfProps.onOnColumnWidthResize === 'function' &&
    selfProps.onOnColumnWidthResize.name !== 'bound saveColWidth'
  ) {
    selfProps.onOnColumnWidthResize = [saveColWidth.bind(this), selfProps.onOnColumnWidthResize]
    return
  }
  if (Array.isArray(selfProps.onOnColumnWidthResize)) {
    selfProps.onOnColumnWidthResize.every(
      (e: { name: string }) => e.name !== 'bound saveColWidth'
    ) && selfProps.onOnColumnWidthResize.unshift(saveColWidth.bind(this))
    return
  }
  selfProps.onOnColumnWidthResize = saveColWidth.bind(this)
}

if (typeof Table.created !== 'function') {
  Table.created = tableCreated
} else {
  const created = Table.created
  Table.created = function () {
    created.call(this)
    tableCreated.call(this)
  }
}

if (typeof Table.updated !== 'function') {
  Table.updated = tableUpdated
} else {
  const updated = Table.updated
  Table.updated = function () {
    updated.call(this)
    tableUpdated.call(this)
  }
}
