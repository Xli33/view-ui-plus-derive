import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ViewUiPlus from 'view-ui-plus'
import CacheSelect from '../CacheSelect.vue'

describe('CacheSelect', () => {
  it('renders properly', () => {
    const wrapper = mount(CacheSelect, {
      global: {
        plugins: [ViewUiPlus]
      },
      props: {
        modelValue: 'a',
        list: [
          {
            value: 'a',
            label: 'one'
          }
        ]
      }
    })
    // console.log('text(): --- ', wrapper.html())

    expect(wrapper.text()).toContain('one')
  })
})
