import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ViewUiPlus from 'view-ui-plus'
import CountRange from '../CountRange.vue'

describe('CountRange', () => {
  it('renders properly', () => {
    const wrapper = mount(CountRange, {
      global: {
        plugins: [ViewUiPlus]
      },
      props: { begin: 11 }
    })
    // console.log('text(): --- ', wrapper.html())

    expect(wrapper.html()).toContain('value="11"')
  })
})
