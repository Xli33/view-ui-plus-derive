import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseSwitch from '../BaseSwitch.vue'

describe('BaseSwitch', () => {
  it('renders properly', () => {
    const wrapper = mount(BaseSwitch, { props: { trueLabel: 'Open', falseLabel: 'Close' } })
    expect(wrapper.text()).toContain('Close')
  })
})
