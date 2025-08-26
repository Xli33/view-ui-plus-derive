import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ViewUiPlus from 'view-ui-plus'
import ToggleColumn from '../ToggleColumn.vue'

describe('ToggleColumn', () => {
  it('renders properly', async () => {
    const wrapper = mount(ToggleColumn, {
      global: {
        plugins: [ViewUiPlus]
      },
      props: {
        modelValue: [
          {
            title: 'num',
            key: 'num'
          },
          {
            title: 'num2',
            key: 'num2'
          },
          {
            title: 'num3',
            key: 'num3'
          }
        ]
      }
    })
    wrapper.find('button').trigger('click')
    await nextTick()
    // console.log('text(): --- ', wrapper.html())

    expect(wrapper.text()).toContain('全选numnum2num3')
  })
})
