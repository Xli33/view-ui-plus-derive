import { defineComponent, ref, onBeforeUnmount } from 'vue'
import { Clock } from 'utils-where'
import { Tag } from 'view-ui-plus'

export default defineComponent({
  setup() {
    const y = ref(),
      m = ref(),
      d = ref(),
      h = ref(),
      w = ref(),
      mn = ref(),
      s = ref()
    const padZero = (num: number) => (num + '').padStart(2, '0')
    const ck = new Clock(
      new Date(2000, 1, 1, 0, 0, 0),
      2,
      false,
      ({ year, month, day, week, hour, minute, second }) => {
        y.value = year
        m.value = month
        d.value = day
        w.value = week
        h.value = hour
        mn.value = minute
        s.value = second
        console.log('still clocking')
      }
    )
    ck.stop()
    setTimeout(() => {
      ck.start()
    }, 3000)

    onBeforeUnmount(() => {
      ck.remove()
    })
    return () => (
      <Tag>
        {y.value} - {m.value} - {d.value} 星期：{w.value} &nbsp;&nbsp; {padZero(h.value)}:
        {padZero(m.value)}:{padZero(s.value)}
      </Tag>
    )
  }
})
