import type { Obj } from '@/type'
import ViewUI from 'view-ui-plus'

// 修复Table在某些情况下表头/固定列与内容错位
const tableDataHandler = (ViewUI as Obj).Table.watch.data.handler
;(ViewUI as Obj).Table.watch.data.handler = function (val: Obj[]) {
  tableDataHandler.call(this, val)
  setTimeout(() => {
    const tbody = this.$refs.body
    if (!tbody) return
    ;((this.$refs.header && this.$refs.header.scrollLeft) !== tbody.scrollLeft ||
      (this.isRightFixed && this.$refs.fixedRightBody.scrollTop !== tbody.scrollTop) ||
      (this.isLeftFixed && this.$refs.fixedBody.scrollTop !== tbody.scrollTop)) &&
      tbody.dispatchEvent(new Event('scroll'))
  })
}
