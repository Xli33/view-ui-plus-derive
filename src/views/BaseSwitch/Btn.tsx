import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    // disabled: Boolean,
    title: {
      type: String,
      default: 'btnssss'
    }
  },
  setup(props, ctx) {
    return () => (
      <button {...props} {...ctx.attrs}>
        {ctx.slots.default?.() || props.title}
      </button>
    )
  }
})
