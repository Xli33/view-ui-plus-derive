import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ViewUiPlus from 'view-ui-plus'
import DateRange from '../DateRange.vue'

describe('DateRange', () => {
  it('renders properly', () => {
    const now = new Date()
    const wrapper = mount(DateRange, {
      global: {
        plugins: [ViewUiPlus]
      },
      props: { begin: now }
    })
    // console.log('text(): --- ', wrapper.html())

    expect(wrapper.vm.begin).toBe(now)
  })
})
