import { defineComponent, ref, onBeforeUnmount } from 'vue'
import { Tag } from 'view-ui-plus'
import { Countdown } from 'utils-where'

export default defineComponent({
  props: {
    end: Number
  },
  setup(props) {
    const leftH = ref(),
      leftM = ref(),
      leftS = ref()
    const cd = new Countdown(
      new Date(Date.now() + props.end!),
      false,
      ({ hour, minute, second }) => {
        leftH.value = hour
        leftM.value = minute
        leftS.value = second
        console.log('still countdowning')
      }
    )
    cd.stop()
    setTimeout(() => cd.start(), 3000)
    onBeforeUnmount(() => {
      cd.remove()
    })
    return () => (
      <Tag>
        {leftH.value}:{leftM.value}:{leftS.value}
      </Tag>
    )
  }
})
