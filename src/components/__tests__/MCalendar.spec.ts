import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ViewUiPlus from 'view-ui-plus'
import MCalendar from '../MCalendar.vue'

describe('MCalendar', () => {
  it('renders properly', () => {
    const date = new Date(Date.now() - 86400000 * 30)
    const wrapper = mount(MCalendar, {
      global: {
        plugins: [ViewUiPlus]
      },
      props: { date }
    })
    // console.log('text(): --- ', wrapper.text())

    expect(wrapper.text()).toContain(
      date
        .toLocaleDateString()
        .split('/')
        .map((e) => e.padStart(2, '0'))
        .join('-')
    )
  })
})
